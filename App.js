import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native'; 
// import {Details , Main , Splash} from './src/components'
import Details from './src/components/Details'
import Main from './src/components/Main'
import Splash from './src/components/Splash'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import Modal from './src/components/Modal'
import {Image,Alert } from 'react-native'
import Delete from './src/Images/Delete.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {deleteAllTodoLists} from './src/databases/allSchemas'
import PushNotification from 'react-native-push-notification'

const Stack = createStackNavigator();

class App extends React.Component{
    constructor(props) {
      super(props)
    
      this.state = {
         
      };
    };
    
    deletetodolists(){
      Alert.alert(
        'Warning !',
        'Delete All Tasks ',
        [
            {
                text: 'No', onPress: () => {
                 },//Do nothing
                style: 'cancel'
            },
            {
                text: 'Yes', onPress: () => {
                  deleteAllTodoLists().then().catch((error)=>{
                    console.log("Error :" , error)
                  })

                  PushNotification.cancelAllLocalNotifications();
                 
                }
            },
        ],
        { cancelable: true }
    );
    }
  render(){
    return(
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" headerMode="screen">
          <Stack.Screen name="Splash" component={Splash} 
          options={
            {
              headerShown:false,
            } 
          } ></Stack.Screen>
          <Stack.Screen name="Main" component={Main} options={{
           headerLeft:false,
           headerTitleAlign:'center',
           headerTitle:<Text style={{fontWeight:'bold'}} >TODO</Text>,
           headerRight:()=>(
             <TouchableOpacity onPress={
               ()=>this.deletetodolists()
             } >
             <Image style={{width:40,height:40}} source={Delete} ></Image>
             </TouchableOpacity>
             )
          }}  ></Stack.Screen>
          <Stack.Screen name="Details" component={Details} initialParams="Akk"
          options={
            // headerTitle:<Text></Text>,
            
          }
           ></Stack.Screen>
        </Stack.Navigator> 
        
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
});

export default App;
