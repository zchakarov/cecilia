<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$errors = array();
if ($_SERVER['REQUEST_METHOD'] === "POST") {
    if (empty($_POST['email'])) {
        $errors[] = 'Email is empty';
    } else {
        $email = $_POST['email'];

        // validating the email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = 'Invalid email';
        }
    }
    if (empty($_POST['message'])) {
        $errors[] = 'Nachricht ist leer';
    } else {
        $message = $_POST['message'];
    }
    if (empty($_POST['thema'])) {
        $errors[] = 'Thema nicht eingegeben';
    } else {
        $thema = $_POST['thema'];
    }
    if (empty($_POST['termin'])) {
        $errors[] = 'Wünschtermin nicht eingegeben';
    } else {
        $termin = $_POST['termin'];
    }
    if (empty($_POST['name'])) {
        $errors[] = 'Name nicht eingegeben';
    } else {
        $name = $_POST['name'];
    }
    if (empty($errors)) {
        $date = date('j, F Y h:i A');

        $emailBody = "
    <html>
    <head>
    <title>Neue Nachricht von $name</title>
    </head>
    <body style=\"background-color:#fafafa;\">
    <div style=\"padding:20px;\">
    Datum: <div style=\"color:#888; border-bottom: deeppink dashed 1px;\">$date</div>
    <br>
    Email: <div style=\"color:#888\">$email</div>
    <br>
    Nachricht: <div style=\"color:#888\">$message</div>
    <br>
    Wünschtermin: <div style=\"color:#888\">$termin</div>    
    <br>
    Thema: <div style=\"color:#888\">$thema</div>
    </div>
    </body>
    </html>
    ";

        $headers = 	'From: Contact Form <contact@mydomain.com>' . "\r\n" .
            "Reply-To: $email" . "\r\n" .
            "MIME-Version: 1.0\r\n" .
            "Content-Type: text/html; charset=iso-8859-1\r\n";

        $to = 'zlatin.chakarov@gmail.com';
        $subject = "Neue Nachricht von $name";

        if (mail($to, $subject, $emailBody, $headers)) {
            $sent = true;
        }
    }
}
?>

<?php if (!empty($errors)) : ?>

    {
    "status": "fail",
    "error":  <?php echo json_encode($errors) ?>
    }
<?php endif; ?>


<?php if (isset($sent) && $sent === true) : ?>

    {
    "status": "success",
    "message": "Your data was successfully submitted"
    }
<?php endif; ?>
