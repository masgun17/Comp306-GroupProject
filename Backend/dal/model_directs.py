from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, SmallInteger, Float, \
    BLOB, Boolean, Index, BigInteger, and_, text, ForeignKey, REAL, or_, FLOAT, TEXT, asc, desc
from sqlalchemy.dialects.mysql import pymysql

from app_globals import connection

class Directs():
    __tablename__ = 'Directs'
    # Directs (Sid + Pid)
    Sid = Column(BigInteger, primary_key=True, autoincrement=True)
    Pid = Column(BigInteger, primary_key=True, autoincrement=True)

    @classmethod
    def has_item(cls, Sid, Pid):
        conn = connection.cursor()
        query_item = None
        result_code = False
        try:
            query_item = conn.execute(f"select * from Directs where Sid = {Sid} and Pid={Pid}").fetchall()[0]
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
                items = conn.execute(f"select * from Directs where {column_name} = '{column_value}'").fetchall()
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
                query = "select * from Directs where " + column_names[0] + " = '" + column_values[0] + "' "
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
            items = conn.execute("select * from Directs").fetchall()
            if items is not None and len(items) > 0:
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items


    ## Input will be: (Sid + Pid)
    @classmethod
    def add_item(cls, Directs_item):
        conn = connection.cursor()
        result_code = False
        if Directs_item is not None and len(Directs_item)==2:
            try:
                conn.execute(f"""
                    insert into Directs
                       ([Sid]
                       ,[Pid])
                    values
                       ({Directs_item[0]}
                       ,{Directs_item[1]})""")
                result_code = True
                conn.commit()
            except Exception as e:
                print(e)
            finally:
                conn.close()
                return result_code
        else:
            print(len(Directs_item))
            return result_code, None


    # deletes given item (Sid + Pid) from db
    @classmethod
    def delete_item(cls, Sid, Pid):
        conn = connection.cursor()
        result_code = False
        try:
            conn.execute(f"delete from Directs where Sid = {Sid} and Pid={Pid}")
            result_code = True
            conn.commit()
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code



    ## Input will be: Sid, Pid
    @classmethod
    def update_item(cls, Sid, Pid):
        conn = connection.cursor()
        result_code = False
        if Sid is not None and Pid is not None:
            try:
                conn.execute(f"""
                            update Directs set
                               Sid = {Sid}
                               Pid = {Pid}
                            where Sid = {Sid} and Pid={Pid}
                            """)
                result_code = True
                conn.commit()
            except Exception as e:
                print(e)
            finally:
                conn.close()
                return result_code
        else:
            print(Pid, Sid)
            return result_code, None
    """
## Input will be: Id and (UserTypeId, Name, Surname, Email, Phone, Password, KvkkCheck)
    @classmethod
    def change_password(cls, Directs_id, newPassword):
        conn = connection.cursor()
        result_code = False
        if Directs_id is not None and newPassword is not None:
            try:
                conn.execute(f'''
                            update Directs set
                               Password = '{newPassword}'
                            where Id = {Directs_id}
                            ''')
                result_code = True
                conn.commit()
            except Exception as e:
                print(e)
            finally:
                conn.close()
                return result_code
        else:
            print(len(Directs_id))
            return result_code, None
    """

    @classmethod
    def get_all_by_id(cls, Sid, Pid):
        conn = connection.cursor()
        items = None
        result_code = False
        try:
            items = conn.execute(f"select * from Directs where Sid = {Sid} and Pid={Pid}").fetchall()
            conn.commit()
            print(items)
            if items is not None and len(items) > 0:
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items


