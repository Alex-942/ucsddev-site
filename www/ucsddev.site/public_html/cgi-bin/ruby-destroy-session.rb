#!/usr/bin/ruby
require "cgi"
require 'cgi/session'
require 'cgi/session/pstore'

cgi = CGI.new("html4")
sess = CGI::Session.new(cgi,
    'database_manager' => CGI::Session::PStore,  # use PStore
    'session_key' => 'CSE135',  # custom session key
    'prefix' => 'pstore_sid_') 
sess.delete
sess.close
print "Content-type: text/html", "\n\n"
print "<html>"
print "<head>"
print "<title>PHP Session Destroyed</title>"
print "</head>"
print "<body>"
print "<h1>Session Destroyed</h1>"
print "<a href=\"/ruby-state-demo.html\">Back to the Ruby CGI Form</a><br />"
print "<a href=\"/cgi-bin/ruby-sessions-1.rb\">Back to Page 1</a><br />"
print "<a href=\"/cgi-bin/ruby-sessions-2.rb\">Back to Page 2</a>"
print "</body>"
print "</html>"