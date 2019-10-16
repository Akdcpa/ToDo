import {AppRegistry} from 'react-native';
import App from './App';
import Main from './src/Main'
import Details from './src/Details'
import {name as appName} from './app.json';
import {createStackNavigator} from 'react-navigation-stack'
import { createAppContainer  } from 'react-navigation'
const stackNav = createStackNavigator({
        Main:{
            screen:Main,
        },
        Details:{
            screen:Details
        },
},
{
    initialRouteName:"Details",
},
)
const AppContainer  = createAppContainer(stackNav);
export default AppContainer;
AppRegistry.registerComponent(appName, () => AppContainer);
