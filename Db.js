import * as SQLite from 'expo-sqlite';

//String value holding SQL Command.....
const Db_table = "create table if not exists English(id integer primary key not null,Verse text,Word text,Fav text default 'No')"
const Db_table1 = "create table if not exists French(id integer primary key not null,Verse text,Word text,Fav text default 'No')"
export const Db = SQLite.openDatabase("Must Know Scriptures.db")


//Function to Create Table for holding Scriptures in Scriptures.db.....
export const Create_db = ()=>{
    Db.transaction(tx=>{
        tx.executeSql(Db_table)
    },err=>{console.log(err,"Unable to Create Table")},res=>{console.log("English Table Created!")})

    Db.transaction(tx=>{
        tx.executeSql(Db_table1)
    },err=>{console.log(err,"Unable to Create Table")},res=>{console.log("French Table Created!")})

    Db.transaction(tx=>{
        tx.executeSql("Drop table Scripture")
    },(_,err)=>{console.log("No Table Scripture")},(res)=>{
        console.log("Done!")
    })
}

