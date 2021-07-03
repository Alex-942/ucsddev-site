#!/usr/bin/ruby

require "cgi"

cgi = CGI.new
print "Content-type: text/html", "\n\n"

raw= cgi.raw_cookie
gate = cgi.gateway_interface
usr = cgi.remote_user


print "<html>"
print "<head>"
print "<title>Ruby, Environment Variables</title>"
print "</head>"
print "<body>"
print "<h1 align=center>Ruby, Environment Variables!</h1>"

print "<hr>"
print "<p><b>AUTH_TYPE: </b>" + ENV['AUTH_TYPE']+ "</p>"
print "<p><b>UNIQUE_ID: </b>" + ENV['UNIQUE_ID']+ "</p>"
print "<p><b>HTTP_CONNECTION: </b>" + ENV['HTTP_CONNECTION'] + "</p>\n"
print "<p><b>CONTEXT_DOCUMENT_ROOT:</b>" + ENV['CONTEXT_DOCUMENT_ROOT'] + "</p>\n"
print "<p><b>CONTEXT_PREFIX: </b>" + ENV['CONTEXT_PREFIX'] + "</p>\n"
print "<p><b>GATEWAY_INTERFACE: </b>" + gate+ "</p>\n"
print "<p><b>HTTPS: </b>" + ENV['HTTPS'] + "</p>\n"
print "<p><b>HTTP_ACCEPT: </b>" + ENV['HTTP_ACCEPT'] + "</p>\n"
print "<p><b>HTTP_ACCEPT_ENCODING: </b>" + ENV['HTTP_ACCEPT_ENCODING'] + "</p>\n"
print "<p><b>HTTP_ACCEPT_LANGUAGE: </b>" + ENV['HTTP_ACCEPT_LANGUAGE'] + "</p>\n"
print "<p><b>HTTP_HOST: </b>" +ENV['HTTP_HOST'] +"</p>"
print "<p><b>HTTP_SEC_CH_UA : </b>" + ENV['HTTP_SEC_CH_UA'] + "</p>"
print "<p><b>HTTP_SEC_CH_UA_MOBILE: </b>" + ENV['HTTP_SEC_CH_UA_MOBILE'] + "</p>\n"
print "<p><b>HTTP_SEC_FETCH_DEST: </b>" + ENV['HTTP_SEC_FETCH_DEST'] + "</p>\n"
print "<p><b>HTTP_SEC_FETCH_MODE: </b>" + ENV['HTTP_SEC_FETCH_MODE'] + "</p>\n"
print "<p><b>HTTP_SEC_FETCH_SITE: </b>" + ENV['HTTP_SEC_FETCH_SITE'] + "</p>\n"
print "<p><b>HTTP_SEC_FETCH_USER: </b>" + ENV['HTTP_SEC_FETCH_USER'] + "</p>\n"
print "<p><b>HTTP_UPGRADE_INSECURE_REQUESTS : </b>" + ENV['HTTP_UPGRADE_INSECURE_REQUESTS'] + "</p>\n"
print "<p><b>HTTP_USER_AGENT: </b>" + ENV['HTTP_USER_AGENT'] + "</p>\n"
print "<p><b>PATH: </b>" + ENV['PATH'] + "</p>\n"
print "<p><b>QUERY_STRING: </b>" + ENV['QUERY_STRING'] + "</p>\n"
print "<p><b>REMOTE_ADDDRESS: </b>" + ENV['REMOTE_ADDR'] + "</p>\n"
print "<p><b>REMOTE_PORT: </b>" + ENV['REMOTE_PORT'] + "</p>\n"
print "<p><b>REQUEST_METHOD: </b>" + ENV['REQUEST_METHOD'] + "</p>\n"
print "<p><b>REQUEST_SCHEME: </b>" + ENV['REQUEST_SCHEME'] + "</p>\n"
print "<p><b>REQUEST_URI: </b>" + ENV['REQUEST_URI'] + "</p>\n"
print "<p><b>SCRIPT_FILENAME: </b>" + ENV['SCRIPT_FILENAME'] + "</p>\n"
print "<p><b>SCRIPT_NAME: </b>" + ENV['SCRIPT_NAME'] + "</p>\n"
print "<p><b>SERVER_ADDR: </b>" + ENV['SERVER_ADDR'] + "</p>\n"
print "<p><b>SERVER_ADMIN: </b>" + ENV['SERVER_ADMIN'] + "</p>\n"
print "<p><b>SERVER_NAME: </b>" + ENV['SERVER_NAME'] + "</p>\n"
print "<p><b>SERVER_PORT: </b>" + ENV['SERVER_PORT'] + "</p>\n"
print "<p><b>SERVER_PROTOCOL: </b>" + ENV['SERVER_PROTOCOL'] + "</p>\n"
print "<p><b>SERVER_SIGNATURE: </b>" + ENV['SERVER_SIGNATURE'] + "</p>\n"
print "<p><b>SERVER_SOFTWARE: </b>" + ENV['SERVER_SOFTWARE'] + "</p>\n"
print "<p><b>SSL_TLS_SNI: </b>" + ENV['SSL_TLS_SNI'] + "</p>\n"
print "<p><b>REMOTE_USER: </b>" + usr+ "</p>\n"
print "<p><b>RAW_COOKIE: </b>" + raw+ "</p>\n"


print "</body>"
print "</html>"

                 
