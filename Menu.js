import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View,  TouchableOpacity, SectionList } from 'react-native';
import { Db, Create_db} from "./Db";
import { Context } from "./App";
import { Scripture, All, Fav, Create1 } from "./Functions";
import { RFPercentage } from "react-native-responsive-fontsize";
import {English_Book,French_Book} from './Books'
import {Seperator} from './Settings'
import NetInfo from '@react-native-community/netinfo'
import firebase from 'firebase/app'
import "firebase/auth"
import { Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay'


//..BOOKS OF THE OLD TESTAMENT..//
//..OTHERS LIST..//
const Eother = [{id:"1",book:"ALL"},
{id:"2",book:"Favourites"},]

const Fother = [{id:"1",book:"Tout"},
{id:"2",book:"Préféré"},]
//..END..//

Db
const Remove = ()=>{
  Db.transaction(tx=>{
    tx.executeSql("Drop table English")
  },()=>{console.log("Ok")},()=>{console.log("Done!")})

  Db.transaction(tx=>{
    tx.executeSql("Drop table French")
  },()=>{console.log("Ok")},()=>{console.log("Done!")})
}

export default function Menu({navigation}) {
  const{setword,setfav,fav,lan} = useContext(Context)
  const[visi,setvisi] = useState()


useEffect(()=>{
    Create_db()
    NetInfo.fetch().then(res=>{
      if(!res.isConnected){
        Alert.alert("Must Know Scriptures","You are Offline. Check your Internet connection.")
      }
        else{
          firebase.auth().onAuthStateChanged(user=>{
            setvisi(true)
            if(!user){
              firebase.auth().signInAnonymously()
              .then(res=>{
               Create1(setvisi)
              })
              .catch(err=>{
                setvisi(false)
                Alert.alert("Must Know Scriptures","Initial setup of app failed.")
              })
            }
            else{setvisi(false)}
          })
        }
      })         
},[])

const Section = ({book})=>{
  return(
    <Text style={styles.title}>{book}</Text>
  )
}

const Check = (title) =>{
  if(title == 'ALL' || title == 'Tout'){
    All(setword,navigation,fav,setfav,lan)
  } else if(title == 'Favourites' || title == 'Préféré'){
    Fav(setword,navigation,setfav,lan)
  } else{
    Scripture(title,navigation,setword,fav,setfav,lan,setvisi)
  } 
} 

//..OLD & NEW 
const Book = ({book})=>{
  return(
    <TouchableOpacity onPress={()=>{ Check(book) }} style={styles.list}>
      <Text style={styles.text}>{book}</Text>
    </TouchableOpacity>
  )
}
//..END..//

const English_view = ()=>{
  return(
    <View style={styles.container}>
     <SectionList sections={[
       {title:'Books',data:English_Book},
       {title:'Others',data:Eother}
     ]} ItemSeparatorComponent={()=><Seperator/>} stickySectionHeadersEnabled={false} maxToRenderPerBatch={5} renderSectionHeader={({section})=><Section book={section.title}/>} keyExtractor={(item,index)=>index} renderItem={({item})=><Book book={item.book}/>}/>
     <StatusBar style="light"/>
     <Spinner visible={visi} animation="fade" textStyle={{color:'white',textAlign:'center'}} textContent="Initializing and Downloading Scriptures..."/>
    </View>
  )
}

const French_view = ()=>{
  return(
    <View style={styles.container}>
     <SectionList sections={[
       {title:'Livres',data:French_Book},
       {title:'Autres',data:Fother}
     ]} ItemSeparatorComponent={()=><Seperator/>} renderSectionHeader={({section})=><Section book={section.title}/>} stickySectionHeadersEnabled={false} keyExtractor={(item,index)=>index} renderItem={({item})=><Book book={item.book}/>}/>
     <StatusBar style="light"/>
    </View>
  )
}
   
if(lan == 'English'){
  return(<English_view/>)
}else{
  return(<French_view/>)
}
     
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding:8
  },
  title:{
      fontWeight:'bold',
      marginTop:15,
      color:'#666666',
      fontSize:RFPercentage(3.4)
  },
  list:{
      justifyContent:'center',
      padding:8,
      flex:1
  },
  content:{
      flex:1.5,
      borderTopWidth:1.0,
      justifyContent:'center',
      borderTopColor:'grey',
  },
  others:{
      flex:0.5,
      borderTopWidth:1.0,
      justifyContent:'center',
      padding:5,
      borderTopColor:'grey'
  },
  text:{
      color:"#666666",
      fontSize:RFPercentage(2.8)
  }
});
