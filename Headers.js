import React from "react";
import { Icon } from "react-native-elements";
import { shuffle } from "./Shuffle";
import { useNavigation } from '@react-navigation/native'


export const Right = ({set,verse})=>{
    return(
      <Icon style={{opacity:10}} onPress={()=>{shuffle(verse);set([...verse])}} name="shuffle" size={30} color="white" type='ionicon'/>
    )
}

export const Left = ({set,vis})=>{
    return(
       <Icon style={{opacity:10}} onPress={()=>{set(!vis)}} name='information-circle-outline' type='ionicon' size={30} color='white'/>
    )
}

export const Right1 = ()=>{
  const nav = useNavigation()
  return(
     <Icon onPress={()=>{nav.navigate('Settings')}} style={{opacity:10}}  name='settings-outline' type='ionicon' size={26} color='white'/>
  )
}
