#!/usr/bin/ruby

time1 = Time.new

require "cgi"
require "json"

output = {
    "message" => "Hello World! We are UCSDDevs. This was written in Ruby",
    "time" => time1.inspect,
    "IPAddress" => ENV['REMOTE_ADDR']
}


cgi = CGI.new
#print cgi.header
print "Content-type: application/json", "\n\n";

print JSON[output]