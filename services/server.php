<?php

include_once 'connection.php';

    $typeOfRequest = $_POST['typeOfRequest'] ?? '';

    $userID = $_POST['userID'] ?? '';

    if ($typeOfRequest == "userDetails") {

        $sql = mysqli_query($connection, "SELECT * FROM user WHERE id='$userID'");
        
        $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);
        
        exit(json_encode($result));

    }else if($typeOfRequest == "displayAllVinyls"){

        $sql = mysqli_query($connection, "SELECT * FROM vinyls");
        
        $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);
        
        exit(json_encode($result));

    }else if($typeOfRequest == "displaySellingVinyls"){

        $sql = mysqli_query($connection, "SELECT * FROM vinyls WHERE owner_id='$userID'");
        
        $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);
        
        exit(json_encode($result));

    }else if($typeOfRequest == "displayPurchasedVinyls"){

        $sql = mysqli_query($connection, "SELECT * FROM orders WHERE buyer_id='$userID'");
        
        $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);
        
        exit(json_encode($result));

    }else if($typeOfRequest == "addNewVinyls"){

        $artist = $_POST['artist'] ?? '';
        $album = $_POST['album'] ?? '';
        $cover = $_POST['cover'] ?? '';
        $release_date = $_POST['release_date'] ?? '';
        $genre = $_POST['genre'] ?? '';
        $description = $_POST['description'] ?? '';
        $price = $_POST['price'] ?? '';
        $stock = $_POST['stock'] ?? '';

        $addingQuery = $connection ->query("INSERT INTO `vinyls` (`id`, `artist`, `album`, `cover`, `release_date`, `genre`, `description`, `price`, `stock`, `owner_id`) 
        VALUES (NULL, '$artist', '$album', '$cover', ' $release_date', '$genre', '$description', '$price', '$stock', '$userID')");

        echo json_encode('success');

    }else if($typeOfRequest == "itemPaid"){

        $item_id = $_POST['item_id'] ?? '';
        $item_cover = $_POST['item_cover'] ?? '';
        $item_name = $_POST['item_name'] ?? '';
        $item_qty = $_POST['item_qty'] ?? '';
        $item_price = $_POST['item_price'] ?? '';
        $total = $_POST['total'] ?? '';

        $addingQuery = $connection ->query("UPDATE `vinyls` SET `stock` = stock - '$item_qty' WHERE `vinyls`.`id` = '$item_id'");

        $addingQuery = $connection ->query("INSERT INTO `orders` (`id`, `buyer_id`, `transaction_date`, `item_id`, `item_cover`, `item_name`, `item_qty`, `item_price`, `total`) 
        VALUES (NULL, '$userID', current_timestamp(), '$item_id', '$item_cover', '$item_name', '$item_qty', '$item_price', '$total')");
        
        echo json_encode('payment successfully');

    }else if($typeOfRequest == "editVinylRecord"){

        $vinyl_id = $_POST['vinyl_id'] ?? '';
        $artist = $_POST['artist'] ?? '';
        $album = $_POST['album'] ?? '';
        $cover = $_POST['cover'] ?? '';
        $release_date = $_POST['release_date'] ?? '';
        $genre = $_POST['genre'] ?? '';
        $description = $_POST['description'] ?? '';
        $price = $_POST['price'] ?? '';
        $stock = $_POST['stock'] ?? '';

        $addingQuery = $connection ->query("UPDATE `vinyls` SET `artist` = '$artist', `album` = '$album', `cover` = '$cover', `release_date` = '$release_date', `genre` = '$genre', `description` = '$description', `price` = '$price', `stock` = '$stock' WHERE `vinyls`.`id` = '$vinyl_id'");
        
        echo json_encode('edition complete');

    }else if($typeOfRequest == "editUserRecord"){

        $userNickname = $_POST['userNickname'] ?? '';
        $userName = $_POST['userName'] ?? '';
        $userSurname = $_POST['userSurname'] ?? '';
        $userBirthdate = $_POST['userBirthdate'] ?? '';
        $userPhone = $_POST['userPhone'] ?? '';
        $userEmail = $_POST['userEmail'] ?? '';
        $userPassword = $_POST['userPassword'] ?? '';
        $userStreet = $_POST['userStreet'] ?? '';
        $userCity = $_POST['userCity'] ?? '';
        $userPostcode = $_POST['userPostcode'] ?? '';
        $userCountry = $_POST['userCountry'] ?? '';

        $addingQuery = $connection ->query("UPDATE `user` SET `nickname` = '$userNickname', `name` = '$userName', `surname` = '$userSurname', `birth` = '$userBirthdate', `phone` = '$userPhone', `email` = '$userEmail', `street` = '$userStreet', `city` = '$userCity', `postcode` = '$userPostcode', `country` = '$userCountry' WHERE `user`.`id` = '$userID'");
        
        echo json_encode('edition complete');

    }else if($typeOfRequest == "deleteItemRecord"){

        $itemId = $_POST['itemId'] ?? '';

        $addingQuery = $connection ->query("DELETE FROM `vinyls` WHERE `vinyls`.`id`='$itemId'");
        
        echo json_encode('deleting complete');

    }else if($typeOfRequest == "searchingFromRecords"){

        $searchWord = $_POST['searchWord'] ?? '';

        $sql = mysqli_query($connection, "SELECT * FROM vinyls  WHERE album LIKE '%{$searchWord}%' OR artist LIKE '%{$searchWord}%'");
        
        $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);
        
        exit(json_encode($result));

    }

?>