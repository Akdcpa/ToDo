import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text , TouchableOpacity , ImageBackground} from 'react-native';
import Logo from './../Images/back.jpeg'
import Login from './Login'
import firebase from 'firebase'
export default class Register extends Component {
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
  },
    headerTintColor:'#fff',
  };
constructor(props) {
    super(props)
    this.state = {
      userName: '',
      userPassword: '',
      userEmail:'',
      userMobile:0,
      firebaseReference:'ToDo/Register/',
      response:false,
    }}

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
    }
   
    writeUserData(email1,mobile1,password1,username1){
      if(username1!='' && mobile1.length===10 ){
        firebase.auth().createUserWithEmailAndPassword(email1,password1)
        .then(()=>{
            Alert.alert('Signup successful');
            this.setState({response:true})
            firebase.database().ref(this.state.firebaseReference).push({
              email:email1,
              userName:username1,
              mobile :mobile1 , 
              pass:password1,
          }).then((data)=>{ 
              console.log('data ' , data)
          }).catch((error)=>{  
              console.log('error ' , error)
          })
          })
          
        .catch((error)=> {
            // console.log(error.code);
            console.log(error.message);
            if(error.message === "The email address is badly formatted."){
              Alert.alert("Enter Valid Email")
            }
            else if(error.message === "The email address is already in use by another account."){
              Alert.alert("Email Already taken");
            }
            else if(error.message === "Password should be at least 6 characters"){
              Alert.alert("Password Have max length 6")
            }
          });  
      }
      else{
        Alert.alert("Fill all field");

      }    
      }

  readUserData() {
    firebase.database().ref('ToDo/Register/').once('value',(data)=> {
        console.log("Data" , data.toJSON())
    });
}
    // componentDidUpdate(){
    //   console.log("UserName",this.state.userName);
    //   console.log("UserName",this.state.userEmail);
    //   console.log("UserName",this.state.userPassword);
    // }
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
        <TextInput
          placeholder="Mobile"
          underlineColorAndroid='363636'
          style={styles.TextInputStyleClass}
          onChangeText={userMobile=>this.setState({userMobile})}
        />
        <TouchableOpacity 
        onPress={()=>{this.writeUserData(this.state.userEmail , this.state.userMobile , this.state.userPassword , this.state.userName)}} 
        // onPress={()=>this._authentication("ak11@gmail.com" , '123t6789')}
        style={{backgroundColor:'#0B6AEC',height:50,borderRadius:30,
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

 