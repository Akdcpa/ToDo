import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text , TouchableOpacity , ImageBackground} from 'react-native';
import Logo from './../Images/back.jpeg'
import Login from './Login'
export default class Register extends Component {
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
      userName: '',
      userPassword: '',
      userEmail:'',
    }}

    componentDidUpdate(){
      console.log("UserName",this.state.userName);
      console.log("UserName",this.state.userEmail);
      console.log("UserName",this.state.userPassword);
    }

    UserRegistrationFunction = () =>{
      const { userName }  = this.state;
      const { userEmail }  = this.state;
      const { userPassword }  = this.state;
     fetch('http://10.42.0.1/developments/todo/user_register.php', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         name: userName,
         email: userEmail,
         password:userPassword,
       })
      
     }).then((response) => response.text())
           .then((responseJson) => { 
             Alert.alert(responseJson);
           }).catch((error) => {
             console.error(error);
           });
       }
  render() {
    return (
<View>  
  <ImageBackground  style={{width:'100%' ,height:'100%'}}>
    <View style={styles.MainContainer} >
    <Text style={{fontSize:30 , fontWeight:'bold' , textAlign:'center' , marginBottom:10}} >Register</Text>
    <View>
        <TextInput
          placeholder="Username"
          underlineColorAndroid='363636'
          style={styles.TextInputStyleClass}
          // onChange={(text)=>this.setState({userName:text})}
          onChangeText={userName=>this.setState({userName})}
        />
        <TextInput
          placeholder="Email"
          underlineColorAndroid='363636'
          autoCompleteType='email'
          style={styles.TextInputStyleClass}
          onChangeText={userEmail=>this.setState({userEmail})}

        />
        <TextInput
          placeholder="Password"
          underlineColorAndroid='363636'
          style={styles.TextInputStyleClass}
          onChangeText={userPassword=>this.setState({userPassword})}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={this.UserRegistrationFunction} style={{backgroundColor:'#0B6AEC',height:50,borderRadius:30,
       margin:16,textAlign:'center',borderColor:"0B6AEC", justifyContent:'center',fontSize:16}} >
       <Text style={{color:'white' ,fontWeight:'bold' ,fontSize:16, textAlign:'center'}}>Register</Text>       
      </TouchableOpacity>
      </View>
      <View style={{flexDirection:"row" ,justifyContent:'center' , }} >
        <Text style={{fontSize:14 , color:'#363636'}} >Already have an account?</Text>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')} >
        <Text style={{fontSize:15,fontWeight:'bold' , color:'#363636'}} >Login</Text></TouchableOpacity>
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
margin: 10,
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