from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, SmallInteger, Float, \
    BLOB, Boolean, Index, BigInteger, and_, text, ForeignKey, REAL, or_, FLOAT, TEXT, asc, desc
from sqlalchemy.dialects.mysql import pymysql

from app_globals import connection

class Shows():
    __tablename__ = 'Shows'
    # Shows (Id, Type, Title,  Country, Date_Added, Release_Year, Rating, Duration, Listed_In, Description)
    Id = Column(BigInteger, primary_key=True, autoincrement=True)
    Type = Column(String)
    Title = Column(String)
    Country = Column(String)
    Date_Added = Column(DateTime)
    Release_Year = Column(Integer)
    Rating = Column(String)
    Duration = Column(String)
    Listed_In = Column(String)
    Description = Column(String)


    @classmethod
    def has_item(cls, show_id):
        conn = connection.cursor()
        query_item = None
        result_code = False
        try:
            query_item = conn.execute(f"select * from Shows where Id = {show_id}").fetchall()[0]
            if query_item is not None:
                ## item = {"Id": query_item[0][0], "showId": query_item[0][1], "AddDate": query_item[0][2]}
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
                items = conn.execute(f"select * from Shows where {column_name} = '{column_value}'").fetchall()
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
                query = "select * from Shows where " + column_names[0] + " = '" + column_values[0] + "' "
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
            items = conn.execute("select * from Shows").fetchall()
            if items is not None and len(items) > 0:
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items


    ## Input will be: (TypeType, Title,  Country, Date_Added, Release_Year, Rating, Duration, Listed_In, Description)
    @classmethod
    def add_item(cls, show_item):
        conn = connection.cursor()
        result_code = False
        if show_item is not None and len(show_item)==3:
            try:
                conn.execute(f"""
                    insert into Shows
                       ([TypeType]
                       ,[Title]
                       ,[Country]
                       ,[Date_Added]
                       ,[Release_Year]
                       ,[Rating]
                       ,[Duration]
                       ,[Listed_In]
                       ,[Description])
                    values
                       ('{show_item[0]}'
                       ,'{show_item[1]}'
                       ,'{show_item[2]}'
                       ,'{show_item[3]}'
                       ,{show_item[4]}
                       ,'{show_item[5]}'
                       ,'{show_item[6]}'
                       ,'{show_item[7]}'
                       ,'{show_item[8]}')""")
                result_code = True
                conn.commit()
            except Exception as e:
                print(e)
            finally:
                conn.close()
                return result_code
        else:
            print(len(show_item))
            return result_code, None


    # deletes given item from db
    @classmethod
    def delete_item(cls, item_id):
        conn = connection.cursor()
        result_code = False
        try:
            conn.execute(f"delete from Shows where Id={item_id}")
            result_code = True
            conn.commit()
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code



    ## Input will be: Id and (TypeType, Title,  Country, Date_Added, Release_Year, Rating, Duration, Listed_In, Description)
    @classmethod
    def update_item(cls, show_id, show_item):
        conn = connection.cursor()
        result_code = False
        if show_id is not None and show_item is not None and len(show_item) == 9:
            try:
                conn.execute(f"""
                            update Shows set
                               TypeType = '{show_item[0]}'
                               ,Title = '{show_item[1]}'
                               ,Country = '{show_item[2]}'
                               ,Date_Added = '{show_item[3]}'
                               ,Release_Year = '{show_item[4]}'
                               ,Rating = '{show_item[5]}'
                               ,Duration = '{show_item[6]}'
                               ,Listed_In = '{show_item[7]}'
                               ,Description = '{show_item[8]}'
                            where Id = {show_id}
                            """)
                result_code = True
                conn.commit()
            except Exception as e:
                print(e)
            finally:
                conn.close()
                return result_code
        else:
            print(len(show_item))
            return result_code, None

    @classmethod
    def get_all_by_id(cls, showId):
        conn = connection.cursor()
        items = None
        result_code = False
        try:
            items = conn.execute(f"select * from Shows where Id={showId}").fetchall()
            conn.commit()
            print(items)
            if items is not None and len(items) > 0:
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items


    @classmethod
    def getGenres(cls):
        conn = connection.cursor()
        query_item = None
        result_code = False
        try:
            query_item = conn.execute(f"""IF OBJECT_ID(N'tempdb..#Temp') IS NOT NULL
BEGIN
DROP TABLE #Temp
END
CREATE TABLE #Temp
(
  Listed_In  varchar(255),
)

DECLARE @i int = -1
WHILE @i < 18491

BEGIN
DECLARE @StringList AS VARCHAR(1000)= (SELECT Listed_In
FROM (
SELECT ROW_NUMBER() OVER (ORDER BY Id) AS RowNum, Listed_In
FROM [Comp306].[dbo].[Shows]
) T
WHERE RowNum IN (@i))

INSERT INTO #Temp
SELECT 
    value 
FROM 
    STRING_SPLIT(@StringList,',')

SET @i = @i + 1
end
 SELECT distinct * FROM #Temp""").fetchall()[0]
            if query_item is not None:
                ## item = {"Id": query_item[0][0], "showId": query_item[0][1], "AddDate": query_item[0][2]}
                print(query_item)
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, query_item


    @classmethod
    def getCountries(cls):
        conn = connection.cursor()
        query_item = None
        result_code = False
        try:
            query_item = conn.execute(f" select distinct Country from Shows where Country NOT LIKE '%,%'").fetchall()
            if query_item is not None:
                ## item = {"Id": query_item[0][0], "showId": query_item[0][1], "AddDate": query_item[0][2]}
                print(query_item)
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, query_item



