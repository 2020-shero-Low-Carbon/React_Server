#-*- coding: utf-8 -*-

import pymysql 
import json
import numpy as np
import copy
import sys

DB_User_ID = 'root'
DB_Passwd  = '0000'
DB_name = 'data1'

def login(User, Passwd, DB_name) :
        db_ret = pymysql.connect(host = '34.64.136.15', user = User, passwd = Passwd, db = DB_name, charset = 'utf8')
        cur = db_ret.cursor(pymysql.cursors.DictCursor)
        return db_ret, cur


def Get_Info_Dict(Syear, Smon, Lyear, Lmon, cur) : # whole data from all factories
    Info = {}
    Fact = ['ap03','ap06','ap22','ap32','ap42','ap51']
    for fact in Fact :
        A = []       
        for year in range(Syear, Lyear + 1) : 
            if(year == Syear and year == Lyear) :
                smon = Smon; lmon = Lmon
            elif (year == Syear) :
                smon = Smon; lmon = 12
            elif (year == Lyear) :
                smon = 1; lmon = Lmon
            else :
                smon = 1; lmon = 12
            for month in range(smon, lmon + 1) :
                string = "SELECT * FROM " + fact + " WHERE 연도 = " + str(year) + " AND 월 = " + str(month)
                cur.execute(string)
                rows = cur.fetchall()
                for row in rows :
                    A.append(row)
        Info[fact] = A
    return Info

def Get_Trans_Dict(Syear,Smon,Lyear,Lmon,cur) : # 시작년도/월 ~ 마지막년도/월 까지(입력하여) 모든 공장의 1차 수송 정보 획득
    
    Trans = {}
    Fact = ['ap03','ap06','ap22','ap32','ap42','ap51']
    for fact in Fact :
        A = []       
        for year in range(Syear, Lyear + 1) : 
            if(year == Syear and year == Lyear) :
                smon = Smon; lmon = Lmon
            elif (year == Syear) :
                smon = Smon; lmon = 12
            elif (year == Lyear) :
                smon = 1; lmon = Lmon
            else :
                smon = 1; lmon = 12
            for month in range(smon, lmon + 1) :
                string = "SELECT * FROM "+fact+"_"+" WHERE 연도 = "+str(year)+" AND 월 = "+str(month)
                cur.execute(string)
                rows = cur.fetchall()
                for row in rows :
                    A.append(row)
        Trans[fact] = A
    return Trans

def Get_Info3Mon(Syear,Smon,Lyear,Lmon,cur) : # 각 월마다 3개월치씩 모은 정보 획득
    Info3mon = {}
    Fact = ['ap03','ap06','ap22','ap32','ap42','ap51']
    Prod = ['25-24-15','25-27-15','25-30-15','25-35-15']
    for fact in Fact :
        A = []       
        for year in range(Syear, Lyear + 1) : 
            if(year == Syear and year == Lyear) :
                smon = Smon; lmon = Lmon
            elif (year == Syear) :
                smon = Smon; lmon = 12
            elif (year == Lyear) :
                smon = 1; lmon = Lmon
            else :
                smon = 1; lmon = 12
            for month in range(smon, lmon + 1) :
                for prod in Prod : 
                    B = {"연도": year,
                        "월": month,
                        "일": 0,
                        "규격": prod,
                        "생산량": 0,
                        "시멘트": 0,
                        "S/C": 0,
                        "S/P": 0,
                        "F/A": 0,
                        "기타": 0,
                        "세척사": 0,
                        "부순모래": 0,
                        "자연사": 0,
                        "굵은골재": 0,
                        "AE제": 0,
                        "감수제": 0,
                        "청수": 0,
                        "회수수": 0,
                        "전기": 0,
                        "LPG": 0,
                        "LNG": 0,
                        "경유": 0,
                        "폐기": 0}
                    for mon in range(month-2, month+1) :
                        if(mon <= 0) :
                            Year = year-1
                            Mon = mon + 12
                        else :
                            Year = year
                            Mon = mon
                        string = "SELECT * FROM "+fact+" WHERE 연도 = "+str(Year)+" AND 월 = "+str(Mon)+" AND 규격 = '"+prod+"'"
                        cur.execute(string)
                        rows = cur.fetchall()
                        for row in rows :
                            B["생산량"] += row["생산량"]
                            B["시멘트"] += row["시멘트"]
                            B["S/C"] += row["S/C"]
                            B["S/P"] += row["S/P"]
                            B["F/A"] += row["F/A"]
                            B["기타"] += row["기타"]
                            B["세척사"] += row["세척사"]
                            B["부순모래"] += row["부순모래"]
                            B["자연사"] += row["자연사"]
                            B["굵은골재"] += row["굵은골재"]
                            B["AE제"] += row["AE제"]
                            B["감수제"] += row["감수제"]
                            B["청수"] += row["청수"]
                            B["회수수"] += row["회수수"]
                            B["전기"] += row["전기"]
                            B["LPG"] += row["LPG"]
                            B["LNG"] += row["LNG"]
                            B["경유"] += row["경유"]
                            B["폐기"] += row["폐기"]
                    A.append(B)     
        Info3mon[fact] = A
    return Info3mon


def GetLCIDB(cur) : #LCIDB 들고오기
    cur.execute("SELECT * FROM lcidb")
    row = cur.fetchone()
    return np.array(list(row.values()),dtype = 'float')

def ExtractInfo(FactName, ProdName,SYear,SMonth,SDay,FYear,FMonth,FDay) : # 특정 공장에서 특정 규격 추출(연도필수, 월/일은 선택)
    prod = " WHERE 규격 = '"+ProdName+"'"
    date_cond = " AND date(concat_ws('-', 연도, 월, 일)) between date(concat_ws('-', " + str(SYear) + ", " + str(SMonth) + ", " + str(SDay) + ")) AND date(concat_ws('-', " + str(FYear) + ", " + str(FMonth) + ", " + str(FDay) + "))"
    return "SELECT * FROM "+FactName+prod+date_cond

def ParamSum(data1rows) : # 값 합치기
    ParamArr = np.zeros(19)
    for row in data1rows :
        r = np.array(list(row.values())[4:])
        ParamArr = ParamArr + r
    return ParamArr

def WeightIndex(A) : #원부재료, 95%까지 값 찾기
    Index = []
    sorted_A = []
    Total = 0
    for i in range(1, 14):
        temp_arr = []
        temp_arr.append(i)
        temp_arr.append(A[i])
        sorted_A.append(temp_arr)
        Total += A[i]
    sorted_A = sorted(sorted_A, key = lambda x : x[1])
    sorted_A = sorted_A[::-1]
    Criterion = 0.95
    Sum = 0
    for i in range(13) :
        Sum += sorted_A[i][1]
        Index.append(sorted_A[i][0])
        if((Sum/Total)>=Criterion) : break
    return Index

def LPGDirectGWP(GWP,LPG) : #LPG로 인한 직접배출 GWP계산
    Sum = 0
    Sum += LPG*1.86*float(GWP[0])
    Sum += LPG*0.000117*(GWP[1])
    Sum += LPG*0.0000350*(GWP[2])
    return Sum

#def LNGDirectGWP(GWP,LNG) : #LPG로 인한 직접배출 GWP계산

def FuelDirectGWP(GWP,Fuel) : #경유로 인한 직접배출 GWP계산
    Sum = 0
    Fuel *= 0.825 #리터에서 kg으로 변환
    Sum += Fuel*3.14*float(GWP[0])
    Sum += Fuel*0.0000595*(GWP[1])
    Sum += Fuel*0.0000178*(GWP[2])
    return Sum
    
def GWP(ParamSum,WeightIndex,LCIDB,Trans_List) : #LCIDB를 이용한 GWP계산 ###함수이름이랑 변수이름이 같음 수정필요
    Sum = 0
    TotGWPInfo = ParamSum * LCIDB[:19]
    #for i in range(1, 10):
    #    TotGWPInfo[i] += ParamSum[i] * Trans_List[i-1]
    for i in WeightIndex :
        Sum += TotGWPInfo[i]    
    for i in range(14,len(ParamSum)): # 연료에 대해서는 다시 메소드를 사용해야한다(직접배출량 산정).
        Sum += TotGWPInfo[i]
    Sum += LPGDirectGWP(LCIDB[18:],ParamSum[15])
    #Sum += LNGDirectGWP(LCIDB[18:],ParamSum[16]) #LNG로 인한 직접배출 GWP계산은 아직 없음.
    Sum += FuelDirectGWP(LCIDB[18:],ParamSum[17])
        
    return Sum/TotGWPInfo[0]


def CalOneFactGWP(cur,FactName,ProdName,SYear,SMonth,SDay,FYear,FMonth,FDay,LCIDB,Trans_Dict) : # 한 공정에 대한 GWP 자동 계산
    cur.execute(ExtractInfo(FactName,ProdName,SYear,SMonth,SDay,FYear,FMonth,FDay))
    rows = cur.fetchall()
    if (len(rows) <1) : return [FactName,float(FactName[2:4]),0]
    A= ParamSum(rows)
    W = WeightIndex(A)
    gwp = GWP(A,W,LCIDB,Trans_Dict[FactName])
    return [FactName,A[0],gwp] # 공정코드, 생산량, GWP

def ShowInfo(Info) : # CalOneFactGWP의 결과값을 설명
    print("Factory code : ",Info[0],"\nProduct quantities : ",Info[1],"\nGWP : ",Info[2])

def MakeArr(FactInfo) : #공정 list에서 공정 Arr로 바꾸기
    return np.array(FactInfo).T

def FactWeightIndex(FactInfoArr) : #공정, 50% 찾기
    P = np.array(FactInfoArr[1],dtype = "float")
    sorted_P = []
    Index = []
    TotalProd = 0
    factnum = len(P)
    for i in range(factnum):
        temp_arr = []
        temp_arr.append(i)
        temp_arr.append(P[i])
        sorted_P.append(temp_arr)
        TotalProd += P[i]
    sorted_P = sorted(sorted_P, key = lambda x : x[1])
    sorted_P = sorted_P[::-1]
    Sum = 0
    Criterion = 0.5
    for i in range(factnum):
        Sum += sorted_P[i][1]
        Index.append(sorted_P[i][0])
        if((Sum/TotalProd) >= Criterion) : break
    """
    P = np.sort(np.array(FactInfoArr[1],dtype = "float"))[::-1]
    Sum = 0
    Index = []
    TotalProd = np.sum(P)
    Criterion = 0.5
    for i in range(len(P)):  ### 생산량 같을 때 오류 발생 key 값 이용해서 체크해야함 수정 필요
        Sum += P[i]
        index = int((np.where(FactInfoArr[1] == str(P[i])))[0])
        Index.append(index)
        if(Sum/TotalProd >= Criterion) : break
    print(Index)
    """
    return Index

def ExtractFact(Index,FactInfoArr) : # 50%에 해당하는 공정정보 찾기 + (각 공정 총 생산량 ->50% 해당 공정들 내 공정 비율)
    From = np.ndarray.transpose(FactInfoArr)
    ExtFact = np.ndarray.transpose(From[Index])
    ProdComp = np.array(ExtFact[1],dtype = "float")
    Sum = np.sum(ProdComp)
    ProdComp /= Sum
    ExtFact[1] = np.array(ProdComp,dtype = 'str')
    return ExtFact

def GetProdGWP(ExtFact) : # 제품에 대한 GWP와(가중평균), 정보를 1차 벤딩으로 넘기기위한 정보 얻기
    FactorArr = np.array(ExtFact[1],dtype = "float")
    FactGWPArr =np.array(ExtFact[2],dtype = "float")
    GWP2 = np.sum(FactorArr*FactGWPArr)
    return (np.array(ExtFact[0:2],dtype='str'),GWP2)



###이게 제일 중요!!!!!!!!!
def ProdGWP(cur,ProdName,SYear,SMonth,SDay,FYear,FMonth,FDay,LCIDB,Trans_Dict):
    FactList = ['ap03','ap06','ap22','ap32','ap33','ap42','ap51']
    Z=[]
    for FactName in FactList :
        gwp = CalOneFactGWP(cur,FactName,ProdName,SYear,SMonth,SDay,FYear,FMonth,FDay,LCIDB,Trans_Dict)
        Z.append(gwp)
    Zarr = MakeArr(Z)
    FactIndex = FactWeightIndex(Zarr)
    FactArr = ExtractFact(FactIndex,Zarr)
    (ExtInfo, GWP2) = GetProdGWP(FactArr)
    return (ExtInfo,GWP2)

def GetTransGWP(infoCol,TransCol,ExtInfo,B,n) :
    year = B["연도"]
    month = B["월"]
    day = B["일"]
    prod = B["규격"]
    
    ExtInfo = ExtInfo.T
    Sum = 0
    
    for row in ExtInfo :
        Sum_ = 0
        Info = infoCol[row[0]][n] #recipe를 위해 선언
        S = []
        for row_ in TransCol[row[0]] :
            if (row_['연도'] == year) and (row_['월'] == month) :
                S.append(list(row_.values()))
                
        if S == [] : continue 
            
        Sarr = np.array(S,dtype = "str")
        Set = set(Sarr.T[3])
        for element in Set :
            R = []
            Num = Info[element]/Info["생산량"] #element recipe 비율
            for row_ in S :
                if row_[3] == element :
                    R.append(row_)
            Rarr = np.array(R).T
            Rset = set(Rarr[4])
            XX = []
            for Relement in Rset :
                XX.append([0,0])
                for row_ in R :
                    if row_[4] == Relement :
                        XX[-1][0] +=row_[6]
                        XX[-1][1] =row_[-1]
            XX = np.array(XX,dtype = "float").T
            XX[0] = XX[0]/np.sum(XX[0])
            YY = np.sort(np.array(XX[0],dtype = "float"))[::-1]
            smallSum = 0
            ZZ = []
            for i in range(len(YY)) : #재료회사명과 묶어서 정렬하도록 수정예정 (to 중복값 해결)
                ZZ.append(int(np.where(XX[0]==YY[i])[0]))
                smallSum += YY[i]
                if smallSum >= 0.5 :
                    break
            smallSum = 0
            for zz in ZZ :
                smallSum += XX[0][zz]*XX[1][zz]*Num
            Sum_ +=smallSum/1000
       
        Sum += Sum_ * float(row[1])
		#print("Sum_ : ",Sum_,"ratio : ",float(row[1])) #ratio의 의미에 대해 물어볼 것
    return Sum


def OneFactGWP(info,FactName,LCIDB) :
    A= np.array(list(info.values())[4:])
    if np.sum(A) == 0 :
        for i in range(len(A)) :
            A[i] = i*0.01
    W = WeightIndex(A)
    gwp = GWP(A,W,LCIDB)
    return [FactName,A[0],gwp]

def get_GWP_List(infoCol,TransCol,cur) :
    gwp_list = {}
    
    LCIDB = GetLCIDB(cur)
    Fact = ['ap03','ap06','ap22','ap32','ap42','ap51']
    Prod = ['25-24-15','25-27-15','25-30-15','25-35-15']
    A = []
    for i in range(len(infoCol['ap03'])) :
        B = {}
        Z=[]
        B['연도'] = infoCol['ap03'][i]["연도"]
        B['월'] = infoCol['ap03'][i]['월']
        B['일'] = infoCol['ap03'][i]['일']
        B['규격'] = infoCol['ap03'][i]['규격']
        for fact in Fact :
            gwp = OneFactGWP(infoCol[fact][i],fact,LCIDB);
            Z.append(gwp)
        Zarr = MakeArr(Z)
        FactIndex = FactWeightIndex(Zarr)
        FactArr = ExtractFact(FactIndex,Zarr)
        (ExtInfo, GWP) = GetProdGWP(FactArr)
        #1차 협력사 수송 정보
        TransAmount = GetTransGWP(infoCol,TransCol,ExtInfo,B,i)
        print(i, TransAmount,GWP,LCIDB[-1])
        print(ExtInfo[0])
        GWP_ = TransAmount * LCIDB[-1]
        B['GWP'] = GWP + GWP_
        B['대표공장'] = list(ExtInfo[0])
        B['대표공장_생산비율'] = list(ExtInfo[1])
        A.append(B)
    gwp_list["gwp"] = A
    return gwp_list
    
def JSON_GENERATOR(Syear,Smon,Lyear,Lmon,cur) : #json 파일을 생성
    File1 = Get_Info_Dict(Syear,Smon,Lyear,Lmon,cur)
    File2 = Get_Trans_Dict(Syear,Smon,Lyear,Lmon,cur)
    File3 = Get_Info3Mon(Syear,Smon,Lyear,Lmon,cur)
    File4 = get_GWP_List(File3,File2,cur)
    file1_path = "./file1.json"
    file2_path = "./file2.json"
    file3_path = "./file3.json"
    file4_path = "./file4.json"
    with open(file1_path,"w") as outfile1 :
        json.dump(File1,outfile1,indent=4,ensure_ascii = False)
    
    with open(file2_path,"w") as outfile2 :
        json.dump(File2,outfile2,indent=4,ensure_ascii = False)
    
    with open(file3_path,"w") as outfile3 :
        json.dump(File3,outfile3,indent=4,ensure_ascii = False)
        
    with open(file4_path,"w") as outfile4 :
        json.dump(File4,outfile4,indent=4,ensure_ascii = False)
        
    return File1, File2, File3, File4

if __name__ == "__main__":

    (Remi_DB,cur) = login(DB_User_ID, DB_Passwd, DB_name)
    
    start_year = int(sys.argv[1])
    start_month = int(sys.argv[2])
    start_day = int(sys.argv[3])
    end_year = int(sys.argv[4])
    end_month = int(sys.argv[5])
    end_day = int(sys.argv[6])
    prod_cond = int(sys.argv[7])
    
    if prod_cond == 0 :
        tar_prod = '25-24-15'
    elif prod_cond == 1 :
        tar_prod = '25-27-15'
    elif prod_cond == 2 :
        tar_prod = '25-30-15'
    elif prod_cond == 3 :
        tar_prod = '25-35-15'
    else :
        print("Target product error occurred!")
        print("0 : 25-24-15")
        print("1 : 25-24-15")
        print("2 : 25-24-15")
        print("3 : 25-24-15")
        exit
        
    #print('Target Product : ' + tar_prod)
    
    Trans_Dict = {}
    trans_fp = open("../2019_trans_dis.txt", 'r')
    co2kg = float(trans_fp.readline())/1000 #CO2kg/kg*km
    for i in range(7):
        fact = trans_fp.readline()
        fact = fact[:-1]
        temp_list = []
        for j in range(9):
            temp_list.append(co2kg * float(trans_fp.readline()))
        Trans_Dict[fact] = copy.deepcopy(temp_list)

            
    """
    dict1, dict2, dict3, dict4 = JSON_GENERATOR(start_year, start_month, end_year, end_month, cur)
    
    
    B = {'연도': tar_year, '월': tar_month, '일': tar_day, '규격': '25-24-15'}
    
    ExtInfo = np.array([['ap42','ap06'],['0.5404618643820507', '0.4595381356179493']])
    
    n = 0
    infoCol = dict3
    TransCol = dict2
    Sum = GetTransGWP(infoCol,TransCol,ExtInfo,B,n) 
    
    print('수송 GWP')
    print(Sum)

    year = B["연도"]
    month = B["월"]
    day = B["일"]
    prod = B["규격"]
    """   
    
    lci_db_list = GetLCIDB(cur)
    
    #temp_info, final_gwp = ProdGWP(cur,tar_prod,  tar_year, tar_month, tar_day, lci_db_list)
    temp_info, final_gwp = ProdGWP(cur,tar_prod, start_year, start_month, start_day, end_year, end_month, end_day, lci_db_list, Trans_Dict)
    
    print(str(final_gwp))
