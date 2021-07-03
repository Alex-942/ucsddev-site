
<?php

$dir = getenv('APACHE_RUN_DIR');
$file = getenv('APACHE_PID_FILE');
$journal = getenv('JOURNAL_STREAM');
$path = getenv('PATH');
$id = getenv('INVOCATION_ID');
$lock = getenv('APACHE_LOCK_DIR');
$lang = getenv('LANG');
$usr = getenv('APACHE_RUN_USER');
$group = getenv('APACHE_RUN_GROUP');
$log = getenv('APACHE_LOG_DIR');
$pwd = getenv('PWD');

echo '<html>';
echo '<head>';
echo '     <title>Environment Variables</title>
        <style>
            h2:not(:first-of-type) {
                margin-top: 30px;
            }

            li:not(:first-of-type) {
                margin-top: 8px;
            }
        </style>
    </head>
    <body>
        <h1 align=center>Environment Variables</h1>
        <hr/>
        <h2>Environment Variables:</h2>
        <ul>
            <li>
                <b>APACHE_RUN_DIR:</b> '
                , $dir ,'
            </li>
            <li>
                <b>APACHE_PID_FILE:</b> '
                , $file , '
            </li>
            <li>
                <b>JOURNAL_STREAM:</b> '
                , $journal, '
            </li>
            <li>
                <b>PATH:</b> '
                , $path , '
            </li>
            <li>
                <b>INVOCATION_ID:</b> '
                , $id , '
            </li>
            <li>
                <b>APACHE_LOCK_DIR:</b> '
                , $lock , '
            </li>
            <li>
                <b>LANG:</b> '
                , $lang , ' 
            </li>
            <li>
                <b>APACHE_RUN_USER:</b> '
                , $usr , '
            </li>
            <li>
                <b>APACHE_RUN_GROUP:</b> '
                , $group , '
            </li>
            <li>
                <b>APACHE_LOG_DIR:</b> '
                , $log , '
            </li>
            <li>
                <b>PWD:</b> '
                , $pwd , '
            </li>
        </ul>
        <h2>Server Variables</h2>
        <ul>
            <li>
                <b>UNIQUE_ID:</b> '
                , $_SERVER['UNIQUE_ID'] , '
            </li>
            <li>
                <b>SCRIPT_URL:</b> '
                , $_SERVER['SCRIPT_URL'] , '
            </li>
            <li>
                <b>SCRIPT_URI:</b> '
                , $_SERVER['SCRIPT_URI'] , '
            </li>
            <li>
                <b>HTTPS:</b> '
                , $_SERVER['HTTPS'] , '
            </li>
            <li>
                <b>SSL_TLS_SNI:</b> '
                , $_SERVER['SSL_TLS_SNI'] , '
            </li>
            <li>
                <b>HTTP_HOST:</b> '
                , $_SERVER['HTTP_HOST'] , '
            </li>
            <li>
                <b>HTTP_CONNECTION:</b> '
                , $_SERVER['HTTP_CONNECTION'] , '
            </li>
            <li>
                <b>HTTP_UPGRADE_INSECURE_REQUESTS:</b> '
                , $_SERVER['HTTP_UPGRADE_INSECURE_REQUESTS'] , '
            </li>
            <li>
                <b>HTTP_USER_AGENT:</b> '
                , $_SERVER['HTTP_USER_AGENT'] , '
            </li>
            <li>
                <b>HTTP_ACCEPT:</b> '
                , $_SERVER['HTTP_ACCEPT'] , '
            </li>
            <li>
                <b>HTTP_SEC_FETCH_SITE:</b> '
                , $_SERVER['HTTP_SEC_FETCH_SITE'] , '
            </li>
            <li>
                <b>HTTP_SEC_FETCH_MODE:</b> '
                , $_SERVER['HTTP_SEC_FETCH_MODE'] , '
            </li>
            <li>
                <b>HTTP_SEC_FETCH_USER:</b> '
                , $_SERVER['HTTP_SEC_FETCH_USER'] , '
            </li>
            <li>
                <b>HTTP_SEC_FETCH_DEST:</b> '
                , $_SERVER['HTTP_SEC_FETCH_DEST'] , '
            </li>
            <li>
                <b>HTTP_ACCEPT_ENCODING:</b> '
                , $_SERVER['HTTP_ACCEPT_ENCODING'] , '
            </li>
            <li>
                <b>HTTP_ACCEPT_LANGUAGE:</b> '
                , $_SERVER['HTTP_ACCEPT_LANGUAGE'] , '
            </li>
            <li>
                <b>PATH:</b> '
                , $_SERVER['PATH'] , '
            </li>
            <li>
                <b>SERVER_SIGNATURE:</b> 
                <address> ', $_SERVER['SERVER_SIGNATURE'] , '</address>
            </li>
            <li>
                <b>SERVER_SOFTWARE:</b> '
                , $_SERVER['SERVER_SOFTWARE'] , '
            </li>
            <li>
                <b>SERVER_NAME:</b> '
                , $_SERVER['SERVER_NAME'] , '
            </li>
            <li>
                <b>SERVER_ADDR:</b> '
                , $_SERVER['SERVER_ADDR'] , '
            </li>
            <li>
                <b>SERVER_PORT:</b> '
                , $_SERVER['SERVER_PORT:'] , '
            </li>
            <li>
                <b>REMOTE_ADDR:</b> '
                , $_SERVER['REMOTE_ADDR'] , '
            </li>
            <li>
                <b>DOCUMENT_ROOT:</b> '
                , $_SERVER['DOCUMENT_ROOT'] , '
            </li>
            <li>
                <b>REQUEST_SCHEME:</b> '
                , $_SERVER['REQUEST_SCHEME'] , '
            </li>
            <li>
                <b>CONTEXT_PREFIX:</b> '
                , $_SERVER['CONTEXT_PREFIX'] , '
            </li>
            <li>
                <b>CONTEXT_DOCUMENT_ROOT:</b> '
                , $_SERVER['CONTEXT_DOCUMENT_ROOT'] , '
            </li>
            <li>
                <b>SERVER_ADMIN:</b> '
                , $_SERVER['SERVER_ADMIN'] , '
            </li>
            <li>
                <b>SCRIPT_FILENAME:</b> '
                , $_SERVER['SCRIPT_FILENAME'] , '
            </li>
            <li>
                <b>REMOTE_PORT:</b> '
                , $_SERVER['REMOTE_PORT'] , '
            </li>
            <li>
                <b>GATEWAY_INTERFACE:</b> '
                , $_SERVER['GATEWAY_INTERFACE'] , '
            </li>
            <li>
                <b>SERVER_PROTOCOL:</b> '
                , $_SERVER['SERVER_PROTOCOL'] , '
            </li>
            <li>
                <b>REQUEST_METHOD:</b> '
                , $_SERVER['REQUEST_METHOD'] , '
            </li>
            <li>
                <b>QUERY_STRING:</b> '
                , $_SERVER['QUERY_STRING'] , '
            </li>
            <li>
                <b>REQUEST_URI:</b> '
                , $_SERVER['REQUEST_URI'] , '
            </li>
            <li>
                <b>SCRIPT_NAME:</b> '
                , $_SERVER['SCRIPT_NAME'] , '
            </li>
            <li>
                <b>PHP_SELF:</b> '
                , $_SERVER['PHP_SELF'] , '
            </li>
            <li>
                <b>REQUEST_TIME_FLOAT:</b> '
                , $_SERVER['REQUEST_TIME_FLOAT'] , '
            </li>
            <li>
                <b>REQUEST_TIME:</b> '
                , $_SERVER['REQUEST_TIME'] , '
            </li>
        </ul>
    </body>
</html> '
?>
