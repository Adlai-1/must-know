import React,{createContext, useState} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Menu"
import Screen,{ Speak } from "./Screen";
import { Right, Right1, Left } from "./Headers";
import { SafeAreaView, Modal, View, Text, TouchableOpacity,Linking } from "react-native";
import { Icon } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import Settings from "./Settings"
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage from 'react-native-flash-message'

const storeData = async (set) => {
  try {
    await AsyncStorage.setItem("Language", "English")
    set('English')
  } catch (e) {
    console.log(e)
  }
}

const getData = async (set) => {
  try {
    const value = await AsyncStorage.getItem('Language')
    if(value == null) {
      storeData(set)
    }else{set(value)}
  } catch(e) {
    console.log(e)
  }
}


export const Context = createContext({})


export default function App() {
  const Stack = createStackNavigator()
  const[word,setword] = useState([])
  const[fav,setfav] = useState(false)
  const[visi,setvisi] = useState(false)
  const[lan,setlan] = useState('English')
  const[code,setcode] = useState('en-GB')
  const[siri,setsiri] = useState('com.apple.ttsbundle.Daniel-compact')
  
  getData(setlan)
  const About = ()=>{
    return(
      <SafeAreaView>
       <Modal animationType='slide' visible={visi}>
        <View style={{alignItems:'flex-start',padding:10,marginTop:22,marginLeft:2}}>
         <Icon name="close-circle-outline" type='ionicon' size={35} onPress={()=>{setvisi(!visi)}}/>
        </View>
        <View style={{padding:10}}>
        <Text style={{fontSize:RFPercentage(2.5),padding:5}}>Bible memorisation is a great foundation of a great ministry.</Text>
        <Text style={{fontSize:RFPercentage(2.5),padding:5}}>- Dag Heward-Mills.</Text>
        <Text style={{fontSize:RFPercentage(2.5),padding:5}}>All the scriptures in this app are from the Bible memoristion handbook by Dag Heward-Mills.</Text>
        <Text style={{fontSize:RFPercentage(2.5),padding:5}}>Find out more about Dag Heward-Mills at</Text>
        <TouchableOpacity onPress={()=>{Linking.openURL('https://www.daghewardmills.org')}}>
         <Text style={{fontSize:RFPercentage(3),color:'#0ea7eb',padding:5,textDecorationLine:'underline'}}>www.daghewardmills.org</Text>
        </TouchableOpacity>
        <Text style={{fontSize:RFPercentage(2.2),marginTop:10,color:'#666666',padding:5}}>Developed by: Patrick Essiam</Text>
        <Text style={{fontSize:RFPercentage(2.2),color:'#666666',marginLeft:5}}>David Adlai Nettey</Text>
        <Text style={{fontSize:RFPercentage(2.2),color:'#666666',padding:5,marginTop:10}}>Email: pat.essiam701@gmail.com</Text>
        <Text style={{fontSize:RFPercentage(2.2),color:'#666666',marginLeft:5}}>netteydavid8@gmail.com</Text>
        <Text style={{fontSize:RFPercentage(2.2),color:'#666666',padding:5,marginTop:10}}>Number: +233 54 352 8772</Text>
        <Text style={{fontSize:RFPercentage(2.2),color:'#666666',marginLeft:5}}>+233 55 090 3238</Text>
        </View>
       </Modal>
      </SafeAreaView>
    )
  }
  
  return (
    <NavigationContainer onStateChange={()=>{Speak()}}>
     <Context.Provider value={{word,setword,fav,setfav,lan,setlan,code,setcode,siri,setsiri}}>
      <Stack.Navigator screenOptions={{headerTitleStyle:{color:"white"},headerTintColor:"white",headerBackTitleVisible:false,headerStyle:{backgroundColor:"#3F51B5"}}}>
        <Stack.Screen name="Menu" options={{title:'Must Know Scriptures',headerTitleAlign:"center",headerLeftContainerStyle:{margin:8},headerLeft:()=> <Left vis={visi} set={setvisi}/>,headerRightContainerStyle:{margin:8},headerRight:()=> <Right1/>}} component={Home}/>
        <Stack.Screen name="View" options={{title:'Must Know Scriptures',headerRightContainerStyle:{margin:8},headerRight:()=><Right verse={word} set={setword}/>}} component={Screen}/>
        <Stack.Screen name="Settings" options={{title:'Settings'}} component={Settings}/>
      </Stack.Navigator>
     </Context.Provider>
     <About/>
     <FlashMessage position="bottom" floating={true}/>
    </NavigationContainer>
  );
}

