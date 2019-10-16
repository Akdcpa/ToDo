import React , {Component} from 'react'
import {Text , View , FlatList, StyleSheet,TextInput , TouchableOpacity } from 'react-native'
import Details from './Details'
import Toast from 'react-native-simple-toast'
export default class Main extends React.Component {

    constructor(props) {
      super(props)
      this.array=[
      ]
      this.param=0
      this.state = {
         text:'',
         dataValue:[],
         parameter:0,
         buttonDisable:true,
         keyValue:0,
      }
    }
    static navigationOptions = {  
        title: 'Home',  
    headerStyle: {  
        backgroundColor: '#1EB8A7',  
    },  
    headerTintColor:'#fff',
    };  
    renderSeperator=()=>{
        return(
            <View style={{height:1,width:"40%" , backgroundColor:"#fff"}} />
        )
    }
    componentDidMount(){
    this.setState({dataValue:[...this.array]})
    }
    componentDidUpdate(){
        console.log("Key paramater" ,this.state.parameter)
    }
    _submitButton=()=>{
            // datavalue.push(this.text)
            // data
    if(this.state.text!=''){
        this.setState({keyValue:this.state.keyValue+1})
        this.array.push({name:this.state.text ,key:this.state.keyValue })
        this.setState({dataValue:[...this.array]})
    }
    if(this.state.text===''){
        Toast.show("Type anything")
    }
    this.setState({text:''})
    }
    _onPressDetails(itemname ,index1){
        this.props.navigation.navigate('Details',{name:itemname,index:index1})
    }
    render(){

        return(
        <View style={styles.container} >
            <TextInput placeholder="AddList" 
            style={styles.input} 
            value={this.state.text}
            onChangeText={(text)=>this.setState({text})}
            ></TextInput>
            <View style={{alignItems:'center'}} >
            <View style={{justifyContent:'center' }} >
            <TouchableOpacity onPress={this._submitButton} title="Add" style={styles.submitButton}>
            <Text style = {{color:'white' , textAlign:'center',fontSize:20,marginTop:10  }}> Submit </Text>
            </TouchableOpacity>
            </View>
            </View>
                <FlatList data={this.state.dataValue}
                keyExtractor={(index)=>index.toString()}
                renderItem={({item,index}) =>  
                <TouchableOpacity  onPress={()=>{this._onPressDetails(item.name,index);}}  >
                <Text style={styles.input}>{item.name}
                </Text>
                </TouchableOpacity>}  
                ItemSeparatorComponent={this.renderSeparator}  
                    />  
        </View>  
);  
} 
}

 const styles = StyleSheet.create({
            container:{
                flex:1,
                // alignItems:'center'
            },
            item:{
                padding :10,
                fontSize:18,
                height:44
            },
            input: {
                margin: 15,
                height: 60,
                fontSize:16,
                borderColor: '#E68981',
                borderWidth: 2.3,
                borderRadius:8,
                justifyContent:'center',
             },
             flatText:{
                // margin: 15,
                height: 45,
                fontSize:16,
                borderColor: '#D3D0CC',
                borderWidth: 2,
                borderRadius:6,
                marginLeft:12,
                width:"93%"
             },
             submitButton: {
                backgroundColor: '#7EC4E1',
                margin:10,
                // padding:10,
                width:90,
                height: 50,
                borderRadius:5
             },
});

