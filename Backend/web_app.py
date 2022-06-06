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
from dal.model_watchlist import Watchlist
from dal.model_comments import Comments
from dal import hashingPassword
import codecs
from dal.model_users import Users
from flask import request
app = Flask("comp306")

## response = requests.get('https://httpbin.org/ip')
## print('Your IP is {0}'.format(response.json()['origin']))

# Trusted Connection to Named Instance
connection = pyodbc.connect(
    'DRIVER={ODBC Driver 17 for SQL Server}; SERVER=localhost\SQLEXPRESS;DATABASE=Comp306;Trusted_Connection=yes;')



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
    form = form["data"][0]
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

    query = "select top(100) s_out.*, STRING_AGG(pc.Name, ', ') as cast_names, STRING_AGG( pd.Name, ', ') as directors_names from ( select * from Shows as s where "

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
                if item[4] is not None:
                    line["date_added"] = item[4].strftime("%d/%m/%Y")
                else:
                    line["date_added"] = ""
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

@app.route("/addToList",   methods=['POST', 'GET']) 
def addToList():
    conn = connection.cursor()
    print(request)
    form = json.loads(request.data)
    print(form)
    form = form["data"][0]
    print(form)
    data = []
    data.append(int(form["uid"]))
    data.append(int(form["sid"]))
    data.append(form["flag"])
    has = Watchlist.has_item(int(form["sid"]), int(form["uid"]),form["flag"])
    print(has[0])
    if has[0]:
        deleted = Watchlist.delete_item(int(form["sid"]), int(form["uid"]),form["flag"])
        print(deleted)
        if deleted:
            conn.close()
            return json.dumps("Movie removed from your list")
    else:
        result_code = Watchlist.add_item(data)
        if result_code:
            conn.close()
            return json.dumps("Movie added successfully.")
        else:
            conn.close()
            return json.dumps("Movie is already in your list.")


@app.route("/getRatingCounts", methods=['POST', 'GET'])
def getRatingCounts():
    conn = connection.cursor()
    items = []
    result_code = False
    data = []
    form = json.loads(request.data)
    form = form["data"][0]
    Sid = form['Sid'] # int
    try:
        query = f"select c.Rating, count(*) as rating_count from Comments as c where c.Sid = {Sid} group by c.Rating order by c.Rating asc"
        items = conn.execute(query).fetchall()
        if items is not None and len(items) > 0:
            result_code = True
        if result_code:
            for item in items:
                line = dict()
                line["rating"] = item[0]
                line["rating_count"] = item[1]
                data.append(line)
        print(query)
        
        print(data)
    except Exception as e:
        print(e)
    finally:
        return json.dumps(data)
        conn.close()
        return data



@app.route("/getComments", methods=['POST', 'GET'])
def getComments():
    conn = connection.cursor()
    items = []
    result_code = False
    data = []
    form = json.loads(request.data)
    form = form["data"][0]
    Sid = form['Sid']  # int
    rating_small = form['rating_small']  # int
    rating_big = form['rating_big']  # int
    try:
        query = f"select u.Username, c.Comment, c.Rating from Comments as c left join Users as u on (u.Id = c.Uid) where c.Sid = {Sid} and c.Rating >= {rating_small} and c.Rating <= {rating_big}"
        items = conn.execute(query).fetchall()
        if items is not None and len(items) > 0:
            result_code = True
        if result_code:
            for item in items:
                line = dict()
                line["Username"] = item[0]
                line["Comment"] = item[1]
                line["Rating"] = item[2]
                data.append(line)
        print(query)
        
        print(data)
    except Exception as e:
        print(e)
    finally:
        return json.dumps(data)
        conn.close()
        return data


@app.route("/getWatchlistWishlist", methods=['POST', 'GET'])
def getWatchlistWishlist():
    conn = connection.cursor()
    items = []
    result_code = False
    data = []
    form = json.loads(request.data)
    form = form["data"][0]
    Uid = form['Uid']  # int
    try:
        query = f"""select u1.Username, STRING_AGG(s1.Id, ', ') as WatchIds, STRING_AGG(s2.Id, ', ') as WishIds
                from Users as u1 left join Watchlist as w1 on (u1.Id = w1.Uid and w1.Flag = 0) left join Shows as s1 on (w1.Sid = s1.Id),
                Users as u2 left join Watchlist as w2 on (u2.Id = w2.Uid and w2.Flag = 1) left join Shows as s2 on (w2.Sid = s2.Id)
                where u1.Id = u2.Id and u1.Id = {Uid}
                group by u1.Id , u1.Username
                """
        items = conn.execute(query).fetchall()
        if items is not None and len(items) > 0:
            result_code = True
        if result_code:
            for item in items:
                line = dict()
                line["Username"] = item[0]
                line["WatchIds"] = item[1]
                line["WishIds"] = item[2]
                data.append(line)
        print(query)
        print(data)
    except Exception as e:
        print(e)
    finally:
        return json.dumps(data)
        conn.close()
        return data


@app.route("/getShow", methods=['POST', 'GET'])
def getShow():
    conn = connection.cursor()
    items = []
    result_code = False
    data = []
    form = json.loads(request.data)
    form = form["data"][0]
    Sid = form['Sid']  # int
    try:
        query = f"""
        select top(100) s_out.*, STRING_AGG(pc.Name, ', ') as cast_names, STRING_AGG( pd.Name, ', ') as directors_names
        from Shows as s_out left join Cast as c on (s_out.Id = c.Sid) left join Directs as d on (d.Sid = s_out.Id) left join People as pc on (c.Pid = pc.Id) left join People as pd on (d.Pid = pd.Id)
        where s_out.Id = {Sid}
        group by s_out.Id, s_out.Country, s_out.Date_Added, s_out.Description, s_out.Duration, s_out.Listed_In, s_out.Platform, s_out.Rating, s_out.Release_Year, s_out.Title, s_out.Type"""
        items = conn.execute(query).fetchall()

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
                if item[4] is not None:
                    line["date_added"] = item[4].strftime("%d/%m/%Y")
                else:
                    line["date_added"] = ""
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

@app.route("/createComment", methods=['POST', 'GET'])
def createComment():

    conn = connection.cursor()
    items = []
    result_code = False
    data = []
    form = json.loads(request.data)
    form = form["data"][0]
    Sid = form['Sid']  # int
    Uid = form['Uid']  # int
    Comment = form['Comment']  # string
    Rating = form['Rating']  # int

    try:
        result_code = Comments.add_item([Uid, Sid, Comment, Rating])
        if result_code:
            return 'Comment added Successfully'
        else:
            return 'Bad Request '
    except Exception as e:
        print(e)
        return 'Bad Request Exception'





@app.route("/searchFromWatchWishList", methods=['POST', 'GET'])
def searchFromWatchWishList():
    conn = connection.cursor()
    items = []
    result_code = False
    data = []

    form = json.loads(request.data)
    form = form["data"][0]
    title = form['title']  # string
    year_small = form['year_small']  # integer
    year_big = form['year_big']  # integer
    platform_netflix = form['platform_netflix']  # bool
    platform_amazon = form['platform_amazon']  # bool
    genres = form['genres']  # string array
    type = form['type']  # string 0: TV Show or 1: Movie
    duration_small = form['duration_small']  # int
    duration_big = form['duration_big']  # int
    countries = form['countries']  # string array
    directors = form['directors']  # string array
    actors = form['actors']  # string
    flag = form['flag']  # int
    uid = form['uid']  # int

    query = "select top(100) s_out.*, STRING_AGG(pc.Name, ', ') as cast_names, STRING_AGG( pd.Name, ', ') as directors_names from ( select * from Shows as s where "

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

        if genres is not None and len(genres) > 0:
            for genre in genres:
                if genre is not None and len(genre) > 0:
                    input_genre = genre
                    query_addition = f" and s.Listed_In like '%{input_genre}%' "
                    query = query + query_addition

        if type is not None and len(type) > 0:
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

        if countries is not None and len(countries) > 0:
            for country in countries:
                if country is not None and len(country) > 0:
                    input_country = country
                    query_addition = f" and s.Country like '%{input_country}%' "
                    query = query + query_addition

        if actors is not None and len(actors) > 0:
            actor_list = actors.split(",")
            for actor in actor_list:
                if actor is not None and len(actor) > 0:
                    query_addition = f" and exists (select c.Pid from People as p right join cast as c on (c.Pid = p.Id and c.Sid = s.Id) where p.Name = '{actor.strip()}') "
                    query = query + query_addition

        if directors is not None and len(directors) > 0:
            director_list = directors.split(",")
            for director in director_list:
                if director is not None and len(director) > 0:
                    query_addition = f" and exists (select d.Pid from People as p right join Directs as d on (d.Pid = p.Id and d.Sid = s.Id) where p.Name = '{director.strip()}') "
                    query = query + query_addition

        query = query + f""" ) as s_out left join Cast as c on (s_out.Id = c.Sid) left join Directs as d on (d.Sid = s_out.Id) left join People as pc on (c.Pid = pc.Id) left join People as pd on (d.Pid = pd.Id) left join Users as u on (u.Id = {uid}) left join Watchlist as w on (w.Uid = u.Id and w.Sid = s_out.Id and w.Flag = {flag}) where w.Uid is not null group by s_out.Id, s_out.Country, s_out.Date_Added, s_out.Description, s_out.Duration, s_out.Listed_In, s_out.Platform, s_out.Rating, s_out.Release_Year, s_out.Title, s_out.Type"""

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
                if item[4] is not None:
                    line["date_added"] = item[4].strftime("%d/%m/%Y")
                else:
                    line["date_added"] = ""
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



@app.route("/timePerGenre", methods=['POST', 'GET'])
def timePerGenre():
    conn = connection.cursor()
    items = []
    result_code = False
    data = []

    form = json.loads(request.data)
    form = form["data"][0]
    Uid = form['Uid']  # int
    try:
        query = f"""
            IF OBJECT_ID(N'tempdb..#Temp') IS NOT NULL
            BEGIN
            DROP TABLE #Temp
            END
            CREATE TABLE #Temp
            (
              Listed_In  varchar(255),
            )
            
            IF OBJECT_ID(N'tempdb..#Temp2') IS NOT NULL
            BEGIN
            DROP TABLE #Temp2
            END
            CREATE TABLE #Temp2
            (
                Id bigint IDENTITY(1,1),
              Listed_In  varchar(255),
            )
            
            
            INSERT INTO #Temp2
            SELECT T.Listed_In
                FROM (
                    SELECT Listed_In
                    FROM [Comp306].[dbo].[Shows] WHERE Id IN (select Sid from Watchlist where Uid = 1 and Flag = 0)
                ) as T
            
            
            DECLARE @i int = 1
            WHILE @i <= (select top(1) count(*) as c from Watchlist where Uid = 1 and Flag = 0 group by uid)
            
            
            BEGIN
            DECLARE @StringList AS VARCHAR(1000)= (SELECT Listed_In
            FROM (
            SELECT ROW_NUMBER() OVER (ORDER BY Id) AS RowNum, Listed_In
            FROM #Temp2
            ) T
            WHERE RowNum IN (@i))
            
            INSERT INTO #Temp
            SELECT 
                TRIM(value) 
            FROM 
                STRING_SPLIT(@StringList,',')
            
            SET @i = @i + 1
            end
            
             select sums.Listed_In, isnull(sum(sums.movie),0) as MovieSum, isnull(sum(sums.tvs),0) as TVSum from (
             select t.Listed_In  , ( select cast((SELECT top(1) value FROM STRING_SPLIT(s.Duration, ' ') where s.Type = 'Movie') as int)) as movie
             , ( select cast((SELECT top(1) value FROM STRING_SPLIT(s.Duration, ' ') where s.Type = 'TV Show') as int)) as tvs
             from Users as u 
             left join Watchlist as w on (u.Id = w.Uid and w.Flag = 0)
             left join Shows as s on (w.Sid = s.Id), #Temp as t
             where s.Listed_In like CONCAT('%', t.Listed_In ,'%') and u.Id = {Uid}
             group by t.Listed_In, s.Duration, s.Type
             ) as sums
             group by sums.Listed_In
        
                    """
        items = conn.execute(query).fetchall()
        if items is not None and len(items) > 0:
            result_code = True
        if result_code:
            for item in items:
                line = dict()
                line["Listed_In"] = item[0]
                line["MovieSum"] = item[1]
                line["TVSum"] = item[2]
                data.append(line)
        print(query)
        print(data)
    except Exception as e:
        print(e)
    finally:
        return json.dumps(data)
        conn.close()
        return data



@app.route("/getTopShows", methods=['POST', 'GET'])
def getTopShows():
    try:
        query = "select top(20) s_out.*, STRING_AGG(pc.Name, ', ') as cast_names, STRING_AGG( pd.Name, ', ') as directors_names, isnull(AVG(com.Rating),0) as average from Shows as s_out left join  Comments as com on (com.Sid = s_out.Id) left join Cast as c on (s_out.Id = c.Sid) left join Directs as d on (d.Sid = s_out.Id) left join People as pc on (c.Pid = pc.Id) left join People as pd on (d.Pid = pd.Id) group by com.Sid, s_out.Id, s_out.Country, s_out.Date_Added, s_out.Description, s_out.Duration, s_out.Listed_In, s_out.Platform, s_out.Rating, s_out.Release_Year, s_out.Title, s_out.Type order by AVG(com.Rating) desc"
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
                if item[4] is not None:
                    line["date_added"] = item[4].strftime("%d/%m/%Y")
                else:
                    line["date_added"] = ""
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
                line["average"] = item[13]

                data.append(line)
        print(data)
    except Exception as e:
        print(e)
    finally:
        return json.dumps(data)
        conn.close()
        return data







app.run()