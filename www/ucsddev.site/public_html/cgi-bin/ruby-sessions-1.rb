#!/usr/bin/ruby

require "cgi"
require 'cgi/session'
require 'cgi/session/pstore'

cgi = CGI.new("html4")
sess = CGI::Session.new(cgi,
    'database_manager' => CGI::Session::PStore,  # use PStore
    'session_key' => 'CSE135',              # custom session key
    'prefix' => 'pstore_sid_')                   # PStore option

cgi.out() {""}


print "</html>"
print "<title>Ruby Sessions</title>"
print "<h1 align=center>Ruby Session Page 1</h1>\n"
print "<hr>\n"
name = sess['name'].to_s
if cgi.has_key?('username') and cgi['username'] != ''
    # coerce to String: cgi[] returns the
    # string-like CGI::QueryExtension::Value
    sess['name'] = cgi['username']
elsif !sess['name']
    sess['name'] = "You do not have a name set"
end
print "<p><b>Name: </b>" + sess['name'] + "</p>\n"
print "<a href=\"/cgi-bin/ruby-sessions-2.rb\">Session Page 2</a><br/>";
print "<a href=\"/ruby-state-demo.html\">Ruby CGI Form</a><br />";
print "<form style=\"margin-top:30px\" action=\"/cgi-bin/ruby-destroy-session.rb\" method=\"get\">";
print "<button type=\"submit\">Destroy Session</button>";
print "</form>";
print "</body>"
print "</html>"
