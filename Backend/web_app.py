from ast import For
import json
import urllib
from xml.etree.ElementTree import tostring
import datetime
import flask
from flask import Flask, request, url_for, jsonify
import requests
# from react  import 'react'
# from react.render import render_component
from werkzeug.utils import redirect
from sqlalchemy import create_engine, text
import pyodbc
import pandas as pd
from dal import hashingPassword
import codecs
from dal.model_users import Users
app = Flask("comp306")

## response = requests.get('https://httpbin.org/ip')
## print('Your IP is {0}'.format(response.json()['origin']))

# Trusted Connection to Named Instance
"""connection = pyodbc.connect(
    'DRIVER={ODBC Driver 17 for SQL Server}; SERVER=localhost\SQLEXPRESS;DATABASE=Comp306;Trusted_Connection=yes;')
conn = connection.cursor()"""


@app.route("/")
def start():
    return "Welcome to our COMP-306 project web page"

@app.route("/deneme-sayfasi")
def deneme():
    return "Deneme sayfası"


@app.route("/signup",  methods=['POST', 'GET'])
def signup(): 
    try:
        result_code = False
        form = json.loads(request.data)
        accountInfo = form['data']
        personInfo = accountInfo[0]
        username = personInfo['username']
        print(username)
        if len(username)==0:
            return "Please Enter Your Username"
       
        password = personInfo['password']
        if len(password)==0: 
            return "Specify a password"
        if len(password)<8: 
            return "Your password's length should be at least 8 characters."    
        salt, hashedPassword = hashingPassword.hashingPasswordWithSalting(username,password) 
        if salt!=False and hashedPassword!=False:
            result_code=Users.add_item([username,salt,hashedPassword]) 
            if result_code:
                return 'User added Successfully'
            else:
                return 'Bad Request'
        else:
            return 'User is already in the db'
    except Exception as e:
        print(e)
        return "Bad Request"

@app.route("/login",  methods=['POST']) 
def login():
    form = json.loads(request.data)
    accountInfo = form['data']
    personInfo = accountInfo[0]
    username = personInfo['username']
    if len(username)==0: 
        return "Enter your username!"
    password = personInfo['password']
    if len(password)==0: 
        return "Enter your password"
    return hashingPassword.checkingPasswordWithDatabase(username,password) 
app.run()