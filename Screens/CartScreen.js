import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class cartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems:[]
    };
  }

  componentDidMount(){
    const cartItems = this.props.navigation.getParam('cartItems');
    this.setState({cartItems});
    console.warn(JSON.stringify(cartItems))
  }

  render() {
    return (
      <View style = {{flex:1}}>
        {this.state.cartItems.map(item=>{
          return(
            <View style={{width:300, borderWidth:1, borderColor:'black', height:400}}>
            <Text>{item.name}</Text>
          </View>
          )
          
        })}
      </View>
    );
  }
}
