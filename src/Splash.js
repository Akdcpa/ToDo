import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class Splash extends Component {
    static navigationOptions = {
        header : null   
     };
     componentDidMount(){
         setTimeout(()=>{this.props.navigation.navigate('Login')} , 2500)
     }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize:35, fontWeight:'bold'}} >TODO</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#ffffff',
    },
});