
import {AppRegistry} from 'react-native';
import App from './App';
import Main from './src/Main'
import Details from './src/Details'
import {name as appName} from './app.json';
import Login from './src/Authentication/Login';
import Register from './src/Authentication/Register';
import New from './src/New'
import {createStackNavigator} from 'react-navigation-stack'
import { createAppContainer  } from 'react-navigation'
import Splash from './src/Splash'
import Index from './src/Index'
import  './src/Authentication/Dbconfig'
const stackNav = createStackNavigator({
        Main:{
            screen:Main,
        },
        Details:{
            screen:Details
        },
        Login:{
            screen:Login
        },
        Register:{
            screen:Register,
        },
        Splash:{
            screen:Splash
        },
        New:{
            screen:New
        },
        Index:{
            screen:Index
        },
        // Dbconfig:{
        //     screen:Dbconfig
        // }
},
{
    initialRouteName:"Main"
},
)
const AppContainer  = createAppContainer(stackNav);
export default AppContainer;
AppRegistry.registerComponent(appName, () => AppContainer);

