//Function that fetches and insert all scriptures...//
import { Db } from './Db'
import firebase from 'firebase/app'
import "firebase/firestore"
import { Alert } from 'react-native';
import { showMessage } from 'react-native-flash-message'
import { Retry } from './Retry'


const config = {
    apiKey: "AIzaSyDGtAbNsr1N6ZrNPpIXp4EaCxyDtUtX_Hs",
    authDomain: "mustknow-7378b.firebaseapp.com",
    projectId: "mustknow-7378b",
    storageBucket: "mustknow-7378b.appspot.com",
    messagingSenderId: "617528036411",
    appId: "1:617528036411:web:aae5f790329e5a90e1201e"
}


if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
else {
    firebase.app(); // if already initialized, use that one
}
const db = firebase.firestore()

//Function that Inserts function...
const Insert = (arr)=>{
    for(let [key,value] of Object.entries(arr)){
      Db.transaction(tx=>{
        tx.executeSql("insert into English(Verse,Word) values(?,?)",[key,value])
      },null)
    }
}

const Insert1 = (arr)=>{
  for(let [key,value] of Object.entries(arr)){
    Db.transaction(tx=>{
      tx.executeSql("insert into French(Verse,Word) values(?,?)",[key,value])
    },null)
  }
}
//End of Function.....


//Function that fetches Englsih Scripture from Firestore...
export const Fire = ()=>{
  db.collection("English")
  .get()
  .then((querySnapshot) =>{
    querySnapshot.forEach((doc) =>{
      Insert(doc.data())
      showMessage({message:"Downloaded English Scriptures Successfully..."})
    })
  })
  .catch((error)=>{
    Alert.alert("Oops!",
    "Sorry, English scriptures were not downloaded. Please check your internet connection or send an email to udolgc.dev@gmail.com to report this issue.",[
     {text:"Retry",onPress:()=> Retry() },{text:"Cancel"}
    ])
  })
}
//End of function....

//Function that fetches French Scripture from Firestore...
export const Fire1 = ()=>{
  db.collection("French")
  .get()
  .then((querySnapshot) =>{
    querySnapshot.forEach((doc)=>{
      Insert1(doc.data())
      showMessage({message:"Downloaded French Scriptures Successfully..."})
    })
  })
  .catch((error)=>{
    Alert.alert("Oops!",
    "Sorry, French scriptures were not downloaded. Please check your internet connection or send an email to udolgc.dev@gmail.com to report this issue.",[
     {text:"Retry",onPress:()=> Retry()} ,{text:"Cancel"}
    ])
  })
}
//End of function....
  