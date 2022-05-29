import os
import hashlib
import json
import urllib

import flask
from flask import Flask, request, url_for, jsonify
import requests
#from react  import 'react'
#from react.render import render_component
from werkzeug.utils import redirect
from sqlalchemy import create_engine, text
import pyodbc
from dal.model_users import Users
from base64 import b64encode
import base64
import string
import random



def hashingPasswordWithSalting(username,password):
    recordUser = None
    try: 
        if len(username)!=0:
            recordUser = Users.has_item_by_multipple_columns(["Username"],[username])
    except Exception as e:
        print(e)
    if recordUser!=None:
            if recordUser[0] == False:
                salt = os.urandom(32) #Random 32-bytes long salt used in hashing
                plaintext = password.encode()
                digest_password = hashlib.pbkdf2_hmac('sha256', plaintext, salt, 10000)
                hex_hashed_password = digest_password.hex()
                return b64encode(salt).decode('utf-8'), hex_hashed_password
            else:
                return False,False    
    else: 
        return False, False

def checkingPasswordWithDatabase(username, password): 
    recordUser = None
    recordPhone = None
    if len(username)==0: 
        return "This account is not in the database"
    else:
        if len(username)!=0:
            recordUser = Users.has_item_by_multipple_columns(["Username"],[username]) 
    if recordUser!= None and recordUser[0]: 
        record = recordUser[1][0]
        salt = record[2]
        salt_bytes=salt.encode('utf-8')
        salt = base64.b64decode(salt_bytes)
        plaintext = password.encode()
        digest_password = hashlib.pbkdf2_hmac('sha256', plaintext, salt, 10000)
        hex_hashed_password = digest_password.hex()
        hex_hashed_password_from_database = record[3]
    else:
        return "This account is not in the database"
    if hex_hashed_password == hex_hashed_password_from_database: 
        if recordUser!=None and recordUser[0]:
            response = dict()
            response["Login"] = True
            response["Id"]=recordUser[1][0][0]
            response["Username"]=recordUser[1][0][1]
            return response
        else:
            return "Login unsuccessful"
    else:
        return "Login unsuccessful"
