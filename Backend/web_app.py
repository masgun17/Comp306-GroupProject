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
from dal.model_shows import Shows
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

@app.route("/getCountryOptions",   methods=['POST', 'GET']) 
def getCountryOptions():
    result_code, countries = Shows.getCountries()
    print(countries)
    data = []
    if result_code:
        for country in countries:
            line = dict()    
            line["value"] = country[0]
            line["label"] = country[0]
            data.append(line)
    print(data)
    return json.dumps(data)

@app.route("/getGenreOptions",   methods=['POST', 'GET']) 
def getGenreOptions():
    result_code, genres = Shows.getGenres()
    print(genres)
    data = []
    if result_code:
        for genre in genres:
            line = dict()    
            line["value"] = genre[0]
            line["label"] = genre[0]
            data.append(line)
    print(data)
    return json.dumps(data)

@app.route("/searchFilm", methods=['POST', 'GET'])
def searchFilm():
    conn = connection.cursor()
    items = []
    result_code = False
    data = []

    form = json.loads(request.data)
    title = form['title'] # string
    year_small = form['year_small'] # integer
    year_big = form['year_big'] # integer
    platform_netflix = form['platform_netflix'] # bool
    platform_amazon = form['platform_amazon'] # bool
    genres = form['genres'] # string array
    type = form['type'] # string 0: TV Show or 1: Movie
    duration_small = form['duration_small'] # int
    duration_big = form['duration_big'] # int
    countries = form['countries'] # string array
    directors = form['directors'] # string array
    actors = form['actors'] # string

    query = "select s_out.*, STRING_AGG(pc.Name, ', ') as cast_names, STRING_AGG( pd.Name, ', ') as directors_names from ( select * from Shows as s where "

    try:
        if title is not None and len(title) > 0:
            input_title = title
        else:
            input_title = ''
        query_addition = f"('{input_title}' = '' or s.Title like '%{input_title}%') "
        query = query + query_addition

        if year_small is not None:
            input_year_small = year_small
        else:
            input_year_small = 0
        query_addition = f" and (({input_year_small} = 0 or s.Release_Year >= {input_year_small}) "
        query = query + query_addition

        if year_big is not None:
            input_year_big = year_big
        else:
            input_year_big = 2023
        query_addition = f" and ({input_year_big} = 2023 or s.Release_Year <= {input_year_big}))  "
        query = query + query_addition

        input_platform = ''
        if platform_netflix:
            if platform_amazon:
                input_platform = "'Netflix', 'Amazon'"
            else:
                input_platform = "'Netflix'"
        else:
            if platform_amazon:
                input_platform = "'Amazon'"
            else:
                input_platform = ""

        if input_platform != "":
            query_addition = f" and (s.Platform in ({input_platform})  ) "
            query = query + query_addition

        if genres is not None and len(genres)>0:
            for genre in genres:
                if genre is not None and len(genre) > 0:
                    input_genre = genre
                    query_addition = f" and s.Listed_In like '%{input_genre}%' "
                    query = query + query_addition

        if type is not None and len(type)>0:
            if type == "0":
                input_type = "TV Show"
            elif type == "1":
                input_type = "Movie"

            query_addition = f" and s.Type ='{input_type}' "
            query = query + query_addition

        if duration_small is not None:
            input_duration_small = duration_small
        else:
            input_duration_small = 0
        query_addition = f" and (({input_duration_small} = 0 or cast((SELECT top(1) value FROM STRING_SPLIT(s.Duration, ' ')) as int) >= {input_duration_small}) "
        query = query + query_addition

        if duration_big is not None:
            input_duration_big = duration_big
        else:
            input_duration_big = 2023
        query_addition = f" and ({input_duration_big} = 2023 or cast((SELECT top(1) value FROM STRING_SPLIT(s.Duration, ' ')) as int) <= {input_duration_big})) "
        query = query + query_addition


        if countries is not None and len(countries)>0:
            for country in countries:
                if country is not None and len(country) > 0:
                    input_country = country
                    query_addition = f" and s.Country like '%{input_country}%' "
                    query = query + query_addition

        if actors is not None and len(actors)>0:
            actor_list = actors.split(",")
            for actor in actor_list:
                if actor is not None and len(actor) > 0:
                    query_addition = f" and exists (select c.Pid from People as p right join cast as c on (c.Pid = p.Id and c.Sid = s.Id) where p.Name = '{actor.strip()}') "
                    query = query + query_addition

        if directors is not None and len(directors)>0:
            director_list = directors.split(",")
            for director in director_list:
                if director is not None and len(director) > 0:
                    query_addition = f" and exists (select d.Pid from People as p right join Directs as d on (d.Pid = p.Id and d.Sid = s.Id) where p.Name = '{director.strip()}') "
                    query = query + query_addition

        query = query + """ ) as s_out left join Cast as c on (s_out.Id = c.Sid) left join Directs as d on (d.Sid = s_out.Id) left join People as pc on (c.Pid = pc.Id) left join People as pd on (d.Pid = pd.Id) group by s_out.Id, s_out.Country, s_out.Date_Added, s_out.Description, s_out.Duration, s_out.Listed_In, s_out.Platform, s_out.Rating, s_out.Release_Year, s_out.Title, s_out.Type"""

        print(query)
        items = conn.execute(query).fetchall()
        if items is not None and len(items) > 0:
            result_code = True

        if result_code:
            for item in items:
                line = dict()
                line["id"] = item[0]
                line["type"] = item[1]
                line["title"] = item[2]
                line["country"] = item[3]
                line["date_added"] = item[4]
                line["year"] = item[5]
                line["rating"] = item[6]
                line["duration"] = item[7]
                line["genre"] = item[8]
                line["description"] = item[9]
                line["platform"] = item[10]


                actors = item[11]
                actor_dict = {}
                actors_string = ""
                if actors is not None and len(actors) > 0:
                    actor_list = actors.split(",")
                    for actor in actor_list:
                        if actor is not None and len(actor) > 0:
                            actor_name = actor.strip()
                            if actor_name not in actor_dict.keys():
                                actor_dict[actor_name] = "exist"
                                actors_string = actors_string + actor_name + ", "
                    actors_string = actors_string[0:-2]
                line["actor"] = actors_string


                directors = item[12]
                directors_dict = {}
                directors_string = ""
                if directors is not None and len(directors) > 0:
                    directors_list = directors.split(",")
                    for director in directors_list:
                        if director is not None and len(director) > 0:
                            director_name = director.strip()
                            if director_name not in directors_dict.keys():
                                directors_dict[director_name] = "exist"
                                directors_string = directors_string + director_name + ", "
                    directors_string = directors_string[0:-2]
                line["director"] = directors_string

                data.append(line)
        print(data)
    except Exception as e:
        print(e)
    finally:
        return json.dumps(data)
        conn.close()
        return data


app.run()