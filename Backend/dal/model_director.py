from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, SmallInteger, Float, \
    BLOB, Boolean, Index, BigInteger, and_, text, ForeignKey, REAL, or_, FLOAT, TEXT, asc, desc
from sqlalchemy.dialects.mysql import pymysql

from app_globals import connection

class Director():
    __tablename__ = 'Director'
    # Director (Pid + AwardCount)
    Pid = Column(BigInteger, primary_key=True, autoincrement=True)
    AwardCount = Column(Integer)

    @classmethod
    def has_item(cls, Director_id):
        conn = connection.cursor()
        query_item = None
        result_code = False
        try:
            query_item = conn.execute(f"select * from Director where Id = {Director_id}").fetchall()[0]
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
                items = conn.execute(f"select * from Director where {column_name} = '{column_value}'").fetchall()
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
                query = "select * from Director where " + column_names[0] + " = '" + column_values[0] + "' "
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
            items = conn.execute("select * from Director").fetchall()
            if items is not None and len(items) > 0:
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items


    ## Input will be: (Pid + AwardCount)
    @classmethod
    def add_item(cls, Director_item):
        conn = connection.cursor()
        result_code = False
        if Director_item is not None and len(Director_item)==2:
            try:
                conn.execute(f"""
                    insert into Director
                       ([Pid]
                       ,[AwardCount])
                    values
                       ({Director_item[0]}
                       ,{Director_item[1]})""")
                result_code = True
                conn.commit()
            except Exception as e:
                print(e)
            finally:
                conn.close()
                return result_code
        else:
            print(len(Director_item))
            return result_code, None


    # deletes given item from db
    @classmethod
    def delete_item(cls, item_id):
        conn = connection.cursor()
        result_code = False
        try:
            conn.execute(f"delete from Director where Id={item_id}")
            result_code = True
            conn.commit()
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code



    ## Input will be: Pid + AwardCount
    @classmethod
    def update_item(cls, Director_id, AwardCount):
        conn = connection.cursor()
        result_code = False
        if Director_id is not None and AwardCount is not None:
            try:
                conn.execute(f"""
                            update Director set
                               AwardCount = {AwardCount}
                            where Id = {Director_id}
                            """)
                result_code = True
                conn.commit()
            except Exception as e:
                print(e)
            finally:
                conn.close()
                return result_code
        else:
            print(len(AwardCount))
            return result_code, None
    """
## Input will be: Id and (UserTypeId, Name, Surname, Email, Phone, Password, KvkkCheck)
    @classmethod
    def change_password(cls, Director_id, newPassword):
        conn = connection.cursor()
        result_code = False
        if Director_id is not None and newPassword is not None:
            try:
                conn.execute(f'''
                            update Director set
                               Password = '{newPassword}'
                            where Id = {Director_id}
                            ''')
                result_code = True
                conn.commit()
            except Exception as e:
                print(e)
            finally:
                conn.close()
                return result_code
        else:
            print(len(Director_id))
            return result_code, None
    """

    @classmethod
    def get_all_by_id(cls, Director_id):
        conn = connection.cursor()
        items = None
        result_code = False
        try:
            items = conn.execute(f"select * from Director where Id={Director_id}").fetchall()
            conn.commit()
            print(items)
            if items is not None and len(items) > 0:
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items


