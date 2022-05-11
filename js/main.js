window.onload = function () {
    checkSession();
    homeActive();
    document.getElementById('brandMenuBtn').addEventListener('click', brandActive);
    document.getElementById('storeMenuBtn').addEventListener('click', storeActive);
    document.getElementById('homeMenuBtn').addEventListener('click', homeActive);
    document.getElementById('sellingMenuBtn').addEventListener('click', sellingActive);
    document.getElementById('purchaseMenuBtn').addEventListener('click', purchaseActive);
    document.getElementById('profileMenuBtn').addEventListener('click', profileActive);
    document.getElementById('searchBar').addEventListener('keyup', searchBar);
    destroySession();
}

function checkSession(){ //checking if there is a session opened if not then get back to log in.

    let userType = sessionStorage.getItem('SessionType');
    
    if(!sessionStorage.getItem('SessionEmail') && !sessionStorage.getItem('SessionID')){
        location.href='index.html';   
    }else if (userType === "admin"){
            location.href='admin.html'; 
    } else {
    }
}

function destroySession(){
    document.getElementById('logoutMenuBtn').addEventListener('click', logOut);
    
    function logOut(){
        sessionStorage.removeItem('SessionEmail');
        sessionStorage.removeItem('SessionID');
        sessionStorage.removeItem('SessionUser');
        sessionStorage.removeItem('SessionType');
        location.href='index.html';
    };
}

function brandActive() {
    hideAllContainers();
    let home = document.getElementById('homeContainer');
    home.style.display = "block";
    document.getElementById('homeMenuBtn').classList.add('active');
}

function homeActive() {
    hideAllContainers();
    document.getElementById('homeContainer').style.display = "block";
    removeActiveClass();
    document.getElementById('homeMenuBtn').classList.add('active');

}

function storeActive() {
    hideAllContainers();
    document.getElementById('storeContainer').style.display = "block";
    removeActiveClass();
    document.getElementById('storeMenuBtn').classList.add('active');

    var datos = new FormData();

    datos.append('typeOfRequest', "displayAllVinyls");

    fetch('services/server.php', {
        method: 'POST',
        body: datos
    })

        .then(res => res.json())
        .then(data => {

            let output = "";

            if (!data) {
                console.log('empty!')
            } else {

                for (let i in data) {

                    output += `
                <div class="col-sm-4 pb-2" idOfAlbum="${data[i].id}"> <!--ITEM-->
                    <div class="card shadow-sm">
                        <img class="card-img-top albumCover" src="${data[i].cover}"
                            alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title text-center textOverflow">${data[i].album}</h5>
                            <button type="button" class="btn btn-lg btn-block btn-outline-success buyBtn"
                                data-toggle="modal" data-target="#buyModal">£<span
                                    class="albumPrice">${data[i].price}</span></button>
                            <p class="albumDescription d-none">${data[i].description}</p>
                            <p class="itemAvailability d-none">${data[i].stock}</p>
                            <p class="itemGenre d-none">${data[i].genre}</p>
                            <p class="itemRelease d-none">${data[i].release_date}</p>
                            <p class="itemArtist d-none">${data[i].artist}</p>
                        </div>
                    </div>
                </div>
                `;
                }
                document.getElementById('storeItems').innerHTML = output;
                buyProductModal();
            }
        });
}

function sellingActive() {
    hideAllContainers();
    document.getElementById('sellingContainer').style.display = "block";
    removeActiveClass();
    document.getElementById('sellingMenuBtn').classList.add('active');

    var datos = new FormData();

    var sessionStorageData = sessionStorage.getItem('SessionID');
    datos.append('userID', sessionStorageData);
    datos.append('typeOfRequest', "displaySellingVinyls");

    fetch('services/server.php', {
        method: 'POST',
        body: datos
    })

        .then(res => res.json())
        .then(data => {

            let output = "";

            if (!data) {
                console.log('empty!')
            } else {

                for (let i in data) {

                    output += `
                    <div class="accordion mb-3 "> <!--ITEM-->

                        <div class="cover flexAlignXnY">
                            <img src="${data[i].cover}"
                                class="" alt="Responsive image">
                        </div>

                        <h2 class="sellingItemTitle mr-auto pl-2">${data[i].album}</h2>

                        <div class="viewBtn flexAlignXnY hoverDarker ml-2" data-toggle="modal" data-target="#buyModal">
                            <img src="img/icons/eye.svg" alt="" width="50" height="50" title="Bootstrap"></div>

                        <div class="deleteBtn flexAlignXnY hoverDarker ml-2">
                            <img src="img/icons/x-square.svg" alt="" width="50" height="50" title="Bootstrap" data-toggle="modal" data-target="#mmm"></div>

                        <div class="editBtn flexAlignXnY hoverDarker ml-2" data-toggle="modal" data-target="#editProductModal">
                            <img src="img/icons/pencil-square.svg" alt="" width="50" height="50" title="Bootstrap">
                        </div>

                        <p class="sellingItemId d-none">${data[i].id}</p>
                        <p class="sellingItemPrice d-none">${data[i].price}</p>
                        <p class="sellingItemDescription d-none">${data[i].description}</p>
                        <p class="sellingItemStock d-none">${data[i].stock}</p>
                        <p class="sellingItemGenre d-none">${data[i].genre}</p>
                        <p class="sellingItemRelease d-none">${data[i].release_date}</p>
                        <p class="sellingItemArtist d-none">${data[i].artist}</p>
                    </div>
                    `;
                }
                document.getElementById('sellingItems').innerHTML = output;
                addingNewItemToSell();
                editProductModal();
                viewProductModal();

                let deleteBtn = document.getElementsByClassName('deleteBtn');
                for (let i = 0; i < deleteBtn.length; i++) {
                    deleteBtn[i].addEventListener('click', deleteSellingItem);
                }
                
            }
        });
}

function purchaseActive() {
    hideAllContainers();
    document.getElementById('purchaseContainer').style.display = "block";
    removeActiveClass();
    document.getElementById('purchaseMenuBtn').classList.add('active');

    var datos = new FormData();

    var sessionStorageData = sessionStorage.getItem('SessionID');
    datos.append('userID', sessionStorageData);
    datos.append('typeOfRequest', "displayPurchasedVinyls");

    fetch('services/server.php', {
        method: 'POST',
        body: datos
    })

        .then(res => res.json())
        .then(data => {

            let output = "";

            if (!data) {
                console.log('empty!')
            } else {

                for (let i in data) {

                    output += `
                <div class="purchaseItem d-flex flexAlignXnY justify-content-between purchaseItemTitle">
                    <img src="${data[i].item_cover}" height="78px" class="mr-1 purchaseItemPic" alt="">
                    <h2 class="purchaseItemTitle">${data[i].item_name}</h2>
                    <div class="btnnn" id=""><img src="img/icons/eye.svg" alt="" class="eyebtn" title="Bootstrap" data-toggle="modal" data-target="#purchasedItemModal"></div>

                    <span class="d-none">${data[i].item_price}</span>
                    <span class="d-none">${data[i].item_qty}</span>
                    <span class="d-none">${data[i].total}</span>
                    <span class="d-none">${data[i].transaction_date}</span>
                </div>
                `;
                }
                document.getElementById('purchasedItems').innerHTML = output;
                seePurchasedDetails();
            }
        });
}

function profileActive() {
    hideAllContainers();
    document.getElementById('profileContainer').style.display = "block";
    removeActiveClass();
    document.getElementById('profileMenuBtn').classList.add('active');

    var datos = new FormData();

    var sessionStorageData = sessionStorage.getItem('SessionID');
    datos.append('userID', sessionStorageData);
    datos.append('typeOfRequest', "userDetails");

    fetch('services/server.php', {
        method: 'POST',
        body: datos
    })

        .then(res => res.json())
        .then(data => {

            let output = "";

            if (!data) {
                console.log('empty!')
            } else {

                for (let i = 0; i < data.length; i++) {

                    output = `
                <div class="d-flex align-items-center mb-4 mx-auto userInfoItem">
                    <div class="weeIcon"><img src="img/icons/person-fill.svg" alt=""></div>
                    <input type="text" name="" placeholder="Nickname" value="${data[i].nickname}" class="inputEnable" id="userNickname" disabled>
                </div>

                <div class="d-flex align-items-center mb-4 mx-auto userInfoItem">
                    <div class="weeIcon mb-auto"><img src="img/icons/person-lines-fill.svg" alt=""></div>
                    <div>
                        <input type="text" name="" placeholder="Name" value="${data[i].name}" class="mb-2 inputEnable" id="userName" disabled>
                        <input type="text" name="" placeholder="Surname" value="${data[i].surname}" class="mb-2 inputEnable" id="userSurname" disabled>
                    </div>
                </div>

                <div class="d-flex align-items-center mb-4 mx-auto userInfoItem">
                    <div class="weeIcon"><img src="img/icons/phone.svg" alt=""></div>
                    <input type="number" name="" placeholder="+44 000-0000-000" value="${data[i].phone}" class="inputEnable" id="userPhone" disabled>
                </div>

                <div class="d-flex align-items-center mb-4 mx-auto userInfoItem">
                    <div class="weeIcon"><img src="img/icons/at.svg" alt=""></div>
                    <input type="email" name="" placeholder="Email" value="${data[i].email}" class="inputEnable" id="userEmail" disabled>
                </div>

                <div class="d-flex align-items-center mb-4 mx-auto userInfoItem">
                    <div class="weeIcon"><img src="img/icons/lock-fill.svg" alt=""></div>
                    <input type="password" name="" placeholder="Password" value="${data[i].password}" class="inputEnable" id="userPassword" disabled>
                </div>

                <div class="d-flex align-items-center mb-4 mx-auto userInfoItem">
                    <div class="weeIcon"><img src="img/icons/calendar.svg" alt=""></div>
                    <input type="date" name="" placeholder="Birthdate" value="${data[i].birth}" class="inputEnable" id="userBirthdate" disabled>
                </div>

                <div class="d-flex align-items-center mb-4 mx-auto userInfoItem">
                    <div class="weeIcon mb-auto"><img src="img/icons/house-door.svg" alt=""></div>
                    <div>
                        <input type="text" name="" placeholder="Street" value="${data[i].street}" class="mb-2 inputEnable" id="userStreet" disabled>
                        <input type="text" name="" placeholder="city" value="${data[i].city}" class="mb-2 inputEnable" id="userCity" disabled>
                        <input type="text" name="" placeholder="postcode" value="${data[i].postcode}" class="mb-2 inputEnable" id="userPostcode" disabled>
                        <input type="text" name="" placeholder="country" value="${data[i].country}" class="mb-2 inputEnable" id="userCountry" disabled>
                    </div>
                </div>

                <div class="text-center">
                    <button class="editUserDetailsBtn" id="editUserDetailsBtn">EDIT</button>
                    <button class="editUserDetailsBtn d-none" id="saveEditedUserDetailsBtn">SAVE</button>
                </div>
                `;

                }
                document.getElementById('userProfileDetails').innerHTML = output;

                document.getElementById('editUserDetailsBtn').addEventListener('click', editUserDetails);
            }
        });
}

function hideAllContainers() {
    let cnt = document.getElementsByClassName('contentContainer');

    for (let i = 0; i < cnt.length; i++) {
        cnt[i].style.display = "none";
    }
}

function removeActiveClass() {
    let navLink = document.getElementsByClassName('nav-link');

    for (let i = 0; i < navLink.length; i++) {
        navLink[i].classList.remove('active');
    }
}

function buyProductModal() {
    let buyBtn = document.getElementsByClassName('buyBtn');

    for (let i = 0; i < buyBtn.length; i++) {
        buyBtn[i].addEventListener('click', function () {

            //obtener informacion de item
            let albumId = this.parentElement.parentElement.parentElement.getAttribute("idOfAlbum");
            let albumCover = this.parentElement.parentElement.children[0].getAttribute("src");
            let albumName = this.parentElement.children[0].textContent;
            let albumPrice = this.children[0].textContent;
            let albumDescription = this.parentElement.children[2].textContent;
            let itemAvailability = this.parentElement.children[3].textContent;
            let itemGenre = this.parentElement.children[4].textContent;
            let itemRelease = this.parentElement.children[5].textContent;
            let itemArtist = this.parentElement.children[6].textContent;

            //Transfer informacion de item a modal
            document.getElementById('albumId').textContent = albumId;
            document.getElementById('modalLabel').textContent = albumName;
            document.getElementById('albumCover').setAttribute("src", albumCover);
            document.getElementById('albumPrice').textContent = albumPrice;
            document.getElementById('albumDescription').textContent = albumDescription;
            document.getElementById('itemAvailable').textContent = itemAvailability;
            document.getElementById('albumGenre').textContent = itemGenre;
            document.getElementById('albumRelease').textContent = itemRelease;
            document.getElementById('albumArtist').textContent = itemArtist;

            checkIfItemIsAvailable(itemAvailability);
        })
    }
}

function checkIfItemIsAvailable(itemAvailability) {
    if (itemAvailability == 0) {
        document.getElementById('itemAvailability').style.display = "none";
        document.getElementById('itemUnavailable').style.display = "block";
        document.getElementById('buyingBtn').style.display = "none";
    } else {
        document.getElementById('itemUnavailable').style.display = "none";
        document.getElementById('itemAvailability').style.display = "block";
        document.getElementById('buyingBtn').style.display = "inline-block";
    }
    paymentSuccess();
    dropdownAvailability();
}

function editProductModal() {
    
    let editBtn = document.getElementsByClassName('editBtn');

    for (let i = 0; i < editBtn.length; i++) {
        editBtn[i].addEventListener('click', function () {

            document.getElementById('editProductModalSaveBtn').style.display = "inline-block";
            document.getElementById('editProductModal-AddNewItemBtn').style.display = "none";

            //obtener informacion de item
            let albumCover = this.parentElement.children[0].children[0].getAttribute("src");
            let albumName = this.parentElement.children[1].textContent;
            let albumId = this.parentElement.children[5].textContent;
            let albumPrice = this.parentElement.children[6].textContent;
            let albumDescription = this.parentElement.children[7].textContent;
            let albumStockAvailable = this.parentElement.children[8].textContent;
            let albumGenre = this.parentElement.children[9].textContent;
            let albumRelease = this.parentElement.children[10].textContent;
            let albumArtist = this.parentElement.children[11].textContent;

            //Transfer informacion de item a modal
            document.getElementById('editAlbumCoverDislpayed').setAttribute("src", albumCover);
            document.getElementById('editAlbumTitle').value = albumName;
            document.getElementById('editAlbumCover').value = albumCover;
            document.getElementById('editAlbumPrice').value = albumPrice;
            document.getElementById('editAlbumInfo').textContent = albumDescription;
            document.getElementById('editAlbumStock').value = albumStockAvailable;
            document.getElementById('editAlbumRelease').value = albumRelease;
            document.getElementById('editAlbumGenre').value = albumGenre;
            document.getElementById('editAlbumArtist').value = albumArtist;
            document.getElementById('vinyl_id').textContent = albumId;

        })
    }
    document.getElementById('editProductModalSaveBtn').addEventListener('click', saveChangesEdit);
}

function viewProductModal() {
    let viewBtn = document.getElementsByClassName('viewBtn');

    for (let i = 0; i < viewBtn.length; i++) {
        viewBtn[i].addEventListener('click', function () {

            //obtener informacion de item
            let albumCover = this.parentElement.children[0].children[0].getAttribute("src");
            let albumName = this.parentElement.children[1].textContent;
            let albumId = this.parentElement.children[5].textContent;
            let albumPrice = this.parentElement.children[6].textContent;
            let albumDescription = this.parentElement.children[7].textContent;
            let albumStockAvailable = this.parentElement.children[8].textContent;
            let albumGenre = this.parentElement.children[9].textContent;
            let albumRelease = this.parentElement.children[10].textContent;
            let albumArtist = this.parentElement.children[11].textContent;

            //Transfer informacion de item a modal
            document.getElementById('modalLabel').textContent = albumName;
            document.getElementById('albumCover').setAttribute("src", albumCover);
            document.getElementById('albumPrice').textContent = albumPrice;
            document.getElementById('albumDescription').textContent = albumDescription;
            document.getElementById('itemAvailable').textContent = albumStockAvailable;
            document.getElementById('albumGenre').textContent = albumGenre;
            document.getElementById('albumRelease').textContent = albumRelease;
            document.getElementById('albumArtist').textContent = albumArtist;
            document.getElementById('albumId').textContent = albumId;

            checkIfItemIsAvailable(albumStockAvailable);

            document.getElementById("buyingBtn").style.display = "none";

        })
    }
}

function addingNewItemToSell() {
    let addNewItemToSellBtn = document.getElementById('addNewItemToSellBtn');

    addNewItemToSellBtn.addEventListener('click', function () {

        //Clear inputs
        document.getElementById('editAlbumCoverDislpayed').setAttribute("src", "https://www.sodi-techedm.co.uk/wp-content/themes/consultix/images/no-image-found-360x260.png");
        document.getElementById('editAlbumTitle').value = "";
        document.getElementById('editAlbumCover').value = "";
        document.getElementById('editAlbumPrice').value = "";
        document.getElementById('editAlbumInfo').value = "";
        document.getElementById('editAlbumStock').value = "";
        document.getElementById('editAlbumRelease').value = "";
        document.getElementById('editAlbumGenre').value = "";
        document.getElementById('editAlbumArtist').value = "";

        document.getElementById('editProductModalSaveBtn').style.display = "none";
        document.getElementById('editProductModal-AddNewItemBtn').style.display = "inline-block";

        let pictureURL = document.getElementById('editAlbumCover');

        pictureURL.addEventListener('keyup', function () {

            document.getElementById('editAlbumCoverDislpayed').setAttribute("src", pictureURL.value);

        })

    })
    document.getElementById('editProductModal-AddNewItemBtn').addEventListener('click', addNewVinilysToDB);
}


function dropdownAvailability() { //fill up dropdown with the amount available

    let available = document.getElementById('itemAvailable').textContent;
    let dropdown = document.getElementById('itemsAvailableDropDown');
    let albumPrice = document.getElementById('albumPrice').textContent;
    let albumPriceDisplayed = document.getElementById('albumPriceDisplayed').textContent = parseFloat(albumPrice);
    dropdown.innerText = "";

    for (let i = 0; i < available; i++) {
        dropdown.add(new Option(i + 1));
    }


    document.getElementById("itemsAvailableDropDown").onchange = listQ;

    function listQ() {
        price = parseFloat(albumPrice);
        qty = parseInt(this.value);
        total = parseFloat(price * qty);

        document.getElementById('albumPriceDisplayed').textContent = total;
    }
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

function paymentSuccess() {
    let buyBtn = document.getElementById('buyingBtn');

    buyBtn.addEventListener('click', successfullyPaid);
}

function successfullyPaid() {
    niceAlert('#5dbe54', 'Success!', 'niceAlert');

    paymentDB();
}

function paymentDB(){
    let total = parseFloat(document.getElementById('albumPriceDisplayed').textContent);
    let item_id = document.getElementById('albumId').textContent;
    let item_name = document.getElementById('modalLabel').textContent;
    let item_cover = document.getElementById('albumCover').getAttribute("src");
    let item_qty = document.getElementById('itemsAvailableDropDown').value;
    let item_price = document.getElementById('albumPrice').textContent;

    var datos = new FormData();

    var sessionStorageData = sessionStorage.getItem('SessionID');
    datos.append('userID', sessionStorageData);
    datos.append('typeOfRequest', "itemPaid");
    
    datos.append('item_id', item_id);
    datos.append('item_cover', item_cover);
    datos.append('item_name', item_name);
    datos.append('item_qty', item_qty);
    datos.append('item_price', item_price);
    datos.append('total', total);

    fetch('services/server.php', {
        method: 'POST',
        body: datos
    })

        .then(res => res.json())
        .then(data => {
        });
        storeActive();
}

function seePurchasedDetails() {
    let viewBtn = document.getElementsByClassName('btnnn');

    for (let i = 0; i < viewBtn.length; i++) {
        viewBtn[i].addEventListener('click', function () {

            //get info from card
            let cover = this.parentElement.children[0].getAttribute("src");
            let title = this.parentElement.children[1].textContent;
            let price = this.parentElement.children[3].textContent;
            let qty = this.parentElement.children[4].textContent;
            let total = this.parentElement.children[5].textContent;
            let date = this.parentElement.children[6].textContent;

            //display info on modal
            document.getElementById('purchasedCoverModal').setAttribute("src", cover);
            document.getElementById('purchasedTitleModal').textContent = title;
            document.getElementById('purchasedPriceModal').textContent = price;
            document.getElementById('purchasedQtyModal').textContent = qty;
            document.getElementById('purchasedTotalModal').textContent = total;
            document.getElementById('purchasedDateModal').textContent = date;
        })

    }
}

function editUserDetails() {

    let inputx = document.getElementsByClassName('inputEnable');

    for (let i = 0; i < inputx.length; i++) {

        inputx[i].disabled = !inputx[i].disabled;
    }

    this.style.display="none";

    let saveBtn = document.getElementById('saveEditedUserDetailsBtn');
    saveBtn.classList.toggle('d-none');
    saveBtn.addEventListener('click', function(){
        let userNickname = document.getElementById('userNickname').value;
        let userName = document.getElementById('userName').value;
        let userSurname = document.getElementById('userSurname').value;
        let userBirthdate = document.getElementById('userBirthdate').value;
        let userPhone = document.getElementById('userPhone').value;
        let userEmail = document.getElementById('userEmail').value;
        let userPassword = document.getElementById('userPassword').value;
        let userStreet = document.getElementById('userStreet').value;
        let userCity = document.getElementById('userCity').value;
        let userPostcode = document.getElementById('userPostcode').value;
        let userCountry = document.getElementById('userCountry').value;

        var datos = new FormData();
    
        var sessionStorageData = sessionStorage.getItem('SessionID');
        datos.append('userID', sessionStorageData);
        datos.append('typeOfRequest', "editUserRecord");
    
        datos.append('userNickname', userNickname);
        datos.append('userName', userName);
        datos.append('userSurname', userSurname);
        datos.append('userBirthdate', userBirthdate);
        datos.append('userPhone', userPhone);
        datos.append('userEmail', userEmail);
        datos.append('userPassword', userPassword);
        datos.append('userStreet', userStreet);
        datos.append('userCity', userCity);
        datos.append('userPostcode', userPostcode);
        datos.append('userCountry', userCountry);
    
        fetch('services/server.php', {
            method: 'POST',
            body: datos
        })
    
            .then(res => res.json())
            .then(data => {
                console.log(data);
                profileActive()
                niceAlert('#5dbe54', 'Done!', 'saveChanges');
            });
    })
}


function addNewVinilysToDB() {

    let artist = document.getElementById('editAlbumArtist').value;
    let album = document.getElementById('editAlbumTitle').value;
    let cover = document.getElementById('editAlbumCover').value;
    let cov = document.getElementById('editAlbumCoverDislpayed');
    if (cov.clientWidth <= 0 || cov.clientHeight <= 0 || cover=="") {
        cover = 'https://www.sodi-techedm.co.uk/wp-content/themes/consultix/images/no-image-found-360x260.png';
        console.log(cov.clientWidth);
    }
    let release_date = document.getElementById('editAlbumRelease').value;
    let genre = document.getElementById('editAlbumGenre').value;
    let description = document.getElementById('editAlbumInfo').value;
    let price = document.getElementById('editAlbumPrice').value;
    let stock = document.getElementById('editAlbumStock').value;

    var datos = new FormData();

    var sessionStorageData = sessionStorage.getItem('SessionID');
    datos.append('userID', sessionStorageData);
    datos.append('typeOfRequest', "addNewVinyls");

    datos.append('artist', artist);
    datos.append('album', album);
    datos.append('cover', cover);
    datos.append('release_date', release_date);
    datos.append('genre', genre);
    datos.append('description', description);
    datos.append('price', price);
    datos.append('stock', stock);

    fetch('services/server.php', {
        method: 'POST',
        body: datos
    })

        .then(res => res.json())
        .then(data => {
            if (data != 'success') {
                console.error("something went wrong");
            } else {
                niceAlert('#5dbe54', 'Added Successfully!', 'niceAlert');
                sellingActive();
            }
            console.log(data);
        });
}

function saveChangesEdit(){
    document.getElementById('modalConfirmation2').addEventListener('click', saveEditionToDB);
}

function saveEditionToDB(){
    let albumTitle = document.getElementById('editAlbumTitle').value;
    let albumCover = document.getElementById('editAlbumCover').value;
    let albumPrice = document.getElementById('editAlbumPrice').value;
    let albumDescription = document.getElementById('editAlbumInfo').textContent;
    let albumStock = document.getElementById('editAlbumStock').value;
    let albumReleaseDate = document.getElementById('editAlbumRelease').value;
    let albumGenre = document.getElementById('editAlbumGenre').value;
    let albumArtist = document.getElementById('editAlbumArtist').value;
    let albumId = document.getElementById('vinyl_id').textContent;

    var datos = new FormData();

    datos.append('typeOfRequest', "editVinylRecord");

    datos.append('vinyl_id', albumId);
    datos.append('artist', albumArtist);
    datos.append('album', albumTitle);
    datos.append('cover', albumCover);
    datos.append('release_date', albumReleaseDate);
    datos.append('genre', albumGenre);
    datos.append('description', albumDescription);
    datos.append('price', albumPrice);
    datos.append('stock', albumStock);

    fetch('services/server.php', {
        method: 'POST',
        body: datos
    })

        .then(res => res.json())
        .then(data => {
            sellingActive();
            niceAlert('#5dbe54', 'Done!', 'saveChanges');
        });
}

function deleteSellingItem(){
    let itemId = this.parentElement.children[5].textContent;

    document.getElementById('modalConfirmation').addEventListener('click', function(){
        var datos = new FormData();
    
        datos.append('typeOfRequest', "deleteItemRecord");
        datos.append('itemId', itemId);
        
        fetch('services/server.php', {
            method: 'POST',
            body: datos
        })
    
            .then(res => res.json())
            .then(data => {
                sellingActive();
                niceAlert('#5dbe54', 'Done!', 'saveChanges');
            });
    })
    
}

function searchBar(){
    hideAllContainers();
    document.getElementById('storeContainer').style.display = "block";
    removeActiveClass();
    document.getElementById('storeMenuBtn').classList.add('active');

    let searchWord = document.getElementById('searchBar').value;
    console.log(searchWord);

    var datos = new FormData();

    datos.append('typeOfRequest', "searchingFromRecords");
    datos.append('searchWord', searchWord)

    fetch('services/server.php', {
        method: 'POST',
        body: datos
    })

        .then(res => res.json())
        .then(data => {

            let output = "";

            if (!data) {
                console.log('empty!')
            } else {

                for (let i in data) {

                    output += `
                <div class="col-sm-4 pb-2" idOfAlbum="${data[i].id}"> <!--ITEM-->
                    <div class="card shadow-sm">
                        <img class="card-img-top albumCover" src="${data[i].cover}"
                            alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title text-center textOverflow">${data[i].album}</h5>
                            <button type="button" class="btn btn-lg btn-block btn-outline-success buyBtn"
                                data-toggle="modal" data-target="#buyModal">£<span
                                    class="albumPrice">${data[i].price}</span></button>
                            <p class="albumDescription d-none">${data[i].description}</p>
                            <p class="itemAvailability d-none">${data[i].stock}</p>
                            <p class="itemGenre d-none">${data[i].genre}</p>
                            <p class="itemRelease d-none">${data[i].release_date}</p>
                            <p class="itemArtist d-none">${data[i].artist}</p>
                        </div>
                    </div>
                </div>
                `;
                }
                document.getElementById('storeItems').innerHTML = output;
                buyProductModal();
            }
        });
}