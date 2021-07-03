#!/usr/bin/ruby

time1 = Time.new

require "cgi"
#cgi = CGI.new("html4")

cgi = CGI.new
print cgi.header

print "<title>Hello Ruby World HTML</title>";
print "<h1>Hello World! Written in Ruby</h1>\n"
print "<p>Current time is: " + time1.inspect + "</p>\n"
print "<p>IP Address: " + ENV['REMOTE_ADDR'] + "</p>\n"

#cgi.out {
#    cgi.html {
#        cgi.head { "\n"+cgi.title{"Hello World!"} } +
#        cgi.body { "\n"+
#            cgi.h1 { "Hello World! We are UCSDDevs" } + "\n" + 
#            cgi.p { "Current time is: " + time1.inspect } + "\n" +
#            cgi.p { "IP Address: " +  ENV['REMOTE_ADDR']} + "\n"
#      }
#   }
#}