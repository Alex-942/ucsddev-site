#!/usr/bin/ruby

require "cgi"
cgi = CGI.new

print "Content-type: text/html", "\n\n"

print "<title>Ruby, POST Request Echo</title>"
print "<h1 align=center>Ruby, POST Request Echo</h1>\n"
print "<hr>\n"
print "<p><b>Message Body: </b>" + "</p>\n"
print  cgi.params 
#request.query_string.split(/&/).inject({}) do |hash, setting|
#    key, val = setting.split(/=/)
#    hash[key.to_sym] = val
#    hash
#  end