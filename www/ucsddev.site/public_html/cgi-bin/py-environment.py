#!/usr/bin/python3
import cgi
import os

print("Content-type:text/html\n\n")

# print HTML file top
# print("<!DOCTYPE html>")
print("<html><head><title>Environment Variables</title>")
print("</head><body><h1 align=center>Environment Variables</h1>")
print("<hr>")
#for k, v in os.environ.items():
#        print(f'{k}={v}')
print(os.environ)
print("</body></html>")
