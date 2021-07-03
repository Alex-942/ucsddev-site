#!/usr/bin/ruby

require "cgi"
cgi = CGI.new

print "Content-type: text/html", "\n\n"

print "<title>Ruby Session Test Ruby</title>"
print "<h1 align=center>Ruby Session Test</h1>\n"
print "<hr>\n"
print "<p>CGI using Ruby</p>\n"
print "<form action=/cgi-bin/ruby-sessions-1.rb method=Post id=form>\n"
print "<label>What is your name? <input type=text name=username autocomplete=off></label>\n"
print "<br>\n"
print "<input type=submit value=" + "Test_Sessioning" + ">\n"
print "</form>\n"

cookies[:user_name] = "Horst Meier" 