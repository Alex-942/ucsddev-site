#!/usr/bin/python3
import cgi
import time
import os
import requests
from http import cookies

# Load existing cookie
cookie_name = 'sid'
cookie_set = 'set'
string_cookie = os.environ.get('HTTP_COOKIE')
cookie = cookies.SimpleCookie()
cookie.load(string_cookie)

# Get session id from cookie if cookie is already there

if 'set=set' in string_cookie :
    cookies = string_cookie.split(';')
    sid_name = cookies[cookies.index(''.join(x for x in cookies if 'sid' in x))]
    name = sid_name[5:]
    
# Otherwise create new cookie from input 
else:
    name = 'username not set'
    form = cgi.FieldStorage()
    if 'username' in form.keys():
        name = form['username'].value

if name == '' :
    name = 'username not set'
print('Set-Cookie: set=set; path=/')
print('Set-Cookie: sid=%s; path=/'%(name))
    

    
# Output HTML with Set-Cookie info


    
print("Content-type:text/html\r\n\r\n")
'''if "HTTP_COOKIE" in os.environ.keys():
    cookies = os.environ['HTTP_COOKIE'].split(';')
    sid_name = cookies[cookies.index(''.join(x for x in cookies if 'sid' in x))]
    name = sid_name[5:]
    if name == '\'\'':
        name = 'username not set' '''
print("""
<html>
<head>
<title>Python Sessions</title>
</head>
<body>
<h1>Python Sessions Page 1</h1>
<p><b>Name:</b> %s<br/></p>

<a href="/cgi-bin/py-sessions-2.py">Session Page 2</a><br/>
<a href="/py-state-demo.html">Python CGI Form</a><br/>
<form style="margin-top:30px" action="/cgi-bin/py-destroy-session.py" method="get">
<button type="submit">Destroy Session</button>
</form>
</body>
</html>
""" % (name))

