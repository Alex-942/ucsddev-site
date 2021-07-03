#!/usr/bin/python3
import cgi
from http import cookies
import os
import datetime
print('Set-Cookie: set=; path=/') 
print("Set-Cookie: sid=; path=/")
print("Content-type: text/html\r\n\r\n")
'''cookie_name = 'sid'
string_cookie = os.environ.get('HTTP_COOKIE')
cookie = cookies.SimpleCookie()
cookie.load(string_cookie)
cookie[cookie_name]['expires'] = 0 '''
#s = requests.Session()
#s.delete()

print("<html>")
print("<head>")

print("<title>Python Session Destroyed</title>")
print("</head>")
print("<body>")
print("<h1>Session Destroyed</h1>")
print("<a href=\"/py-state-demo.html\">Back to the Python CGI Form</a><br />")
print("<a href=\"/cgi-bin/py-sessions-1.py\">Back to Page 1</a><br />")
print("<a href=\"/cgi-bin/py-sessions-2.py\">Back to Page 2</a>")
print("</body>")
print("</html>")                 
