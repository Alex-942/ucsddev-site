<?php 

echo "<html>";
echo "<head>";
echo "<title>Hello PHP World</title>";
echo "</head>";
echo "<body>";

echo "<h1 align=center>Hello PHP World</h1>";
echo '<hr/>';

$data = file_get_contents('php://input');
echo '<b> Message Body: </b>', $data;
echo "</body>";
echo "</html>";
?>
