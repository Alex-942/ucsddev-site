#!/usr/bin/python3
import cgi
import os
import time
import socket
import sys
import netifaces as ni
#POST={}
#args=sys.stdin.read().split('&')

#for arg in args: 
#        t=arg.split('=')
#        if len(t)>1: k, v=arg.split('='); POST[k]=v
print("Content-type:text/html\n\n")
print("<html><head><title>General Request Echo</title>")
print("</head><body><h1 align=center>General Request Echo</h1>")
print("<hr>")
print("Protocol: ",os.environ['SERVER_PROTOCOL'],"<br>")
print("Method: ", os.environ['REQUEST_METHOD'],"<br>")
print("Query String: ", os.environ['QUERY_STRING'], "<br>")
print("Message Body:")
#print(POST.get('user_name','default_value'))
print(sys.stdin.read())
#form = cgi.FieldStorage()
#keys = form.keys()
#keys.sort()
#print("number of keys", str(len(keys)))
#for key in keys:
#    print(key,fieldStorage[key].value)
#print(form.getvalue("uservalue"))
#print(form)
print("</body></html>")
