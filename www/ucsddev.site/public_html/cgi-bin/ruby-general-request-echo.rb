#!/usr/bin/ruby

require "cgi"
cgi = CGI.new

print "Content-type: text/html", "\n\n"

print "<title>General Request Echo, Ruby</title>"
print "<h1 align=center>General Request Echo, Ruby</h1>\n"
print "<hr>\n"
print "<p><b>Request Method: </b>" + ENV['REQUEST_METHOD'] + "</p>\n"
print "<p><b>Protocol: </b>" + ENV['SERVER_PROTOCOL'] + "</p>\n"
print "<p><b>Query: </b>" + ENV['QUERY_STRING'] + "</p>\n"
print "<p><b>Message Body: </b>" + "</p>\n"
print cgi.params