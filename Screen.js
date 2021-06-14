import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import Flipcard from "react-native-flip-card";
import * as Speech from 'expo-speech'
import { Icon } from "react-native-elements";
import { Context } from "./App";
import { Setfav, Unmark } from "./Functions";
import { SafeAreaView, StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

const height = Dimensions.get('window').height
var heig = 600

export const Speak = ()=>{
  Speech.stop()
}

const Height_setter = ()=>{
    if(height < 686){heig = 480}
    else if(height >= 1110){heig = 900}
}

Height_setter()

export default function Screen({navigation}) {
    const {fav,word,lan,code,siri} = useContext(Context)
    
    //..FLIP-CARD FOR OLD & NEW TESTAMENT..//
    const Book = ({book,word})=>{
        const[icon,seticon] = useState('play-arrow')
        const[col,setcol] = useState('white')
        return(
            <View style={styles.Cardview}>
             <Flipcard friction={10000} flipVertical={false} flipHorizontal={true} style={styles.Card}>
              <View style={styles.Mainview}>
                <Text style={styles.text}>{book}</Text>
              </View>
              <View style={styles.Mainview}>
               <View style={styles.Subview}>
                <Text style={styles.text1}>{word}</Text>
               </View>
                <View style={styles.Subview1}>
                 <View style={styles.view}>
                    <Icon size={35} color='white' onPressIn={()=>{Speech.stop();seticon('play-arrow')}} name={icon} onPress={()=>{Speech.speak(word,{rate:0.8,language:code,voice:siri,onDone:()=>{seticon('play-arrow')},onStart:()=>{seticon('stop')}})}}/>
                 </View>
                 <View style={styles.view1}>
                    <Icon size={30} name='star' color={col} onPress={()=>{Setfav(book,lan);setcol('gold')}}/>
                 </View>
                </View>
              </View>
             </Flipcard>
            </View>
        )
    }
    //..END..//
    
    //..FLIP-CARD FOR FAVOURITES..//
    const Other = ({book,word})=>{
        const[icon,seticon] = useState('play-arrow')
        return(
            <View style={styles.Cardview}>
             <Flipcard friction={5000} flipHorizontal={true} flipVertical={false} style={styles.Card}>
              <View style={styles.Mainview}>
                <Text style={styles.text}>{book}</Text>
              </View>
              <View style={styles.Mainview}>
               <View style={styles.Subview}>
                <Text style={styles.text1}>{word}</Text>
               </View>
                <View style={styles.Subview1}>
                 <View style={styles.view}>
                    <Icon size={38} color='white' onPressIn={()=>{Speech.stop();seticon('play-arrow')}} name={icon} onPress={()=>{Speech.speak(word,{rate:0.8,language:code,voice:siri,onDone:()=>{seticon('play-arrow')},onStart:()=>{seticon('stop')}})}} name={icon}/>
                 </View>
                 <View style={styles.view1}>
                    <Icon size={30} name='delete' onPress={()=>{Unmark(book,navigation,lan)}} color='white'/>
                 </View>
                </View>
              </View>
             </Flipcard>
            </View>
        )
    }
    //..END..//

    const View1 = ()=>{
        return(
          <FlatList showsVerticalScrollIndicator={false} data={word} keyExtractor={item=>item.id} renderItem={({item})=> <Book book={item.Verse} word={item.Word}/>}/>
        )
      }
    
    const View2 = ()=>{
        return(
          <FlatList showsVerticalScrollIndicator={false} data={word} keyExtractor={item=>item.id} renderItem={({item})=> <Other book={item.Verse} word={item.Word}/>}/>
        )
      }
    
    const Intro = ()=>{
        return(
          <View style={styles.intro_view}>
            <Icon name='star' color="gold" size={140}/>
            <Text style={{textAlign:'center'}}>Sorry! There are no scriptures here.</Text>
          </View>
        )
      }
    
    const View_render = ()=>{
        if(word.length == 0){
          return(<Intro/>)
        }
        else if(fav){
          return(<View2/>)
        }
        else if(!fav){
          return(<View1/>)
        }
      }

  return (
    <SafeAreaView style={styles.container}>
      {View_render()}
      <StatusBar style="light"/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding:10,
    justifyContent:'center'
  },
  intro_view:{
      flex:1,
      justifyContent:'center',
      padding:10,
      backgroundColor:'#f1f1f1'
  },
  Card:{
      flex:1,
      backgroundColor:'#434850',
      borderRadius:15,
  },
  Cardview:{
      width:'95%',
      height:heig,
      marginTop:10,
      marginBottom:10,
      alignSelf:'center'
  },
  Mainview:{
      flex:1,
      justifyContent:'center',
      padding:10
  },
  Subview:{
      flex:10,
      padding:10,
      justifyContent:'center'
  },
  Subview1:{
    flexDirection:'row',
    flex:0.8,
    padding:5
},
  view:{
      flex:1,
      justifyContent:'center',
      alignItems:'flex-start',
  },
  view1:{
    flex:1,
    justifyContent:'center',
    alignItems:'flex-end'
 },
 text:{
     textAlign:'center',
     color:'white',
     fontSize:RFPercentage(4)
 },
 text1:{
    textAlign:'center',
    color:'white',
    fontSize:RFPercentage(2.8)
}
});
