#!/usr/bin/python3
import cgi, cgitb
import time
import os
from http import cookies

# Load existing cookie



#cookie.load(string_cookie)

# Get session id from cookie if cookie is already there
'''if cookie_name in cookie:
    name = cookie[cookie_name].value
else:
    name = "Sorry, we don't hava your name here"'''
# Output HTML with Set-Cookie info
#print(cookie[cookie_name])
print("Content-type:text/html\n\n")

if "HTTP_COOKIE" in os.environ.keys():
    cookies = os.environ['HTTP_COOKIE'].split(';')
    
    sid_name = cookies[cookies.index(''.join(x for x in cookies if 'sid' in x))]
    name = sid_name[5:]
    if name == '':
        name = 'username not set'
print("""
<html>
<head>
<title>Python Sessions</title>
</head>
<body>
<h1>Python Sessions Page 2</h1>
<p><b>Name:</b> %s<br/></p>
<a href="/cgi-bin/py-sessions-1.py">Session Page 1</a><br/>
<a href="/py-state-demo.html">Python CGI Form</a><br/>
<form style="margin-top:30px" action="/cgi-bin/py-destroy-session.py" method="get">
<button type="submit">Destroy Session</button>
</form>
</body>
</html>
""" % (name)) 

