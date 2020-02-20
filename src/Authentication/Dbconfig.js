import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase'
import { Button , TouchableOpacity } from 'react-native';
export default class Dbconfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount(){
    var firebaseConfig = {
        apiKey: "AIzaSyBLXPzQ6_czRif1OGLcspFpKrpOAzUvzKg",
        authDomain: "todo-f3686.firebaseapp.com",
        databaseURL: "https://todo-f3686.firebaseio.com",
        projectId: "todo-f3686",
        storageBucket: "todo-f3686.appspot.com",
        messagingSenderId: "41597844625",
        appId: "1:41597844625:web:d6f956cd3a16a92539d330",
        measurementId: "G-D7QC32Y2P1"
      }; 
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    console.log("Response :" , firebase );
  }
  writeUserData(email1,id1,mobile1,password1){
    firebase.database().ref('Register/001').push({
        email:email1,
        id:id1,
        mobile :mobile1 , 
        password:password1
    }).then((data)=>{
        //success callback
        console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
}
readUserData() {
    firebase.database().ref('Register/001/').once('value',(data)=> {
        console.log("Data" , data.toJSON())
    });
}
  render() {
  
    return (
      <View>
          <TouchableOpacity
            // onPress={()=>this.writeUserData("ak11@gmail" , 2 , "1231234" , "134")} 
            onPress = {()=>this.readUserData()}
            >
          <Text>Click</Text>
        </TouchableOpacity> 
      </View>
    );
  }
}
