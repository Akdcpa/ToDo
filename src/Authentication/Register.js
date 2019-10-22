import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text , TouchableOpacity , ImageBackground} from 'react-native';
import Logo from './../Images/back.jpeg'

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
      UserName: '',
      UserPassword: '',
      UserEmail:'',
    }}
  render() {
    return (
<View>  
  <ImageBackground source={Logo} style={{width:'100%' ,height:'100%'}}>
    <View style={styles.MainContainer} >
    <Text style={{fontSize:30 , fontWeight:'bold' , textAlign:'center' , marginBottom:10}} >Register</Text>
    <View>
        <TextInput
          placeholder="Username"
          underlineColorAndroid='blue'
          style={styles.TextInputStyleClass}
          onChange={(text)=>this.setState({UserName:text})}
        />
        <TextInput
          placeholder="Email"
          underlineColorAndroid='blue'
          autoCompleteType='email'
          style={styles.TextInputStyleClass}
          onChange={(text)=>this.setState({UserEmail:text})}
        />
        <TextInput
          placeholder="Password"
          underlineColorAndroid='blue'
          style={styles.TextInputStyleClass}
          onChange={(text)=>this.setState({UserPassword:text})}
          secureTextEntry={true}
        />
        <TouchableOpacity style={{backgroundColor:'#0B6AEC',height:50,borderRadius:30,
       margin:16,textAlign:'center',borderColor:"0B6AEC", justifyContent:'center',fontSize:16}} >
       <Text style={{color:'white' ,fontWeight:'bold' ,fontSize:16, textAlign:'center'}}>Register</Text>       
      </TouchableOpacity>
      </View>
      <View style={{flexDirection:"row" ,justifyContent:'center' , }} >
        <Text style={{fontSize:14 , color:'white'}} >Already have an account?</Text>
        <TouchableOpacity onPress={()=>this.props.navigation.goBack()} >
        <Text style={{fontSize:15,fontWeight:'bold' , color:'white'}} >Login</Text></TouchableOpacity>
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