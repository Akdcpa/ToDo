import React , {Component} from 'react'
import {Text , View , FlatList, StyleSheet,TextInput ,Image ,Alert ,TouchableOpacity,Button } from 'react-native'
import Details from './Details'
import Swipeout from 'react-native-swipeout'
import Toast from 'react-native-simple-toast' 
import PushNotification from 'react-native-push-notification'
import Realm from 'realm' 
import moment from 'moment'
import Delete from '../Images/Delete.png'
import Edit from '../Images/Edit.png'
import {insertNewTodoList , queryAllTodoLists , deleteTodoList} from '../databases/allSchemas'
import realm from '../databases/allSchemas'
class FlatListItem extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
      };
    //   const {name} = this.props;
    }
    showDeleteConfirmation = () => {
      Alert.alert(
          'Delete',
          'Delete Task '+this.props.items.name,
          [
              {
                  text: 'No', onPress: () => {
                   },//Do nothing
                  style: 'cancel'
              },
              {
                  text: 'Yes', onPress: () => {
                    deleteTodoList(this.props.items.id).then(
                        console.log("Delete Succces")
                    ).catch(error => {
                        alert(`Failed to delete todoList with id = ${this.props.items.id},
                         error=${error}`);
                    }),PushNotification.cancelLocalNotifications({id:this.props.items.id})
                  }
              },
          ],
          { cancelable: true }
      );
  }; 
    render() {
      return (
        <View style={{backgroundColor:'#fff' , margin:15}} >
             <Swipeout style={{backgroundColor:'#fff'}}  right={[
              {
                component:(
                    <View style={{flex:1,justifyContent:"center" , alignItems:'center'}} >
                        <Image style={{width:40,height:40}} source={Edit} ></Image>
                    </View>
                    ) ,
                  backgroundColor: '#fff',
                  onPress:this.props.onPressEdit
              },
              
              {
                  component:(
                  <View style={{flex:1,justifyContent:"center" , alignItems:'center'}} ><Image style={{width:40,height:40}} source={Delete} ></Image></View>) ,
                  backgroundColor: '#fff',
                  onPress: this.showDeleteConfirmation
              }
          ]} autoClose={true}>
              <TouchableOpacity onPress={()=>{
                  Alert.alert(
                    'Task: '+this.props.items.name,
                    // <Text>kffrr</Text>,
                    // 'Creation Date: '+JSON.stringify(this.props.items.creationDate).slice(1,11),
                    // 'Due Date: '+this.props.items.duedate,
                    [
                        {
                            text: 'Ok', onPress: () => {
                             },//Do nothing
                        },
                    ],
                );
              }} >
                  <View style={{margin:15 }}> 
                      <View  style={{ 
                         height: 40,
                         // fontSize:16,
                         borderColor: '#E68981',
                        //  borderWidth: 2.3, 
                         justifyContent:'center',
                         }} >
                         <Text style={{alignItems:'center',fontSize:16}} >{this.props.items.name}</Text>
                         </View>
                         {/* <View style={{flexDirection:'row'}} > */}
                      <Text style={{ fontSize:8,textAlign:'left'}} >Creation: {this.props.items.creationDate.toLocaleString()}</Text>
                       <Text style={{ fontSize:8,textAlign:'left',flex:1,justifyContent:'flex-end'}}>DueDate: {this.props.items.duedate.toLocaleString()}</Text>
                      {/* </View> */}
                  </View>
              </TouchableOpacity>
          </Swipeout >
        </View>
      );
    }
  }
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
         newDataValue:[],
         valueState:true,
         todoLists:[],
         data:[1,2,3],
      } 
    this.reloadData();
    realm.addListener('change',()=>{
        this.reloadData();
    })
    }  
    reloadData = () => {
        queryAllTodoLists().then((todoLists) => {
            this.setState({ todoLists });
        }).catch((error) => {
            this.setState({ todoLists: [] });
        });
        console.log(`reloadData`);
    }
    renderSeperator=()=>{
        return(
            <View style={{height:1,width:"40%" , backgroundColor:"#fff"}} />
        )
    } 
    componentDidMount(){
    }
    _submitButton=()=>{ 
    if(this.state.text!=''){
    this.props.navigation.navigate('Details' , {name:this.state.text});
    }
    if(this.state.text===''){
        Toast.show("Type anything")
}
    this.setState({text:''})
    }
    render(){
        return(
        <View style={styles.container} > 
            <TextInput placeholder="AddTask" 
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
                     <FlatList
                     data={this.state.todoLists}
                     keyExtractor={(ind)=>ind}
                     renderItem={({item,index}) => 
                      
                     <FlatListItem items={item}
                     onPressEdit={
                       ()=>this.props.navigation.navigate('Details',{name:item.name,isEdit:true,items:item}
                       )
                     }
                     />
                                       
                    } 
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
                height: 80,
                fontSize:16,
                backgroundColor:'#ffffff',
                borderColor: '#767474',
                borderWidth: 2.0,
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
                // backgroundColor: '#7EC4E1',
                backgroundColor:'rgba(0, 0, 0, 0) -webkit-linear-gradient(left, rgb(148, 115, 221) 0%, rgb(26, 201, 228) 100%) repeat scroll 0% 0%',
                margin:10,
                // padding:10,
                width:90,
                height: 50,
                borderRadius:5
             },
             rightButton: {
                width: 100,
                height: 37,
                position: 'absolute',
                bottom: 8,
                right: 2,
                padding: 8
              },
});
