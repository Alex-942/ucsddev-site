<?php 

echo "<html>";
echo "<head>";
echo "<title>GET Request Echo</title>";
echo "</head>";
echo "<body>";

echo "<h1 align=center>GET Request Echo</h1>";
echo '<hr/>';

$q = $_SERVER['QUERY_STRING'];
echo '<b> Query String: </b>', $q;
echo '<ul> <li>', substr($q,0,1), ' : ', substr($q,2), '</li> </ul>';

echo "</body>";
echo "</html>";
?>
