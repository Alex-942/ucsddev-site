#!/usr/bin/python3
import cgi
import os
import time
import socket
import sys
import netifaces as ni
print("Content-type:text/html\n\n")
print("<html><head><title>Get Post Message Body</title>")
print("</head><body><h1 align=center>Get Post Message Body</h1>")
print("<hr>")
print("Post Message Body: ")
print(sys.stdin.read())
print("</body></html>")
