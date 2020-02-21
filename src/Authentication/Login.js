import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text , TouchableOpacity , ImageBackground} from 'react-native';
import Register from './Register'
import Toast from 'react-native-simple-toast'
import Logo from './../Images/back.jpeg'
import Main from '../Main'
import firebase from 'firebase'
import {Base64} from 'js-base64'
import AsyncStorage from '@react-native-community/async-storage'
// import firebase 
export default class Login extends Component {

  static navigationOptions = {  
    title: 'ToDo', 
    headerStyle: {  
        backgroundColor: '#363636',  
    },
    headerLeft:null,

    headerTitleStyle: {
      textAlign: 'center',
      flexGrow:1,
      fontSize:25,
      fontWeight:'bold'
      // alignSelf:'center',
  },
    headerTintColor:'#fff',
  };
constructor(props) {
    super(props)
    this.state = {
      userEmail: '',
      userPassword: '',
      Login_Status:'',
      user_auth_token:'',
    }}
    storeData = async (user_auth_token) => {
      try {
        await AsyncStorage.setItem('Auth_Token', user_auth_token )
      } catch (e) {
        // saving error
      }
    }
    getData = async () => {
      try {
        const value = await AsyncStorage.getItem('Auth_Token')
        if(value !== null) {
          console.log("Async Value" , value)
        }
      } catch(e) {
        console.log(e)
      }
    }
    
    UserLoginFunction = () =>{
      const {userEmail}=this.state;
      const {userPassword}=this.state;

      if(this.state.userEmail===''){
        Toast.show("Enter valid userEmail");
      }
      else{
        if(this.state.userPassword.length<=0){
          Toast.show("Enter Valid Password");
        }
      else{
        try{
          firebase.auth().signInWithEmailAndPassword(userEmail , userPassword)
          .then((res)=>
          {
            this.setState({user_auth_token:res.user.uid});
            this.storeData(res.user.uid);
            this.getData();
            // firebase.database().ref('').once('value' , )
            firebase.database().ref('ToDo/Auth/').child(Base64.encode(userEmail)).set({
                  email:res.user.email,
                  auth_token:res.user.uid,
              }).then((data)=>{ 
                  console.log('data ' , data)
              }).catch((error)=>{  
                  console.log('error ' , error)
              })
                Alert.alert("Login SuccessFull");
              })
           .catch((error)=>{
             if(error.message === "The email address is badly formatted." 
             || error.message==="There is no user record corresponding to this identifier. The user may have been deleted.")
             {
              Alert.alert("Invalid Email"); }
            else if(error.message === "The password is invalid or the user does not have a password."){
               Alert.alert("Password Wrong");
             }  
           })

           this.props.navigation.navigate('Main' , userEmail);
        }
        catch(e){
          console.log(e);
        }
         } 
        }
      }

      _getData(){
          firebase.database().ref('ToDo/Register').child("-M0WBBSdrWcF-dWfQIGQ").orderByChild('email').equalTo("hSH")
        .once('value').then(snapshot=>{
          if(snapshot.val()){
            console.log("Data Exists" , snapshot.val());
          }
        })
      }
    
  render() {
    return (
 <View>  
  <ImageBackground  style={{width:'100%' ,height:'100%'}}>
    <View style={styles.MainContainer} >
    <Text style={{fontSize:30 , fontWeight:'bold' , textAlign:'center' , marginBottom:10}} >Login</Text>
    <View>
        <TextInput
          placeholder="userEmail"
          underlineColorAndroid='black'
          value={this.state.userEmail}
          onChangeText={userEmail=>{this.setState({userEmail})}}
          style={styles.TextInputStyleClass}
          autoCapitalize='none'
          ref={(u) => this._userEmail = u}
        />
        <TextInput
          placeholder="Password"
          underlineColorAndroid='black'
          style={styles.TextInputStyleClass}
          value={this.state.userPassword}
          onChangeText={userPassword=>{this.setState({userPassword})}}
          secureTextEntry={true}
          autoCapitalize='none'
          ref={(u) => this._userEmail = u}
        />
        <TouchableOpacity 
        onPress={this.UserLoginFunction} 
        // onPress={()=>this._insertData(this.state.userEmail , this.state.userPassword)}
        style={{backgroundColor:'#0B6AEC',height:50,borderRadius:30,
       margin:16,textAlign:'center',borderColor:"0B6AEC", justifyContent:'center',fontSize:16}} >
       <Text style={{color:'white' ,fontWeight:'bold' ,fontSize:16, textAlign:'center'}}>Login</Text>       
      </TouchableOpacity>
      </View>
      <View style={{flexDirection:"row" ,justifyContent:'center' , }} >
        <Text style={{fontSize:14 , color:'#363636'}} >Don't have an account?</Text>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')} >
        <Text style={{fontSize:15,fontWeight:'bold' , color:'#363636'}} > Register</Text></TouchableOpacity>
      </View>
      </View>
      </ImageBackground>
   </View>

    );
  }
}
const styles = StyleSheet.create({
 
MainContainer :{
justifyContent:'center',
flex:1,
margin:10,
},
TextInputStyleClass: {
textAlign:'left',
height: 40,
margin:16,
color:'#363636',
},
buttonStyle:{
    margin:16,
},
 TextComponentStyle: {
   fontSize: 20,
  color: "#000",
  textAlign: 'center', 
  marginBottom: 15
 }
});