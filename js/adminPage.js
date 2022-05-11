window.onload = function () {
    checkSession();
    toggleLeftMenu();
    dashboardActive();
    document.getElementById('leftMenuLinkDashboard').addEventListener('click', dashboardActive);
    document.getElementById('leftMenuLinkUsers').addEventListener('click', usersActive);
    document.getElementById('leftMenuLinkVinyls').addEventListener('click', vinylsActive);
    document.getElementById('leftMenuLinkOrders').addEventListener('click', ordersActive);
}

function checkSession() { //checking if there is a session opened if not then get back to log in.

    let userType = sessionStorage.getItem('SessionType');

    if (!sessionStorage.getItem('SessionEmail') && !sessionStorage.getItem('SessionID')) {
        location.href = 'index.html';

    } else {
        if (userType === "user") {
            location.href = 'page2.html';
        } else {
            destroySession();
        }
    }
}

function destroySession() {
    document.getElementById('logoutBtnID').addEventListener('click', logOut);

    function logOut() {
        sessionStorage.removeItem('SessionEmail');
        sessionStorage.removeItem('SessionID');
        sessionStorage.removeItem('SessionUser');
        sessionStorage.removeItem('SessionType');
        location.href = 'index.html';
    };
}

function toggleLeftMenu() {
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
}

function dashboardActive() {

    //assign
    var datos = new FormData();
    datos.append('typeOfRequest', "dashboardInfo");

    //post
    fetch('services/administration.php', {
        method: 'POST',
        body: datos
    })

        .then(res => res.json())
        .then(data => {

            let output = "";

            output += `
            <h1><img src="img/icons/clipboard-data.svg" height="48px" alt=""> Dashboard Panel</h1>

            <div class="row mb-3 text-center justify-content-center">

                <div class="col-xl-3 col-sm-6 py-2">
                    <div class="card bg-success text-white h-100">
                        <div class="card-body bg-success">
                            <div class="rotate">
                                <i class="fa fa-user fa-4x"></i>
                            </div>
                            <h6 class="text-uppercase">Users</h6>
                            <h1 class="display-4">${data['UsersQty']}</h1>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-sm-6 py-2">
                    <div class="card text-white bg-danger h-100">
                        <div class="card-body bg-danger">
                            <div class="rotate">
                                <i class="fa fa-list fa-4x"></i>
                            </div>
                            <h6 class="text-uppercase">Vinyls</h6>
                            <h1 class="display-4">${data['VinylsQty']}</h1>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-sm-6 py-2">
                    <div class="card text-white bg-info h-100">
                        <div class="card-body bg-info">
                            <div class="rotate">
                                <i class="fa fa-twitter fa-4x"></i>
                            </div>
                            <h6 class="text-uppercase">Orders</h6>
                            <h1 class="display-4">${data['OrdersQty']}</h1>
                        </div>
                    </div>
                </div>

            </div><!-- /#Cards -->
            `;
            document.getElementById('dashboard').innerHTML = output;
        });
}

function usersActive() {

    var datos = new FormData();

    datos.append('typeOfRequest', "usersInfo");

    fetch('services/administration.php', {
        method: 'POST',
        body: datos
    })

        .then(res => res.json())
        .then(data => {

            let output = "";

            for (let i in data) {

                output += `
                <tr>
                <td>
                    <div class="col-sm-12">
                        <div id="accordion" role="tablist" aria-multiselectable="true">
                        <div class="card">
                            <div class="card-header collapsed cursor-pointer" role="tab" id="heading${[i]}" data-toggle="collapse" data-parent="#accordion" href="#collapse${[i]}" aria-expanded="false" aria-controls="collapse${[i]}">
                                ${data[i].id} - ${data[i].nickname} - ${data[i].email}
                            </div>
                            <div id="collapse${[i]}" class="card-block in collapse row p-3" role="tabpanel" aria-labelledby="heading${[i]}">

                                <div class="col-sm-6 border-right">
                                    <h4 class="">User ID</h4>
                                    <input type="text" style="line-height:20px;" placeholder="User id" class="col-sm-12 p-2 mb-3" value="${data[i].id}" disabled>
                                    <br>
                                </div>
                                
                                <div class="col-sm-6">
                                    <h4 class="">User type</h4>
                                    <input type="text" style="line-height:20px;" placeholder="user type" class="col-sm-12 p-2 mb-3" value="${data[i].type}" disabled>
                                    <br>
                                </div>

                                <div class="col-sm-6 border-right">
                                    <h4 class="">Name</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Name" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].name}" disabled>
                                    <br>
                                </div>
                                
                                <div class="col-sm-6">
                                    <h4 class="">Surname</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Surname" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].surname}" disabled>
                                    <br>
                                </div>

                                <div class="col-sm-6 border-right">
                                    <h4 class="">Nickname</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Nickname" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].nickname}" disabled>
                                    <br>
                                </div>
                                
                                <div class="col-sm-6">
                                    <h4 class="">Birthday</h4>
                                    <input type="date" style="line-height:20px;" placeholder="Birthday" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].birth}" disabled>
                                    <br>
                                </div>
                                
                                <div class="col-sm-6 border-right">
                                    <h4 class="">Email</h4>
                                    <input type="email" style="line-height:20px;" placeholder="Email" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].email}" disabled>
                                    <br>
                                </div>

                                <div class="col-sm-6">
                                    <h4 class="">Password</h4>
                                    <input type="password" style="line-height:20px;" placeholder="Password" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].password}" disabled>
                                    <br>
                                </div>

                                <div class="col-sm-6 border-right">
                                    <h4 class="">Phone</h4>
                                    <input type="number" style="line-height:20px;" placeholder="Phone" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].phone}" disabled>
                                    <br>
                                </div>
                                
                                <div class="col-sm-6 border-right">
                                    <h4 class="">Street</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Street" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].street}" disabled>
                                    <br>
                                </div>

                                <div class="col-sm-6">
                                    <h4 class="">City</h4>
                                    <input type="text" style="line-height:20px;" placeholder="City" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].city}" disabled>
                                    <br>
                                </div>
                                
                                <div class="col-sm-6 border-right">
                                    <h4 class="">Postcode</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Postcode" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].postcode}" disabled>
                                    <br>
                                </div>

                                <div class="col-sm-6">
                                    <h4 class="">Country</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Country" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].country}" disabled>
                                    <br>
                                </div>
                                
                                <div class="col-sm-6">
                                    <h4 class="">Join Date</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Join Date" class="col-sm-12 p-2 mb-3" value="${data[i].reg_date}" disabled>
                                    <br>
                                </div>

                                <div class="col-sm-12 row text-center">
                                    <button class="btn btn-info ml-3 editUserRecordBtn">Edit</button>
                                    <button class="btn btn-primary ml-3 d-none cancelEditionOfUserRecordBtn">Cancel</button>
                                    <button class="btn btn-success ml-3 saveEditedUserRecordBtn" disabled>Save</button>
                                    <button class="btn btn-danger ml-3 deleteUserRecordBtn" disabled>Delete</button>
                                    <button class="btn btn-secondary mr-3 ml-auto closeEditVinylRecordCollapse" role="tab" id="heading${[i]}" data-toggle="collapse" data-parent="#accordion" href="#collapse${[i]}" aria-expanded="false" aria-controls="collapse${[i]}">Close</button>
                                </div>

                            </div>
                        </div>
                        </div>
                    </div>
                </td>
                </tr>
                `;
            }

            document.getElementById('userTableBody').innerHTML = output;

            let editBtn = document.getElementsByClassName('editUserRecordBtn');
            for (let i = 0; i < editBtn.length; i++) {
                editBtn[i].addEventListener('click', editVinylRecordBtnClick);
            }

            let cancelBtn = document.getElementsByClassName('cancelEditionOfUserRecordBtn');
            for (let i = 0; i < cancelBtn.length; i++) {
                cancelBtn[i].addEventListener('click', cancelEditVinylRecordBtnClick);
            }

            let saveBtn = document.getElementsByClassName('saveEditedUserRecordBtn');
            for (let i = 0; i < saveBtn.length; i++) {
                saveBtn[i].addEventListener('click', saveUserRecordEditedBtnClick);
            }

            let deleteBtn = document.getElementsByClassName('deleteUserRecordBtn');
            for (let i = 0; i < deleteBtn.length; i++) {
                deleteBtn[i].addEventListener('click', deleteUserRecordBtnClick);
            }
            
            document.getElementById('userSearchBar').addEventListener('keyup', userSearchBar);
        });
}

function saveUserRecordEditedBtnClick() {

    let user_id = this.parentElement.parentElement.children[0].children[1].value;
    let user_name = this.parentElement.parentElement.children[2].children[1].value;
    let user_surname = this.parentElement.parentElement.children[3].children[1].value;
    let user_nickname = this.parentElement.parentElement.children[4].children[1].value;
    let user_birth = this.parentElement.parentElement.children[5].children[1].value;
    let user_email = this.parentElement.parentElement.children[6].children[1].value;
    let user_password = this.parentElement.parentElement.children[7].children[1].value;
    let user_phone = this.parentElement.parentElement.children[8].children[1].value;
    let user_street = this.parentElement.parentElement.children[9].children[1].value;
    let user_city = this.parentElement.parentElement.children[10].children[1].value;
    let user_postcode = this.parentElement.parentElement.children[11].children[1].value;
    let user_country = this.parentElement.parentElement.children[12].children[1].value;



    var datos = new FormData(); // FormData for sending a package of information to the server

    datos.append('typeOfRequest', "editUserRecord");
    datos.append('user_id', user_id);
    datos.append('user_nickname', user_nickname);
    datos.append('user_name', user_name);
    datos.append('user_surname', user_surname);
    datos.append('user_phone', user_phone);
    datos.append('user_email', user_email);
    datos.append('user_password', user_password);
    datos.append('user_street', user_street);
    datos.append('user_city', user_city);
    datos.append('user_postcode', user_postcode);
    datos.append('user_country', user_country);
    datos.append('user_birth', user_birth);

    fetch('services/administration.php', {
        method: 'POST',
        body: datos
    })

        .then(res => res.json())
        .then(data => {
            console.log(data)

            if (data == "error") {
                console.error("error on response");
            } else {
                niceAlert("green", "Saved", "niceAlert");

                let inputx = document.getElementsByClassName('inputEdition');

                for (let i = 0; i < inputx.length; i++) {

                    inputx[i].disabled = !inputx[i].disabled;
                }

                this.parentElement.children[0].classList.toggle("d-none");
                this.parentElement.children[1].classList.toggle("d-none");
                this.parentElement.children[3].disabled = true;
                this.disabled = true;
            }

        });
}

function deleteUserRecordBtnClick() {

    let idOfItemToDelete = this.parentElement.parentElement.children[0].children[1].value;

    console.log(idOfItemToDelete)
    $("#mmm1").modal();

    document.getElementById('modalConfirmation1').addEventListener('click', function () {

        var datos = new FormData(); // FormData for sending a package of information to the server

        datos.append('typeOfRequest', "deleteUserRecord");
        datos.append('idOfItemToDelete', idOfItemToDelete);

        fetch('services/administration.php', {
            method: 'POST',
            body: datos
        })

            .then(res => res.json())
            .then(data => {

                console.log(data)
                if (data == "error") {
                    console.error("error on response");
                } else {
                    niceAlert("#f57379", "Deleted", "niceAlert");
                    usersActive();
                }

            });

    });
}

function vinylsActive() {

    var datos = new FormData();

    datos.append('typeOfRequest', "vinylsInfo");

    fetch('services/administration.php', {
        method: 'POST',
        body: datos
    })

        .then(res => res.json())
        .then(data => {

            let output = "";

            for (let i in data) {

                output += `
                <tr>
                <td>
                    <div class="col-sm-12">
                        <div id="accordion" role="tablist" aria-multiselectable="true">
                        <div class="card">
                            <div class="card-header collapsed cursor-pointer" role="tab" id="heading${[i]}" data-toggle="collapse" data-parent="#accordion" href="#collapse${[i]}" aria-expanded="false" aria-controls="collapse${[i]}">
                                ${data[i].album} - ${data[i].artist}
                            </div>
                            <div id="collapse${[i]}" class="card-block in collapse row p-3" role="tabpanel" aria-labelledby="heading${[i]}">

                                <div class="col-sm-6 border-right">
                                    <h4 class="">Item ID</h4>
                                    <input type="text" style="line-height:20px;" placeholder="ID" class="col-sm-12 p-2 mb-3" value="${data[i].id}" disabled>
                                    <br>
                                </div>
                                
                                <div class="col-sm-6">
                                    <h4 class="">Owner_ID</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Owner ID" class="col-sm-12 p-2 mb-3" value="${data[i].owner_id}" disabled>
                                    <br>
                                </div>

                                <div class="col-sm-6 border-right">
                                    <h4 class="">Album</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Album" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].album}" disabled>
                                    <br>
                                </div>
                                
                                <div class="col-sm-6">
                                    <h4 class="">Artist</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Artist" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].artist}" disabled>
                                    <br>
                                </div>

                                <div class="col-sm-6 border-right">
                                    <h4 class="">Release</h4>
                                    <input type="date" style="line-height:20px;" placeholder="Release" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].release_date}" disabled>
                                    <br>
                                </div>
                                
                                <div class="col-sm-6">
                                    <h4 class="">Genre</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Genre" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].genre}" disabled>
                                    <br>
                                </div>
                                
                                <div class="col-sm-6 border-right">
                                    <h4 class="">Price</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Price" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].price}" disabled>
                                    <br>
                                </div>

                                <div class="col-sm-6">
                                    <h4 class="">Stock</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Stock" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].stock}" disabled>
                                    <br>
                                </div>

                                <div class="col-sm-6 border-right">
                                    <h4 class="">Description</h4>
                                    <textarea style="width:100%;overflow:auto;resize:none" rows="20" class="p-2 mb-3 inputEdition" placeholder="Description" disabled>${data[i].description}</textarea>
                                    <br>
                                </div>
                                
                                <div class="col-sm-6">
                                    <h4 class="">Cover</h4>
                                    <textarea style="width:100%;overflow:auto;resize:none" rows="4" class="p-2 mb-3 inputEdition" placeholder="cover url" disabled>${data[i].cover}</textarea>
                                    <div class="text-center">
                                        <img src="${data[i].cover}" class="img-fluid" id="purchasedCoverModal" alt="Responsive image">
                                    </div>
                                    <br>
                                </div>

                                <div class="col-sm-12 row text-center">
                                    <button class="btn btn-info ml-3 editVinylRecordBtn">Edit</button>
                                    <button class="btn btn-primary ml-3 d-none cancelEditionOfVinylRecordBtn">Cancel</button>
                                    <button class="btn btn-success ml-3 saveEditedVinylRecordBtn" disabled>Save</button>
                                    <button class="btn btn-danger ml-3 deleteVinylRecordBtn" disabled>Delete</button>
                                    <button class="btn btn-secondary mr-3 ml-auto closeEditVinylRecordCollapse" role="tab" id="heading${[i]}" data-toggle="collapse" data-parent="#accordion" href="#collapse${[i]}" aria-expanded="false" aria-controls="collapse${[i]}">Close</button>
                                </div>

                            </div>
                        </div>
                        </div>
                    </div>
                </td>
                </tr>
                `;
            }

            document.getElementById('vinylsTableBody').innerHTML = output;

            let editBtn = document.getElementsByClassName('editVinylRecordBtn');
            for (let i = 0; i < editBtn.length; i++) {
                editBtn[i].addEventListener('click', editVinylRecordBtnClick);
            }

            let cancelBtn = document.getElementsByClassName('cancelEditionOfVinylRecordBtn');
            for (let i = 0; i < cancelBtn.length; i++) {
                cancelBtn[i].addEventListener('click', cancelEditVinylRecordBtnClick);
            }

            let saveBtn = document.getElementsByClassName('saveEditedVinylRecordBtn');
            for (let i = 0; i < saveBtn.length; i++) {
                saveBtn[i].addEventListener('click', saveVinylRecordEditedBtnClick);
            }

            let deleteBtn = document.getElementsByClassName('deleteVinylRecordBtn');
            for (let i = 0; i < deleteBtn.length; i++) {
                deleteBtn[i].addEventListener('click', deleteVinylRecordBtnClick);
            }
        
            document.getElementById('vinylsSearchBar').addEventListener('keyup', vinylsSearchBar);
        });
}

function editVinylRecordBtnClick() {

    let inputx = document.getElementsByClassName(' inputEdition');

    for (let i = 0; i < inputx.length; i++) {

        inputx[i].disabled = !inputx[i].disabled;
    }
    this.parentElement.children[1].classList.toggle("d-none");
    this.parentElement.children[2].disabled = false;
    this.parentElement.children[3].disabled = false;
    this.classList.toggle("d-none");
}

function cancelEditVinylRecordBtnClick() {

    let inputx = document.getElementsByClassName(' inputEdition');

    for (let i = 0; i < inputx.length; i++) {

        inputx[i].disabled = !inputx[i].disabled;
    }

    this.parentElement.children[0].classList.toggle("d-none");
    this.parentElement.children[2].disabled = true;
    this.parentElement.children[3].disabled = true;
    this.classList.toggle("d-none");
}

function saveVinylRecordEditedBtnClick() {
    let idInput = this.parentElement.parentElement.children[0].children[1].value;
    let albumInput = this.parentElement.parentElement.children[2].children[1].value;
    let artistInput = this.parentElement.parentElement.children[3].children[1].value;
    let releaseInput = this.parentElement.parentElement.children[4].children[1].value;
    let genreInput = this.parentElement.parentElement.children[5].children[1].value;
    let priceInput = this.parentElement.parentElement.children[6].children[1].value;
    let stockInput = this.parentElement.parentElement.children[7].children[1].value;
    let descriptionInput = this.parentElement.parentElement.children[8].children[1].value;
    let coverInput = this.parentElement.parentElement.children[9].children[1].value;

    var datos = new FormData(); // FormData for sending a package of information to the server

    datos.append('typeOfRequest', "vinylEdition");
    datos.append('edit_id', idInput);
    datos.append('edit_artist', artistInput);
    datos.append('edit_album', albumInput);
    datos.append('edit_release', releaseInput);
    datos.append('edit_genre', genreInput);
    datos.append('edit_price', priceInput);
    datos.append('edit_stock', stockInput);
    datos.append('edit_description', descriptionInput);
    datos.append('edit_cover', coverInput);

    fetch('services/administration.php', {
        method: 'POST',
        body: datos
    })

        .then(res => res.json())
        .then(data => {

            if (data == "error") {
                console.error("error on response");
            } else {
                niceAlert("green", "Saved", "niceAlert");

                let inputx = document.getElementsByClassName('inputEdition');

                for (let i = 0; i < inputx.length; i++) {

                    inputx[i].disabled = !inputx[i].disabled;
                }

                this.parentElement.children[0].classList.toggle("d-none");
                this.parentElement.children[1].classList.toggle("d-none");
                this.disabled = true;
            }

        });
}

function deleteVinylRecordBtnClick() {

    let idOfItemToDelete = this.parentElement.parentElement.children[0].children[1].value;

    $("#mmm2").modal();

    document.getElementById('modalConfirmation2').addEventListener('click', function () {

        var datos = new FormData(); // FormData for sending a package of information to the server

        datos.append('typeOfRequest', "deleteVinylRecord");
        datos.append('idOfItemToDelete', idOfItemToDelete);

        fetch('services/administration.php', {
            method: 'POST',
            body: datos
        })

            .then(res => res.json())
            .then(data => {

                console.log(data)
                if (data == "error") {
                    console.error("error on response");
                } else {
                    niceAlert("#f57379", "Deleted", "niceAlert");
                    vinylsActive();
                }

            });

    });

}

function ordersActive() {

    var datos = new FormData();

    datos.append('typeOfRequest', "ordersInfo");

    fetch('services/administration.php', {
        method: 'POST',
        body: datos
    })

        .then(res => res.json())
        .then(data => {

            let output = "";

            for (let i in data) {

                output += `
            <tr>
                <td>${data[i].id}</td>
                <td>${data[i].buyer_id}</td>
                <td class="text-nowrap">${data[i].transaction_date}</td>
                <td>${data[i].item_name}</td>
                <td>£${data[i].item_price}</td>
                <td>${data[i].item_qty}</td>
                <td>£${data[i].total}</td>
            </tr>
            `;
                document.getElementById('ordersTableBody').innerHTML = output;
            }
        });
}

function niceAlert(color, msg, id) { //Alert to display nicely messages on screen
    let niceAlert = document.getElementById(id);

    niceAlert.textContent = msg;
    niceAlert.style.backgroundColor = color;
    niceAlert.classList.toggle('niceAlertShow');
    setTimeout(function () {
        niceAlert.classList.toggle('niceAlertShow');
    }, 3000);
}

function userSearchBar() {

    let searchWord = document.getElementById('userSearchBar').value;
    console.log(searchWord);

    var datos = new FormData();

    datos.append('typeOfRequest', "searchingUserRecord");
    datos.append('searchWord', searchWord)

    fetch('services/administration.php', {
        method: 'POST',
        body: datos
    })

        .then(res => res.json())
        .then(data => {

            let output = "";

            for (let i in data) {

                output += `
                <tr>
                <td>
                    <div class="col-sm-12">
                        <div id="accordion" role="tablist" aria-multiselectable="true">
                        <div class="card">
                            <div class="card-header collapsed cursor-pointer" role="tab" id="heading${[i]}" data-toggle="collapse" data-parent="#accordion" href="#collapse${[i]}" aria-expanded="false" aria-controls="collapse${[i]}">
                                ${data[i].id} - ${data[i].nickname} - ${data[i].email}
                            </div>
                            <div id="collapse${[i]}" class="card-block in collapse row p-3" role="tabpanel" aria-labelledby="heading${[i]}">

                                <div class="col-sm-6 border-right">
                                    <h4 class="">User ID</h4>
                                    <input type="text" style="line-height:20px;" placeholder="User id" class="col-sm-12 p-2 mb-3" value="${data[i].id}" disabled>
                                    <br>
                                </div>
                                
                                <div class="col-sm-6">
                                    <h4 class="">User type</h4>
                                    <input type="text" style="line-height:20px;" placeholder="user type" class="col-sm-12 p-2 mb-3" value="${data[i].type}" disabled>
                                    <br>
                                </div>

                                <div class="col-sm-6 border-right">
                                    <h4 class="">Name</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Name" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].name}" disabled>
                                    <br>
                                </div>
                                
                                <div class="col-sm-6">
                                    <h4 class="">Surname</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Surname" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].surname}" disabled>
                                    <br>
                                </div>

                                <div class="col-sm-6 border-right">
                                    <h4 class="">Nickname</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Surname" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].nickname}" disabled>
                                    <br>
                                </div>
                                
                                <div class="col-sm-6">
                                    <h4 class="">Birthday</h4>
                                    <input type="date" style="line-height:20px;" placeholder="Release" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].birth}" disabled>
                                    <br>
                                </div>
                                
                                <div class="col-sm-6 border-right">
                                    <h4 class="">Email</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Price" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].email}" disabled>
                                    <br>
                                </div>

                                <div class="col-sm-6">
                                    <h4 class="">Password</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Stock" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].password}" disabled>
                                    <br>
                                </div>

                                <div class="col-sm-6 border-right">
                                    <h4 class="">Phone</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Surname" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].phone}" disabled>
                                    <br>
                                </div>
                                
                                <div class="col-sm-6 border-right">
                                    <h4 class="">Street</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Price" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].street}" disabled>
                                    <br>
                                </div>

                                <div class="col-sm-6">
                                    <h4 class="">City</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Stock" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].city}" disabled>
                                    <br>
                                </div>
                                
                                <div class="col-sm-6 border-right">
                                    <h4 class="">Postcode</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Price" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].postcode}" disabled>
                                    <br>
                                </div>

                                <div class="col-sm-6">
                                    <h4 class="">Country</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Stock" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].country}" disabled>
                                    <br>
                                </div>
                                
                                <div class="col-sm-6">
                                    <h4 class="">Join Date</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Release" class="col-sm-12 p-2 mb-3" value="${data[i].reg_date}" disabled>
                                    <br>
                                </div>

                                <div class="col-sm-12 row text-center">
                                    <button class="btn btn-info ml-3 editUserRecordBtn">Edit</button>
                                    <button class="btn btn-primary ml-3 d-none cancelEditionOfUserRecordBtn">Cancel</button>
                                    <button class="btn btn-success ml-3 saveEditedUserRecordBtn" disabled>Save</button>
                                    <button class="btn btn-danger ml-3 deleteUserRecordBtn" disabled>Delete</button>
                                    <button class="btn btn-secondary mr-3 ml-auto closeEditVinylRecordCollapse" role="tab" id="heading${[i]}" data-toggle="collapse" data-parent="#accordion" href="#collapse${[i]}" aria-expanded="false" aria-controls="collapse${[i]}">Close</button>
                                </div>

                            </div>
                        </div>
                        </div>
                    </div>
                </td>
                </tr>
                `;
            }

            document.getElementById('userTableBody').innerHTML = output;
        });
}

function vinylsSearchBar() {

    let searchWord = document.getElementById('vinylsSearchBar').value;
    console.log(searchWord);

    var datos = new FormData();

    datos.append('typeOfRequest', "searchingVinylRecord");
    datos.append('searchWord', searchWord)

    fetch('services/administration.php', {
        method: 'POST',
        body: datos
    })

        .then(res => res.json())
        .then(data => {

            let output = "";

            for (let i in data) {

                output += `
                <tr>
                <td>
                    <div class="col-sm-12">
                        <div id="accordion" role="tablist" aria-multiselectable="true">
                        <div class="card">
                            <div class="card-header collapsed cursor-pointer" role="tab" id="heading${[i]}" data-toggle="collapse" data-parent="#accordion" href="#collapse${[i]}" aria-expanded="false" aria-controls="collapse${[i]}">
                                ${data[i].album} - ${data[i].artist}
                            </div>
                            <div id="collapse${[i]}" class="card-block in collapse row p-3" role="tabpanel" aria-labelledby="heading${[i]}">

                                <div class="col-sm-6 border-right">
                                    <h4 class="">Item ID</h4>
                                    <input type="text" style="line-height:20px;" placeholder="ID" class="col-sm-12 p-2 mb-3" value="${data[i].id}" disabled>
                                    <br>
                                </div>
                                
                                <div class="col-sm-6">
                                    <h4 class="">Owner_ID</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Owner ID" class="col-sm-12 p-2 mb-3" value="${data[i].owner_id}" disabled>
                                    <br>
                                </div>

                                <div class="col-sm-6 border-right">
                                    <h4 class="">Album</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Album" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].album}" disabled>
                                    <br>
                                </div>
                                
                                <div class="col-sm-6">
                                    <h4 class="">Artist</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Artist" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].artist}" disabled>
                                    <br>
                                </div>

                                <div class="col-sm-6 border-right">
                                    <h4 class="">Release</h4>
                                    <input type="date" style="line-height:20px;" placeholder="Release" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].release_date}" disabled>
                                    <br>
                                </div>
                                
                                <div class="col-sm-6">
                                    <h4 class="">Genre</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Genre" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].genre}" disabled>
                                    <br>
                                </div>
                                
                                <div class="col-sm-6 border-right">
                                    <h4 class="">Price</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Price" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].price}" disabled>
                                    <br>
                                </div>

                                <div class="col-sm-6">
                                    <h4 class="">Stock</h4>
                                    <input type="text" style="line-height:20px;" placeholder="Stock" class="col-sm-12 p-2 mb-3 inputEdition" value="${data[i].stock}" disabled>
                                    <br>
                                </div>

                                <div class="col-sm-6 border-right">
                                    <h4 class="">Description</h4>
                                    <textarea style="width:100%;overflow:auto;resize:none" rows="20" class="p-2 mb-3 inputEdition" placeholder="Description" disabled>${data[i].description}</textarea>
                                    <br>
                                </div>
                                
                                <div class="col-sm-6">
                                    <h4 class="">Cover</h4>
                                    <textarea style="width:100%;overflow:auto;resize:none" rows="4" class="p-2 mb-3 inputEdition" placeholder="cover url" disabled>${data[i].cover}</textarea>
                                    <div class="text-center">
                                        <img src="${data[i].cover}" class="img-fluid" id="purchasedCoverModal" alt="Responsive image">
                                    </div>
                                    <br>
                                </div>

                                <div class="col-sm-12 row text-center">
                                    <button class="btn btn-info ml-3 editVinylRecordBtn">Edit</button>
                                    <button class="btn btn-primary ml-3 d-none cancelEditionOfVinylRecordBtn">Cancel</button>
                                    <button class="btn btn-success ml-3 saveEditedVinylRecordBtn" disabled>Save</button>
                                    <button class="btn btn-danger ml-3 deleteVinylRecordBtn" disabled>Delete</button>
                                    <button class="btn btn-secondary mr-3 ml-auto closeEditVinylRecordCollapse" role="tab" id="heading${[i]}" data-toggle="collapse" data-parent="#accordion" href="#collapse${[i]}" aria-expanded="false" aria-controls="collapse${[i]}">Close</button>
                                </div>

                            </div>
                        </div>
                        </div>
                    </div>
                </td>
                </tr>
                `;
            }

            document.getElementById('vinylsTableBody').innerHTML = output;

        });
}