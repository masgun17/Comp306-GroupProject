from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, SmallInteger, Float, \
    BLOB, Boolean, Index, BigInteger, and_, text, ForeignKey, REAL, or_, FLOAT, TEXT, asc, desc
from sqlalchemy.dialects.mysql import pymysql

from app_globals import connection

class Watchlist():
    __tablename__ = 'Watchlist'
    # Watchlist (Uid, Sid)
    Uid = Column(BigInteger, primary_key=True, autoincrement=True)
    Sid = Column(BigInteger, primary_key=True, autoincrement=True)

    @classmethod
    def has_item(cls, Sid, Uid):
        conn = connection.cursor()
        query_item = None
        result_code = False
        try:
            query_item = conn.execute(f"select * from Watchlist where Sid = {Sid} and Uid={Uid}").fetchall()[0]
            if query_item is not None:
                ## item = {"Id": query_item[0][0], "UserId": query_item[0][1], "AddDate": query_item[0][2]}
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, query_item

    @classmethod
    def has_item_by_column(cls, column_name, column_value, first_n=None):
        conn = connection.cursor()
        items = []
        result_code = False
        try:
            if column_value is not None and column_name is not None and len(column_name) > 0:
                items = conn.execute(f"select * from Watchlist where {column_name} = '{column_value}'").fetchall()
                if items is not None and len(items) > 0:
                    result_code = True
                    if first_n is not None:
                        items = items[:first_n]
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items


    @classmethod
    def has_item_by_multipple_columns(cls, column_names, column_values, first_n=None):
        conn = connection.cursor()
        items = []
        result_code = False
        try:
            if column_values is not None and column_names is not None \
                    and len(column_names) > 0 and len(column_names)==len(column_values):
                query = "select * from Watchlist where " + column_names[0] + " = '" + column_values[0] + "' "
                for i in range(len(column_names)-1):
                    query = query + " and " + column_names[i] + " = '" + column_values[i] + "' "
                items = conn.execute(query).fetchall()
                if items is not None and len(items) > 0:
                    result_code = True
                    if first_n is not None:
                        items = items[:first_n]
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items


    @classmethod
    def get_all(cls):
        conn = connection.cursor()
        items = None
        result_code = False
        try:
            items = conn.execute("select * from Watchlist").fetchall()
            if items is not None and len(items) > 0:
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items


    ## Input will be: (Uid + Sid)
    @classmethod
    def add_item(cls, Watchlist_item):
        conn = connection.cursor()
        result_code = False
        if Watchlist_item is not None and len(Watchlist_item)==2:
            try:
                conn.execute(f"""
                    insert into Watchlist
                       ([Uid],
                       [Sid])
                    values
                       ({Watchlist_item[0]}
                       ,{Watchlist_item[1]})""")
                result_code = True
                conn.commit()
            except Exception as e:
                print(e)
            finally:
                conn.close()
                return result_code
        else:
            print(len(Watchlist_item))
            return result_code, None


    # deletes given item (Sid + Uid) from db
    @classmethod
    def delete_item(cls, Sid, Uid):
        conn = connection.cursor()
        result_code = False
        try:
            conn.execute(f"delete from Watchlist where Sid = {Sid} and Uid={Uid}")
            result_code = True
            conn.commit()
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code



    ## Input will be: Sid, Uid
    @classmethod
    def update_item(cls, Sid, Uid):
        conn = connection.cursor()
        result_code = False
        if Sid is not None and Uid is not None:
            try:
                conn.execute(f"""
                            update Watchlist set
                               Sid = {Sid}
                               Uid = {Uid}
                            where Sid = {Sid} and Uid={Uid}
                            """)
                result_code = True
                conn.commit()
            except Exception as e:
                print(e)
            finally:
                conn.close()
                return result_code
        else:
            print(Uid, Sid)
            return result_code, None

    @classmethod
    def get_all_by_id(cls, Sid, Uid):
        conn = connection.cursor()
        items = None
        result_code = False
        try:
            items = conn.execute(f"select * from Watchlist where Sid = {Sid} and Uid={Uid}").fetchall()
            conn.commit()
            print(items)
            if items is not None and len(items) > 0:
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items


