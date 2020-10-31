import pandas as pd
import numpy as np
import pymysql
from datetime import datetime


def merge_dict_list(list1, row):
    print(len(list1))
    list1[4] += row["생산량"]
    list1[5] += row["시멘트"]
    list1[6] += row["S/C"]
    list1[7] += row["S/P"]
    list1[8] += row["F/A"]
    list1[9] += row["기타"]
    list1[10] += row["세척사"]
    list1[11] += row["부순모래"]
    list1[12] += row["자연사"]
    list1[13] += row["굵은골재"]
    list1[14] += row["AE제"]
    list1[15] += row["감수제"]
    list1[16] += row["청수"]
    list1[17] += row["회수수"]
    list1[18] += row["전기"]
    list1[19] += row["LPG"]
    list1[20] += row["LNG"]
    list1[21] += row["경유"]
    list1[22] += row["폐기"]


if __name__ == "__main__":
    Fact = ['AP03','AP06','AP22','AP32','AP33','AP42','AP51']
    Prod = ['25-24-15','25-27-15','25-30-15','25-35-15']
    #Fname=['201812.xlsx','201901.xlsx','201903.xlsx','201905.xlsx','201907.xlsx','201908.xlsx','201910.xlsx']

    DB_User_ID = 'root'
    DB_Passwd  = '0000'
    DB_name = 'data1'

    db = pymysql.connect(host = '34.64.136.15', user = DB_User_ID, passwd = DB_Passwd, db = DB_name, charset = 'utf8')
    cur = db.cursor(pymysql.cursors.DictCursor)


    for year in [2017, 2018, 2019]:
        for month in range(12):
            fname = str(year)
            if month < 10:
                fname += '0'+str(month+1)
            else :
                fname += str(month+1)
            fname += '.xlsx'
            sales = pd.read_excel("../excel/"+fname)
            for fact in Fact :
                DF0 = sales[sales['Unnamed: 2']==fact]
                Whl_Time = set(DF0['Unnamed: 1'])
                for time in Whl_Time :
                    print(time)
                    DF = DF0[DF0['Unnamed: 1']==time]
                    df = DF.drop(DF.columns[[0,1,2,3]],axis = 'columns')
                    Input = list(df.sum())
                    time_str = str(time.year) + "-" + str(time.month) + "-" + str(time.day)
                    List = [time_str, fact, Input[0]]
                    cur.execute("select * from whole_product where made_date = " + time_str + " and factory = " + '\'' +fact + '\'')
                    trows = cur.fetchall()
                    if (len(trows) < 1):
                        cur.execute("insert into whole_product values " + str(tuple(List)))
                    else :
                        List[2] += trows[0]['amount']
                        cur.execute("delete from whole_product where made_date = " + time_str + " and factory = " + '\'' +fact + '\'')
                        cur.execute("insert into whole_product values " + str(tuple(List)))
                for prod in Prod :
                    product = DF0['Unnamed: 3'].str.contains(prod,na=False)
                    DF1 = DF0[product]
                    Time = set(DF1['Unnamed: 1'])
                    for time in Time :
                        DF = DF1[DF1['Unnamed: 1']==time]
                        List = [time.year,time.month,time.day,prod]
                        df = DF.drop(DF.columns[[0,1,2,3]],axis = 'columns')
                        Input = list(df.sum())
                        List+=Input[:8]
                        List.append(Input[8]+Input[9])
                        List.append(Input[10]+Input[11]+Input[12])
                        List+=Input[13:]
                        List+=[0,0,0,0,0]
                        cur.execute("select * from "+fact.lower()+" where 연도 = " + str(time.year) + " and 월 = " + str(time.month) + " and 일 = " + str(time.day) + " and 규격 = " + prod)
                        rows = cur.fetchall()
                        if(len(rows) < 1):
                            cur.execute("INSERT INTO "+fact.lower()+" VALUES"+str(tuple(List)))
                        else :
                            merge_dict_list(List, rows[0])
                            cur.execute("delete from "+fact.lower()+" where 연도 = " + str(time.year) + " and 월 = " + str(time.month) + " and 일 = " + str(time.day) + " and 규격 = " + prod)
                            cur.execute("INSERT INTO "+fact.lower()+" VALUES"+str(tuple(List)))
                        
    # 주의 : 중복된 파일 또 넣지 마세요!!!!!!!!제발
    # 어떤 파일에서 에러 나면 Fname 리스트를 바꾼 후(이미 들어간거 지운 후), db확인해서 에러난 파일 관련 정보들 지우고 사용.


    db.commit()

