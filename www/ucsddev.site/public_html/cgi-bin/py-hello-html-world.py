#!/usr/bin/python3
import cgi
import os
import time
import socket
import sys
import netifaces as ni
print("Content-type:text/html\n\n")
print("<html><head><title>Hello Python</title>")
print("</head><body><h1 align=center>ucsddev.site is here. Hello, Python</h1>")
print("<hr>")
print("Hello, we are ucsddev.site")
print("<br>")
print("Current Time: ",time.ctime())
print("<br>")
print("Your IP Address :",os.environ['REMOTE_ADDR'])
print("</body></html>")
