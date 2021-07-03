#!/usr/bin/ruby

require "cgi"
cgi = CGI.new

print "Content-type: text/html", "\n\n"

print "<title>Ruby, Get Query String</title>"
print "<h1 align=center>Ruby, Get Query String</h1>\n"
print "<hr>\n"
print "<p><b>Query String: </b>" + ENV['QUERY_STRING'] + "</p>\n"
