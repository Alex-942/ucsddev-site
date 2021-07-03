

<?php
    echo "<html>";
    echo "<head>";
    echo "<title>Hello PHP World</title>";
    echo "</head>";
    echo "<body>";
    
    echo "<h1 align=center>Hello PHP World</h1>";
    echo '<hr/>';
    echo "<p>This page was generated with the PHP programming langauge</p>";
    
    $date = date('D, d M Y H:i:s');
    echo "<p>Current Date and Time: " , $date , "</p>";
    
    $address = getenv("REMOTE_ADDR"); 
    # IP Address is an environment variable when using CGI
    echo '<p>Your IP Address: ', $address , '</p>';
    
    echo "</body>";
    echo "</html>";
?>