#!/usr/bin/python3
import cgi
import os
import time
import socket
import netifaces as ni
print("Content-type:text/html\n\n")
print("<html><head><title>Get Query String</title>")
print("</head><body><h1 align=center>Get Query String</h1>")
print("<hr>")
print("Query String: ")
print(os.environ['QUERY_STRING'])
print("</body></html>")
