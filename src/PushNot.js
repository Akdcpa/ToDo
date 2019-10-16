
import React , {Component} from 'react'
import {View , AppState,Picker} from 'react-native'
import PushNotification from 'react-native-push-notification'

import PushControl from './PushControl'

export default class PushNot extends React.Component{

    constructor(props){
        super(props);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.state={
            seconds:1,
        }
    }
    componentDidMount(){
        AppState.addEventListener('change' , this.handleAppStateChange);
    }  
    componentWillUnmount(){
        AppState.removeEventListener('change' , this.handleAppStateChange);
    }

    handleAppStateChange(appState){
        if(appState === 'background'){
            
            PushNotification.localNotificationSchedule({

                message:'App run in background',
                date:new Date(Date.now()+(this.state.seconds*1000))
            })
        }
    }
    render(){
        return(
            <View>
                <Picker selectedValue={this.state.seconds} 
                onValueChange={(seconds)=>this.setState({seconds})}>

                    <Picker.Item label = '5' value={5}/>
                    <Picker.Item label = '10' value={10}/>
                    <Picker.Item label = '15' value={15}/>
                </Picker>
                <PushControl/>
            </View>
        );
    }
}
