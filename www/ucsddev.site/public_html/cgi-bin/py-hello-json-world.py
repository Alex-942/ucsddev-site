#!/usr/bin/python3
import cgi
import os
import time
import json
import socket
import netifaces as ni
print("Content-type:application/json\n\n")
print("{Message:We are ucsddev.site,time:",time.ctime(),",ip",os.environ['REMOTE_ADDR'],"}")
# "name": "ucsddev.site",
   #  "time": time.ctime(),
    #   "ip": os.environ['REMOTE_ADDR'])
#ni.ifaddresses('eth0')
#ip = ni.ifaddresses('eth0')[ni.AF_INET][0]['addr']
#ip = socket.gethostbyname(socket.getfqdn())
# print HTML file top
# print("<!DOCTYPE html>")
#ip=os.environ['REMOTE_ADDR']
#print("<html><head><title>Hello ucsddev.site</title>")
#print("</head><body><h1 align=center>Hello ucsddev.site</h1>")
#print("<hr>")
#print("Hello World we are team: UCSDDevs<br/>\n")
#print("This program was generated at: " + time.ctime())
#print("<br/>\nYour current IP address is: " + ip)
#print("</body></html>")
