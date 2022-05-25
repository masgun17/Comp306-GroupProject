import pyodbc

# Trusted Connection to Named Instance
from sqlalchemy.dialects.mysql import pymysql
from sqlalchemy.ext.declarative import declarative_base

connection = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server}; SERVER=localhost\SQLEXPRESS;DATABASE=Comp306;Trusted_Connection=yes;')








