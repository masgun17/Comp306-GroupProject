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

app.run()