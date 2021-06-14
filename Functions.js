import { Alert } from "react-native";
import { Db } from "./Db";
import { Fire, Fire1 } from "./Firedb"
import { showMessage } from 'react-native-flash-message'

export const Create1 = (set) =>{
  set(true)
  Db.transaction(tx=>{
    tx.executeSql('select * from English',[],(_,row)=>{
      const Docs = row.rows._array
      if(Docs.length === 0){
        Fire()
        Fire1()
      }
    })
  },(_,err)=> alert(err),()=>set(false))
}

export const Script = (set) =>{
  set(true)
  Fire()
  Fire1()
  set(false)
}

export const Create = (set) =>{
    set(true)
    Fire()
    Fire1()
    set(false)
}
//......Function to select Favourite Scripture.......//
export const Setfav = (verse,lan)=>{
    Db.transaction(tx=>{
        tx.executeSql("Update "+"'"+lan+"'"+" set Fav='Yes' where Verse="+"'"+verse+"'",[],(_)=>{
            Alert.alert("Must Know Scriptures","Scipture added to Favourites.")
        })
    },(_,err)=>{Alert.alert("Musk Know Scriptures","Unable to set Scriptures as favourites.")})
  }
//..............End........//
  
//......Function to select n unselect Favourite Scripture.....//
  export const Unmark = (word,nav,lan)=>{
    const navigation = nav
    Db.transaction(tx=>{
      tx.executeSql("Update "+"'"+lan+"'"+" set Fav='No' where Verse="+"'"+word+"'"+"AND Fav='Yes'",[],(_)=>{
          Alert.alert("Must Know Scriptures","Scripture removed from Favourites.",[{text:"Ok",onPress:()=>{navigation.navigate('Menu')}}])
      })
    },(_,err)=>{Alert.alert("Musk Know Scriptures","Unable to Remove Scriptures")})
  }
//........End......//


//....Function for Selecting Verses(for both OLD & NEW TESTAMENT)....//
export const Scripture = (book,navigation,set,fav,set1,lan,load)=>{
  var bok = book+"%"
  showMessage({message:"Loading..."})
    Db.transaction(tx=>{
        tx.executeSql("select * from "+"'"+lan+"'"+" where Verse LIKE "+"'"+bok+"'",[],(_,row)=>{
            const Docs = row.rows._array
            set(Docs)
            if(fav){set1(false)}
            if(Docs.length === 0){Alert.alert("Oops!",
            "Sorry, scriptures were not downloaded. Please check your internet connection or send an email to udolgc.dev@gmail.com to report this issue.",[
              {text:"OK"}
            ])}
            else{navigation.navigate('View')}
        })
    },(_,err)=>{Alert.alert("Oops!",
    "Sorry, scriptures were not downloaded. Please check your internet connection or send an email to udolgc.dev@gmail.com to report this issue.",[
      {text:"Retry",onPress:()=> Create1(load) },{text:"OK"}
    ])})
}
//....End of function......

//..FUNCTION OF OTHERS OPTION(i.e. All & Fav)..//

//.......Function for Selecting All Scriptures............//
export const All = (set,navigation,fav,set1,lan)=>{
  showMessage({message:"Loading..."})
  Db.transaction(tx=>{
    tx.executeSql("select * from "+lan,[],(_,row)=>{
      set(row.rows._array)
      if(fav){set1(false)}
      navigation.navigate('View')
    })
  },(_,err)=>{Alert.alert("Oops!",
  "Sorry, scriptures were not downloaded. Please check your internet connection or send an email to udolgc.dev@gmail.com to report this issue.")})
}
//..........End of Function......
 

//........Function for Selecting Favourite Scriptures........//
export const Fav = (set,navigation,set1,lan)=>{
  showMessage({message:"Loading..."})
    Db.transaction(tx=>{
      tx.executeSql("select * from "+"'"+lan+"'"+" where Fav = 'Yes'",[],(_,row)=>{
        set(row.rows._array)
        set1(true)
        navigation.navigate('View')
      })
    },(_,err)=>{Alert.alert("Oops!",
    "Sorry, scriptures were not downloaded. Please check your internet connection or send an email to udolgc.dev@gmail.com to report this issue.")})
  }
  //......End of function......

//...END....//