import React, { Component, PropTypes } from 'react';
import { StyleSheet,Text, TextInput, View, Button, TouchableOpacity,Image} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Main from './Main'
import TimePicker from 'react-native-24h-timepicker';       
var todayDate =  new Date();
  export default class Details extends React.Component{
  constructor(props) {
    super(props); 
    this.state = {
      isDateTimePickerVisible: false,
      date:"",
      res:'',
      time:'',
    };
  }

  static navigationOptions = {  
    title: 'Empty',  
    headerStyle: {  
        backgroundColor: '#1EB8A7',  
    },
    headerTintColor:'#fff',
    time:'',

  };
  onChange = time => this.setState({ time })
  onCancel() {
    this.TimePicker.close();
  }
 
  onConfirm(hour, minute) {
    this.setState({ time: `${hour}:${minute}` });
    this.TimePicker.close();
  }
 
  dateListener(){
    console.log(this.date);
  }
    render(){
        const { navigation } = this.props;  
       
        const name = navigation.getParam('name'); 
        const index = navigation.getParam('index');       
  
        console.log("Detailed Name",index);
        console.log("KeyValueD ", index);

        return(
        
            <View style={styles.container}>
            <View style={{textAlign:'center'}} >
                <Text style={{textAlign:'center',fontSize:25}} >vnjdfg</Text>
            </View>
              <TextInput
                multiline={true}
                numberOfLines={10}
                style={{ height:100,marginTop:10,
                textAlignVertical: 'top',
                backgroundColor:'#808080',
                borderWidth:4,borderRadius:5,borderColor:"#BDD9D6"}}/>
        {/* <View style={{flexDirection:'row'}}> */}
             <DatePicker
                        style={{width: 200 , padding:18}}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate={todayDate}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                          },
                          dateInput: {
                            marginLeft: 36,
                            borderRadius:5,
                          }
                        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
      <View style={{flexDirection:'row',paddingLeft:18}} >
       <Image  style={{width: 30, height: 30 }} source={require('./Images/timer.png')} />
        <TouchableOpacity
          onPress={() => this.TimePicker.open()}
          style={{borederWidth:1 , marginLeft:5}}>
       <Text placeholder="select date" style={{borderWidth:2,borderColor:'#B0B0B0',height:35,borderRadius:5,
       width:130,textAlign:'center',justifyContent:'center',fontSize:16}}  >{this.state.time}</Text>       
        </TouchableOpacity>
        <TimePicker
          ref={ref => {
            this.TimePicker = ref;
          }}
          onCancel={() => this.onCancel()}
          onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
        />
        </View>
        <View style={{alignItems:'center',marginTop:30 }} >
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Main')} title="Add" style={styles.submitButton}>
            <Text style = {{color:'white' , textAlign:'center',fontSize:20,marginTop:10  }}> Save </Text>
            </TouchableOpacity>
            </View>
          </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    submitButton: {
        backgroundColor: '#7EC4E1',
        margin:10,
        width:90,
        height: 50,
        borderRadius:5
     },
  });
