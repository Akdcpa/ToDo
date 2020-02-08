import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text , TouchableOpacity , ImageBackground} from 'react-native';
import Register from './Register'
import Toast from 'react-native-simple-toast'
import Logo from './../Images/back.jpeg'
import Main from '../Main'
import AsyncStorage from '@react-native-community/async-storage'
export default class Login extends Component {

  static navigationOptions = {  
    title: 'ToDo',
    // title:'Register',  
    // headerLeft:<View style={{padding:6}}></View>,
    headerStyle: {  
        backgroundColor: '#363636', 
        // textAlign:'center' 
        // alignContent:'center' ,justifyContent:'center' , alignItems:'center'
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
      UserName: '',
      UserPassword: '',
      Login_Status:'',
    }}
    componentDidUpdate(){
      this.getData();
    }
    storeData = async (authtoken) => {
      try {
        await AsyncStorage.setItem('@AuthToken', authtoken )
      } catch (e) {
        // saving error
      }
    }
    getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@AuthToken')
        if(value !== null) {
          console.log("Async Value" , value)
        }
      } catch(e) {
      }
    }
    
    UserLoginFunction = () =>{
      const {UserName}=this.state;
      const {UserPassword}=this.state;

      if(this.state.UserName===''){
        Toast.show("Enter valid username");
      }
      else{
        if(this.state.UserPassword.length<=0){
          Toast.show("Enter Valid Password");
        }
      else{
        fetch('http://10.42.0.1/developments/todo/Login_Data.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name:UserName,
            password:UserPassword,
          })
        }).then((response) => response.text())
              .then((responseJson) => {
                if(responseJson == 'UserName Wrong'){
                  Toast.show("Invalid username/password")
                }
                else if(responseJson == "PasswordWrong"){
                  Toast.show("Invalid username/password")

                }
                else{
                   this.storeData(responseJson);
                   this.props.navigation.navigate('Main');
                }
              }).catch((error) => {
                console.error(error);
              });
           }
         } 
      }
    
  render() {
    return (
 <View>  
  <ImageBackground  style={{width:'100%' ,height:'100%'}}>
    <View style={styles.MainContainer} >
    <Text style={{fontSize:30 , fontWeight:'bold' , textAlign:'center' , marginBottom:10}} >Login</Text>
    <View>
        <TextInput
          placeholder="Username"
          underlineColorAndroid='black'
          value={this.state.UserName}
          onChangeText={UserName=>{this.setState({UserName})}}
          style={styles.TextInputStyleClass}
          autoCapitalize='none'
          ref={(u) => this._username = u}
        />
        <TextInput
          placeholder="Password"
          underlineColorAndroid='black'
          style={styles.TextInputStyleClass}
          value={this.state.UserPassword}
          onChangeText={UserPassword=>{this.setState({UserPassword})}}
          secureTextEntry={true}
          autoCapitalize='none'
          ref={(u) => this._username = u}
        />
        <TouchableOpacity onPress={this.UserLoginFunction} style={{backgroundColor:'#0B6AEC',height:50,borderRadius:30,
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