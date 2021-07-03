<?php 

echo "<html>";
echo "<head>";
echo "<title>GET Request Echo</title>";
echo "</head>";
echo "<body>";

echo "<h1 align=center>GET Request Echo</h1>";
echo '<hr/>';

$method = $_SERVER['REQUEST_METHOD'];
echo '<b> Request Method: </b>', $method;
echo '<br>';
$pro = $_SERVER['SERVER_PROTOCOL'];
echo '<b> Protocol: </b>', $pro;
echo '<br>';
$q = $_SERVER['QUERY_STRING'];
echo '<b> Query String: </b>', $q;

echo '<ul> <li>', substr($q,0,1), ' : ', substr($q,2), '</li> </ul>';

$data = file_get_contents('php://input');
echo '<b> Message Body: </b>', $data;

echo "</body>";
echo "</html>";
?>