import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

export default class cartScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Text style={{ fontSize: 24, fontWeight: '800', color: 'black' }}>Cart Screen</Text>,
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      cartItems: []
    };
  }

  componentDidMount() {
    const cartItems = this.props.navigation.getParam('cartItems');
    this.setState({ cartItems });
  }

  _renderUserCard=(user)=>{
    return(
      <View key={user.id} style={styles.cardContainer}>
        <Text style={styles.label}>User Name:      <Text style={styles.name}>{user.name}</Text></Text>
        <Text style={styles.label}>User Id:      <Text style={styles.name}>{user.id}</Text></Text>
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, padding:12, justifyContent:'center', alignItems:'center' }}>
        {this.state.cartItems.length>0 ? <View style={{flex:1}}>{this.state.cartItems.map(item => this._renderUserCard(item))}</View>: <Text style={{color:'black', fontWeight:'800', fontSize:32}}>Cart is Empty</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer:{
    width:Dimensions.get('window').width - 24, 
    height:70, 
    flexDirection:'column', 
    justifyContent:'space-evenly', 
    alignItems:'center', 
    backgroundColor:'white', 
    borderRadius:10, 
    shadowColor:'gray', 
    shadowOpacity:0.7, 
    shadowOffset:{width:0, height:0}, 
    elevation:2,
    marginVertical:8
  },
  label:{
    color:'gray',
    fontSize:14
  },
  name:{
    color:'#59009A',
    fontSize:20
  }
})