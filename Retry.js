import { Fire, Fire1 } from "./Firedb"
import NetInfo from '@react-native-community/netinfo'
import { Alert } from 'react-native'
import { showMessage } from 'react-native-flash-message'

export const Retry = ()=>{
    NetInfo.fetch()
     .then(res=>{
        if(res.isConnected){
          showMessage({message:"Downloading Scriptures..."})
          Fire()
          Fire1()
        }else{
          Alert.alert("Must Know Scriptures","You are Offline. Check your Internet connection.")
        }
    })
}