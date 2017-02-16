<?php

if(isset($_GET['email'])) {



    // ADD YOUR EMAIL WHERE YOU WANT TO RECIEVE THE MESSAGES
    $email_to = "info@redinnovacionpolitica.org";
    $email_subject = "Mensaje de Contacto - Red de Innovación Política";





    function died($error) {

        // your error code can go here

        echo '<div class="alert alert-danger alert-dismissible wow fadeInUp" role="alert">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <strong>Something is wrong:</strong><br>';

        echo $error."<br />";

        echo '</div>';

        die();

    }



    // validation expected data exists

    if(!isset($_GET['name']) ||

        !isset($_GET['email']) ||

        // !isset($_GET['phone']) || // un-commet for required

        !isset($_GET['message'])) {

        died('We are sorry, but there appears to be a problem with the form you submitted.');

    }



    $name = $_GET['name']; // required

    $email_from = $_GET['email']; // required

    $telephone = $_GET['phone']; // not required

    $message = $_GET['message']; // required



    $error_message = "";

    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

  if(!preg_match($email_exp,$email_from)) {

    $error_message .= 'The Email Address you entered does not appear to be valid.<br />';

  }

    $string_exp = "/^[A-Za-z .'-]+$/";

  if(!preg_match($string_exp,$name)) {

    $error_message .= 'The First Name you entered does not appear to be valid.<br />';

  }

  if(strlen($message) < 2) {

    $error_message .= 'The message you entered do not appear to be valid.<br />';

  }

  if(strlen($error_message) > 0) {

    died($error_message);

  }

    $email_message = "Form details below.\n\n";



    function clean_string($string) {

      $bad = array("content-type","bcc:","to:","cc:","href");

      return str_replace($bad,"",$string);

    }



    $email_message .= "Nombre: ".clean_string($name)."\n";

    $email_message .= "Email: ".clean_string($email_from)."\n";

    $email_message .= "Mensaje: ".clean_string($message)."\n";





// create email headers

$headers = 'From: '.$name+"("+$email_from+")"."\r\n".

'Reply-To: '.$email_from."\r\n" .

'X-Mailer: PHP/' . phpversion();

@mail($email_to, $email_subject, $email_message, $headers);
 ?>

 <div class="alert alert-success alert-dismissible wow fadeInUp" role="alert">
   <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
   Your message has been sent.
 </div>

 <?php } ?>
