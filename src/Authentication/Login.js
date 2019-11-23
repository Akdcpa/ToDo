import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text , TouchableOpacity , ImageBackground} from 'react-native';
import Register from './Register'
import Toast from 'react-native-simple-toast'
import Logo from './../Images/back.jpeg'
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
      UserPassword: ''
    }}
    _loginButton=()=>{
      if(this.state.UserName===''){
        Toast.show("Enter valid username");
      }
      else{
        if(this.state.UserPassword.length<8){
          Toast.show("Enter Valid Password");
        }
        else{
          this.props.navigation.navigate('Main')
          // this.UserLoginFunction
        }
      }
    }
    UserLoginFunction = () =>{
      const {UserName}=this.state.UserName;
      const {UserPassword}=this.state.UserPassword;
     fetch('http://192.168.137.36/developments/todo/display_data.php', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         name:"cmkdsf",
         password:"cnbdjf",
       })
     }).then((response) => response.json())
           .then((responseJson) => {Alert.alert(responseJson)}).catch((error) => {
             console.error(error);
           });
       }
  render() {
    return (
 <View>  
  <ImageBackground source={Logo} style={{width:'100%' ,height:'100%'}}>
    <View style={styles.MainContainer} >
    <Text style={{fontSize:30 , fontWeight:'bold' , textAlign:'center' , marginBottom:10}} >Login</Text>
    <View>
        <TextInput
          placeholder="Username"
          underlineColorAndroid='black'
          value={this.state.UserName}
          onChangeText={(text)=>this.setState({UserName:text})}
          style={styles.TextInputStyleClass}
        />
        <TextInput
          placeholder="Password"
          underlineColorAndroid='black'
          style={styles.TextInputStyleClass}
          value={this.state.UserPassword}
          onChangeText={(text)=>this.setState({UserPassword:text})}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={this.UserLoginFunction} style={{backgroundColor:'#0B6AEC',height:50,borderRadius:30,
       margin:16,textAlign:'center',borderColor:"0B6AEC", justifyContent:'center',fontSize:16}} >
       <Text style={{color:'white' ,fontWeight:'bold' ,fontSize:16, textAlign:'center'}}>Login</Text>       
      </TouchableOpacity>
      </View>
      <View style={{flexDirection:"row" ,justifyContent:'center' , }} >
        <Text style={{fontSize:14 , color:'#fff'}} >Don't have an account?</Text>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')} >
        <Text style={{fontSize:15,fontWeight:'bold' , color:'#fff'}} > Register</Text></TouchableOpacity>
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
color:'white',
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