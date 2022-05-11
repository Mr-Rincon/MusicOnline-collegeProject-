<?php

    include 'connection.php';

    $typeOfRequest = $_POST['typeOfRequest'] ?? '';

	$email = $_POST['email'] ?? '';
	$password = $_POST['password'] ?? '';
    
    if ($typeOfRequest == "login") {

        $adminCheck = $connection ->query("SELECT * FROM admint WHERE email= '$email' ");

        $counter = mysqli_num_rows($adminCheck);
        
        if($counter == 1){

            $row = $adminCheck -> fetch_assoc();

            if($row['password'] != $password){
                    echo json_encode('error2');
                }else{
                    echo json_encode($row);
                }

        }else {

            $sel = $connection ->query("SELECT * FROM user WHERE email= '$email' ");
    
            $contador = mysqli_num_rows($sel);
    
            if($contador == 0)
            {
                echo json_encode('error1');
            }else {
    
                $fila = $sel -> fetch_assoc();
    
                if($fila['password'] != $password){
                        echo json_encode('error2');
                    }else{
                        echo json_encode($fila);
                    }
            }
        }


    
    } elseif ($typeOfRequest == "register") {
        $nickname = $_POST['name'] ?? '';
        $userType = "user";

        $emailQuery = $connection ->query("SELECT * FROM user WHERE email= '$email' ");

        $counter = mysqli_num_rows($emailQuery);

        if($counter == 1) {

            echo json_encode('error1');

        }else {

            $addingQuery = $connection ->query("INSERT INTO `user` (`id`, `type`, `nickname`, `name`, `surname`, `birth`, `phone`, `email`, `password`, `street`, `city`, `postcode`, `country`, `reg_date`)
            VALUES (NULL, '$userType', '$nickname', '$nickname', '', '2000-02-02', '', '$email', '$password', '', '', '', '', current_timestamp());");

            echo json_encode('success');

        }
    }
    



?>