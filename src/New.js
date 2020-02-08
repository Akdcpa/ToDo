// // import React, {Component} from "react";
// // import PushNotification from "react-native-push-notification";
// // // var PushNotification = require("react-native-push-notification");

// // export default class New extends Component{
// //     componentDidMount(){
// //         PushNotification.configure({
// //             onNotification: function(notification) {
// //               console.log("NOTIFICATION:", notification);
// //             },
// //           });
// //     }

// //     render(){
// //         return null;
// //     }
// // }

// import React, { Component } from "react";
// import { Platform, StyleSheet, Text, SafeAreaView, View } from "react-native";
// import { ListItem } from "react-native-elements";
// import firebase from "react-native-firebase";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import moment from "moment";
// import TimePicker from 'react-native-24h-timepicker';    

// class New extends React.Component{
//   constructor(props) {
//     super(props)
  
//     this.state = {
//       date: new Date('2020-06-12T14:42:42'),
//       mode: 'date',  
//       dueTime:'',
//        notificationTime:'',
//        enableNotification:'',
//        isDateTimePickerVisible:true,
//        notificationTime:''

//     }
//   }
  
//   componentDidMount() {
//     this.setReminder();
//   }

//   setDate = (event, date) => {
//     date = date || this.state.date;

//     this.setState({
//       show: Platform.OS === 'ios' ? true : false,
//       // date,
//     });
//   }


  
//   setReminder = async () => {
//     // const { notificationTime, enableNotification } = this.state;
    
//     if (enableNotification) {
//       // schedule notification       
//       firebase.notifications().scheduleNotification(this.buildNotification(), {
//         fireDate: notificationTime.valueOf(),
//         repeatInterval: 'day',
//         exact: true,
//       });
//     } else {
//       return false;
//     }
//   };
  
//   buildNotification = () => {
//     const title = Platform.OS === "android" ? "Daily Reminder" : "";
//     const notification = new firebase.notifications.Notification()
//       .setNotificationId("1") // Any random ID
//       .setTitle(title) // Title of the notification
//       .setBody("This is a notification") // body of notification
//       .android.setPriority(firebase.notifications.Android.Priority.High) // set priority in Android
//       .android.setChannelId("reminder") // should be the same when creating channel for Android
//       .android.setAutoCancel(true); // To remove notification when tapped on it
//       return notification;
//   };
  
//   enableNotification = value => {
//     this.setState({
//       enableNotification: value
//     });
//   };
//   showDateTimePicker = () => {
//     this.setState({ isDateTimePickerVisible: true });
//   };
//   hideDateTimePicker = () => {
//     this.setState({ isDateTimePickerVisible: false });
//   };
//   handleDatePicked = date => {
//     this.hideDateTimePicker();
//     this.setState({
//       notificationTime: moment(date)
//     });
//   };
//   onConfirm(hour, minute) {
//     this.setState({ notificationTime: `${hour}:${minute}` });
//     this.TimePicker.close();
//   }
//   onCancel() {
//     this.TimePicker.close();
//   }

//   render() {

//     const { enableNotification, isDateTimePickerVisible, notificationTime } = this.state;
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.cardTitleView}>
//           <Text style={styles.cardTitle}>Add Reminder</Text>
//         </View>
//         <ListItem
//           title="Notification"
//           bottomDivider
//           titleStyle={styles.titleStyle}
//           switch={{ onValueChange: this.enableNotification, value: enableNotification }}
//          />
//         <ListItem
//           title="Time"
//           titleStyle={styles.titleStyle}
//           onPress={()=>this.TimePicker.open()}
//           rightElement={<Text style={{ opacity: 0.7 }}>{moment(notificationTime).format('LT')}</Text>}
//          />
//         {/* <DateTimePicker
//           isVisible={isDateTimePickerVisible}
//           onConfirm={this.handleDatePicked}
//           onCancel={this.hideDateTimePicker}
//           mode="date" // show only time picker
//           is24Hour={false}
//           date={new Date(notificationTime)}
//           value={date}
//           onChange={this.setDate}
//           titleIOS="Pick your Notification time"
//         /> */}
//           <TimePicker
//           ref={ref => {
//             this.TimePicker = ref;
//           }}
//           onCancel={() => this.onCancel()}
//           onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
//           // onConfirm={this.handleDatePicked}
//         />
//       </SafeAreaView>
//     );
//   }
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#EEEFF0"
//   },
//   cardTitleView: {
//     paddingHorizontal: 15,
//     paddingTop: 15,
//     paddingBottom: 8
//   },
//   cardTitle: {
//     fontSize: 15,
//     color: "#585858",
//     fontWeight: "600"
//   },
//   titleStyle: {
//     fontSize: 20,
//     color: "#585858"
//   }
// });

// export default New;

import React, {Fragment,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import firebase from 'react-native-firebase';

class New extends React.Component {

  componentDidMount(){
    this.checkPermission();
    this.messageListener();
  }

  getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      this.showAlert('Your Firebase Token is:', fcmToken);
    } else {
      this.showAlert('Failed', 'No token received');
    }
  }

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getFcmToken();
    } else {
        this.requestPermission();
    }
  }
  
  // useEffect=( () => {
    // this.checkPermission();
    // this.messageListener();
  // }, []);

 

 
  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
    } catch (error) {
        // User has rejected permissions
    }
  }

  messageListener = async () => {

    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        this.showAlert(title, body);
    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    });
  
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    }

    this.messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });
  }

  showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }


  render(){
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step One</Text>
                <Text style={styles.sectionDescription}>
                  Edit <Text style={styles.highlight}>App.js</Text> to change this
                  screen and then come back to see your edits.
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>See Your Changes</Text>
                <Text style={styles.sectionDescription}>
                  <ReloadInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Debug</Text>
                <Text style={styles.sectionDescription}>
                  <DebugInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Learn More</Text>
                <Text style={styles.sectionDescription}>
                  Read the docs to discover what to do next:
                </Text>
              </View>
              <LearnMoreLinks />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
    
  }
  
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default New;