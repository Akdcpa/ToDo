
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Main from './src/Main'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Details from './src/Details';
export default class App extends React.Component{
  render(){
    return(
      <Register/>
      // <Details/>
    );
  }
}
const styles = StyleSheet.create({
});
