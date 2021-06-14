import React, { useState, useContext } from 'react'
import { View, StyleSheet, Image, FlatList, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { Context } from "./App";
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Seperator = () =>{
    return(
        <View style={{backgroundColor:'#e3e3e3',flex:1,height:1.2}}/>
    )
}

//Shared Preference for Language...
const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('Language', value)
  } catch (e) {
    console.log(e)
  }
}

const getData = async (set1,set2) => {
  try {
    const value = await AsyncStorage.getItem('Language')
    if(value == 'English') {
      set1('checkmark-circle')
      set2('ellipse-outline')
    }else{
      set2('checkmark-circle')
      set1('ellipse-outline')
    }
  } catch(e) {
     console.log(e)
  }
}
//End....

export default function Settings(){

const[icon1,seticon1] = useState('')
const[icon2,seticon2] = useState('')
const{setlan,setcode,setsiri} = useContext(Context)

getData(seticon1,seticon2)

const Languages = [{id:'1',name:'English',img:require('./assets/eng.png'),icon:icon1},
{id:'2',name:'French',img:require('./assets/fra.png'),icon:icon2}]

//Function to cause Radio button functionality to work...
const Press = (id) =>{
    if(id == '1'){
        seticon1('checkmark-circle')
        seticon2('ellipse-outline')
        storeData('English')
        setlan('English')
        setcode('en-GB')
        setsiri('com.apple.ttsbundle.Daniel-compact')
    }else if(id == 2){
        seticon2('checkmark-circle')
        seticon1('ellipse-outline')
        storeData('French')
        setlan('French')
        setcode('fr-FR')
        setsiri('com.apple.ttsbundle.Thomas-compact')
    }
}
//End...

const Lview = ({ic,img,text,id})=>{
  return(
    <View style={{flexDirection:'row',flex:1,padding:15}}>
      <View style={{flex:0.5,justifyContent:'center'}}>
        <Image style={{width:60,height:40}} source={img}/>
      </View>
      <View style={{flex:1,justifyContent:'center'}}>
        <Text style={style.text1}>{text}</Text>
      </View>
      <TouchableOpacity onPress={()=>{Press(id)}} style={{flex:0.5,justifyContent:'center',alignItems:'flex-end'}}>
       <Icon size={32} name={ic} type='ionicon'/>
      </TouchableOpacity>
    </View>
   )
}
  return(
    <View style={style.container}>
      <Text style={style.text}>Select Language</Text>
      <View style={{backgroundColor:'white'}}>
      <FlatList ItemSeparatorComponent={()=><Seperator/>} data={Languages} keyExtractor={id =>id.id} renderItem={({item})=> <Lview id={item.id} ic={item.icon} img={item.img} text={item.name}/>}/> 
      </View>
    </View>
  )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#eee'
    },
    text:{
      fontWeight:'bold',
      color:'black',
      fontSize:RFPercentage(3),
      marginTop:20,
      marginLeft:5,
      marginBottom:5
    },
    text1:{
      fontWeight:'bold',
      color:'#666666',
      fontSize:RFPercentage(2.8)
    }

})
 