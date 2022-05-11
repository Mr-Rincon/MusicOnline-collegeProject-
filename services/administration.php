<?php

    include_once 'connection.php';

    $typeOfRequest = $_POST['typeOfRequest'] ?? '';

    if ($typeOfRequest == "dashboardInfo") {

        $UsersQtyAsk = mysqli_query($connection, "SELECT * FROM user") or die (mysqli_connect_error());
        $UsersQty = mysqli_num_rows($UsersQtyAsk);

        $VinylsQtyAsk = mysqli_query($connection, "SELECT * FROM vinyls") or die (mysqli_connect_error());
        $VinylsQty = mysqli_num_rows($VinylsQtyAsk);

        $OrdersQtyAsk = mysqli_query($connection, "SELECT * FROM orders") or die (mysqli_connect_error());
        $OrdersQty = mysqli_num_rows($OrdersQtyAsk);

        $dashInfo = array("UsersQty"=>$UsersQty, "VinylsQty"=>$VinylsQty, "OrdersQty"=>$OrdersQty);

        echo json_encode($dashInfo);

    }else if($typeOfRequest == "usersInfo"){

        $usersFromDB = mysqli_fetch_all(mysqli_query($connection, "SELECT * FROM `user`"),MYSQLI_ASSOC);

        echo json_encode($usersFromDB);

    }else if($typeOfRequest == "vinylsInfo"){

        $vinylsFromDB = mysqli_fetch_all(mysqli_query($connection, "SELECT * FROM `vinyls`"),MYSQLI_ASSOC);

        echo json_encode($vinylsFromDB);

    }else if($typeOfRequest == "ordersInfo"){

        $ordersFromDB = mysqli_fetch_all(mysqli_query($connection, "SELECT * FROM `orders`"),MYSQLI_ASSOC);

        echo json_encode($ordersFromDB);

    }else if($typeOfRequest == "editUserRecord"){

        $user_id = $_POST['user_id'] ?? '';
        $user_nickname = $_POST['user_nickname'] ?? '';
        $user_name = $_POST['user_name'] ?? '';
        $user_surname = $_POST['user_surname'] ?? '';
        $user_phone = $_POST['user_phone'] ?? '';
        $user_email = $_POST['user_email'] ?? '';
        $user_password = $_POST['user_password'] ?? '';
        $user_street = $_POST['user_street'] ?? '';
        $user_city = $_POST['user_city'] ?? '';
        $user_postcode = $_POST['user_postcode'] ?? '';
        $user_country = $_POST['user_country'] ?? '';
        $user_birth = $_POST['user_birth'] ?? '';

        $updateQuery = $connection ->query("UPDATE `user` SET `nickname` = '$user_nickname', `name` = '$user_name', `surname` = '$user_surname', `birth` = '$user_birth', `phone` = '$user_phone', `email` = '$user_email', `password` = '$user_password', `street` = '$user_street', `city` = '$user_city', `postcode` = '$user_postcode', `country` = '$user_country' WHERE `user`.`id` = '$user_id'");

        echo json_encode($updateQuery);

    }else if($typeOfRequest == "deleteUserRecord"){

        $idOfItemToDelete = $_POST['idOfItemToDelete'] ?? '';

        if (!$connection) {
            die("Connection failed: " . mysqli_connect_error());
        }
    
        // sql to delete a record
        $sql = "DELETE FROM user WHERE id=$idOfItemToDelete";
    
        if (mysqli_query($connection, $sql)) {
            echo json_encode( "Record deleted successfully");
        } else {
            echo json_encode("Error deleting record: " . mysqli_error($connection));
        }

    }else if($typeOfRequest == "searchingUserRecord"){

        $searchWord = $_POST['searchWord'] ?? '';

        $sql = mysqli_query($connection, "SELECT * FROM user  WHERE id LIKE '%{$searchWord}%' OR nickname LIKE '%{$searchWord}%' OR email LIKE '%{$searchWord}%'");
        
        $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);
        
        exit(json_encode($result));

    }else if($typeOfRequest == "vinylEdition"){

        $album_id = $_POST['edit_id'] ?? '';
        $album_name = $_POST['edit_album'] ?? '';
        $album_release = $_POST['edit_release'] ?? '';
        $album_artist = $_POST['edit_artist'] ?? '';
        $album_stock = $_POST['edit_stock'] ?? '';
        $album_price = $_POST['edit_price'] ?? '';
        $album_genre = $_POST['edit_genre'] ?? '';
        $album_description = $_POST['edit_description'] ?? '';
        $album_cover = $_POST['edit_cover'] ?? '';

        $updateQuery = $connection ->query("UPDATE `vinyls` SET `artist` = '$album_artist', `album` = '$album_name', `cover` = '$album_cover', `release_date` = '$album_release', `genre` = '$album_genre', `description` = '$album_description', `price` = '$album_price', `stock` = '$album_stock' WHERE `vinyls`.`id` = '$album_id'");

        echo json_encode($album_artist);

    }else if($typeOfRequest == "deleteVinylRecord"){

        $idOfItemToDelete = $_POST['idOfItemToDelete'] ?? '';

        if (!$connection) {
            die("Connection failed: " . mysqli_connect_error());
        }
    
        // sql to delete a record
        $sql = "DELETE FROM vinyls WHERE id=$idOfItemToDelete";
    
        if (mysqli_query($connection, $sql)) {
            echo json_encode( "Record deleted successfully");
        } else {
            echo json_encode("Error deleting record: " . mysqli_error($connection));
        }

    }else if($typeOfRequest == "searchingVinylRecord"){

        $searchWord = $_POST['searchWord'] ?? '';

        $sql = mysqli_query($connection, "SELECT * FROM vinyls  WHERE album LIKE '%{$searchWord}%' OR artist LIKE '%{$searchWord}%' OR genre LIKE '%{$searchWord}%'");
        
        $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);
        
        exit(json_encode($result));

    }

?>