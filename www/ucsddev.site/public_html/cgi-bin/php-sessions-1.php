<?php
session_start();

echo "<html>";
echo "<head>";
echo "<title>PHP Sessions</title>";
echo "</head>";
echo "<body>";

echo "<h1 align=center>PHP Sessions Page 1</h1>";
echo '<hr/>';


$post_data = file_get_contents('php://input');
$name = substr($post_data, 9);
    


if (($_SESSION["cookie"] != 'set')){
    $_SESSION["username"] = $name;
    $_SESSION["cookie"] = 'set';
}

   
if (($_SESSION['username'])!= '') {
    echo "<p><b>Name:</b>" , $_SESSION['username'];
}
	
else{
	echo "<p><b>Name:</b> You do not have a name set</p>";
}
echo "<br/><br/>";
echo "<a href=\"/cgi-bin/php-sessions-2.php\">Session Page 2</a><br/>";
echo "<a href=\"/php-state-demo.html\">PHP CGI Form</a><br />";
echo "<form style=\"margin-top:30px\" action=\"/cgi-bin/php-destroy-session.php\" method=\"get\">";
echo "<button type=\"submit\">Destroy Session</button>";
echo "</form>";

echo "</body>";
echo "</html>";
?>
