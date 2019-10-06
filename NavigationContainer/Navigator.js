import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../Screens/Home';
import ListOfContacts from '../Screens/ListOfContacts';
import Cart from '../Screens/CartScreen'

const screens=createStackNavigator({
    Home: Home,
    ListOfContacts: ListOfContacts,
    Cart: Cart
})

export default createAppContainer(screens);