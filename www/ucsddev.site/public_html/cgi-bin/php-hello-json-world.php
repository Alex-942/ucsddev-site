<?php
    
    
    $date = date('Y-m-d');
   
    $address = getenv("REMOTE_ADDR"); 
    # IP Address is an environment variable when using CGI
    echo "{\"message\":\"Hello World from PHP! We are UCSDDevs.\",\"date\":\"Today's date is ", $date, "\",\"ipAddress\":\"" , $address , "\"}"
    
?>
