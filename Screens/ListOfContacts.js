import React, { Component } from 'react';
import { View, Text, Alert, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Axios from 'axios';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

export default class ListOfContacts extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <Text style={{ fontSize: 24, fontWeight: '800', color: 'black' }}>List of Contacts</Text>,
            headerRight: navigation.getParam('renderCart')
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            cartItems:[],
            isLoading: false,
        };
    }
    _storeData = async (keyOfSavedItem, valueToBeSaved) => {
        try {
            await AsyncStorage.setItem(keyOfSavedItem, JSON.stringify(valueToBeSaved));
        } catch (e) {
            Alert.alert("Error", e);
        }
    }
    _getData = async (keyToBeRetrieved) => {
        try {
            let value = await AsyncStorage.getItem(keyToBeRetrieved);
            if (value !== null && value !== []) {
                //console.warn(JSON.parse(value));
                const returnedValue = JSON.parse(value);
                // console.warn(JSON.stringify(returnedValue['_55'], null, 2));
                return  returnedValue;
            }
        } catch (e) {
            Alert.alert("Error", e);
        }
    }
    _renderCart = () => {
        let cartItems = this.props.navigation.getParam('cartItems');
        return (
            <TouchableOpacity style={{ paddingRight: 12, width: 50, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('Cart',{cartItems: this.state.cartItems})}>
                <Icon name="shopping-cart" color="#59009A" size={32} style={{ zIndex: -10 }} />
                {cartItems.length > 0 &&
                    <View style={{ width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', position: 'absolute', zIndex: 10, top: 0, }}>
                        <Text style={{ fontSize: 12, color: "white", fontWeight: "800" }}>{cartItems.length}</Text>
                    </View>
                }
            </TouchableOpacity>
        )
    }
    componentDidMount() {
        //AsyncStorage.removeItem('cartItems');
        const cartFromStorage = this._getData('cartItems');
        this.setState({ isLoading: true, cartItems: cartFromStorage });
        this.props.navigation.setParams({ renderCart: this._renderCart, cartItems: cartFromStorage });
        Axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                this.setState({ isLoading: false, users:response.data });
                //this.props.navigation.setParams({cartItems: this.state.cartItems["_55"]});
                console.warn(JSON.stringify(this.state.cartItems["_55"], null, 2));
            })
            .catch(error => {
                this.setState({ isLoading: false })
                Alert.alert('Error', error);
            })
    }
    componentWillUnmount(){
        this._storeData('cartItems',this.state.cartItems);
    }
    _renderLine = (label, value) => {
        return (
            <View style={styles.lineContainer}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
        )
    }
    _addToCart = (user) => {
        let currentCart = this.state.cartItems.length>0? [...this.state.cartItems]:[];
        let isIncluded = this.state.cartItems.length>0? this.state.cartItems.some((item)=> item.id == user.id):false;
        if (!isIncluded) {
            currentCart.push(user);
            this.props.navigation.setParams({ cartItems: currentCart });
            this._storeData('cartItems', currentCart);
            this.setState({ cartItems: currentCart });
            Alert.alert('Confirmation', 'User ' + user.name + ' is added to cart Successfully..'); 
        }
        else if (isIncluded) {
            Alert.alert('Repeated Error', 'User ' + user.name + ' is already in Cart !!!');
        }
        else {
            Alert.alert('Error', 'Error during adding user to cart :(');
        }
    }
    _removeFromCart = (user)=>{
        let currentCart = [...this.state.cartItems];
        let cartAfterDelete = currentCart.filter(item=> item.id !== user.id);
        this.props.navigation.setParams({ cartItems: cartAfterDelete });
        this._storeData('cartItems', cartAfterDelete);
        this.setState({cartItems: cartAfterDelete});
        Alert.alert('Confirmation', 'User '+ user.name + ' is removed from cart succsessfully ...');
    }
    _renderContactCard = (user) => {
        let isInCart = (item)=>{
            return item.id === user.id;
        };
        return (
            <View key={user.id} style={styles.cardContainer}>
                {this._renderLine("User ID :", user.id)}
                {this._renderLine("Name :", user.name)}
                {this._renderLine("Email :", user.email)}
                {this._renderLine("Address :", user.address.street + ', ' + user.address.suite + ', ' + user.address.city)}
                {this._renderLine("Phone :", user.phone)}
                {this._renderLine("Website :", user.website)}
                {this._renderLine("Company :", user.company.name)}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => this._addToCart(user)} style={styles.button}>
                        <Text style={styles.buttonText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity disabled={this.state.cartItems.length>0 ? !this.state.cartItems.some(()=>isInCart(user)):true} onPress={() => this._removeFromCart(user)} style={styles.button}>
                        <Text style={styles.buttonText}>remove from cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    render() {
        return (
            <View>
                <Spinner
                    visible={this.state.isLoading}
                    textContent="loading Users"
                    size="large"
                    color="white" />
                <ScrollView contentContainerStyle={styles.mainContainer}>
                    {this.state.users.map(user => this._renderContactCard(user))}
                </ScrollView>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        padding: 12,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContainer: {
        width: Dimensions.get('window').width - 30,
        padding: 10,
        borderRadius: 10,
        shadowColor: 'gray',
        shadowOpacity: 0.7,
        shadowOffset: {
            width: 0,
            height: 0
        },
        elevation: 2,
        marginVertical: 10
    },
    lineContainer: {
        flexDirection: 'row',
        padding: 6,
        alignItems: 'center'
    },
    label: {
        color: 'gray',
        fontSize: 14,
        fontWeight: '600',
        width: 70,
        textAlign: 'left'
    },
    value: {
        color: 'black',
        fontSize: 14,
        fontWeight: '800',
        textAlign: 'left'
    },
    redIndicator: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        position: 'absolute',
        right: 0,
        top: 0,
    },
    indicatorText: {
        fontSize: 12,
        color: "white",
        fontWeight: "800"
    },
    buttonContainer: {
        borderTopColor: "gray",
        borderTopWidth: 1,
        width: Dimensions.get('window').width - 48,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 10
    },
    button: {
        height: 40,
        padding: 8,
        borderRadius: 20,
        borderColor: "#59009A",
        borderWidth: 1
    },
    buttonText: {
        fontSize: 14,
        color: "#59009A"
    }
})