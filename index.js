import {AppRegistry} from 'react-native';
import App from './App';
import Main from './src/Main'
import Details from './src/Details'
import {name as appName} from './app.json';
import Login from './src/Authentication/Login';
import Register from './src/Authentication/Register';
import {createStackNavigator} from 'react-navigation-stack'
import { createAppContainer  } from 'react-navigation'
import Splash from './src/Splash'
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
},
{
    initialRouteName:"Main",
},
)
const AppContainer  = createAppContainer(stackNav);
export default AppContainer;
AppRegistry.registerComponent(appName, () => AppContainer);
