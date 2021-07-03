<?php
   session_start();
   session_destroy();
   echo"<html>";
echo"<head>";
echo"<title>PHP Session Destroyed</title>";
echo"</head>";
echo"<body>";
echo"<h1>Session Destroyed</h1>";
echo"<a href=\"/php-state-demo.html\">Back to the PHP CGI Form</a><br />";
echo"<a href=\"/cgi-bin/php-sessions-1.php\">Back to Page 1</a><br />";
echo"<a href=\"/cgi-bin/php-sessions-2.php\">Back to Page 2</a>";
echo"</body>";
echo"</html>";
?>
