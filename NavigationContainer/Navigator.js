import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../Screens/Home';
import ListOfContacts from '../Screens/ListOfContacts'

const screens=createStackNavigator({
    Home:{
        screen: Home,
        navigationOptions: {  
            header:null
        }
    },
    ListOfContacts:{
        screen: ListOfContacts,
        navigationOptions: ({ navigation }) => ({
            title: 'List of Contacts',
        })
    }
})

export default createAppContainer(screens);