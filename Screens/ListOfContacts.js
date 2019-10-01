import React, { Component } from 'react';
import { View, Text, Alert, StyleSheet, Dimensions } from 'react-native';
import Axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';

export default class ListOfContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
        users:[],
        isLoading:false
    };
  }
  componentDidMount(){
      this.setState({isLoading:true})
      Axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response=>{
          this.setState({isLoading:false})
          const filteredData = response.data.filter(item=>(item.id) % 2 !== 0);
          this.setState({users:filteredData});
      })
      .catch(error=>{
          this.setState({isLoading:false})
          Alert.alert('Error',error);
      })
  }
  _renderLine=(label,value)=>{
      return(
          <View style={styles.lineContainer}>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.value}>{value}</Text>
          </View>
      )
  }
  _renderContactCard=(user)=>{
      return(
        <View key={user.id} style={styles.cardContainer}>
            {this._renderLine("User ID :",user.id)}
            {this._renderLine("Name :",user.name)}
            {this._renderLine("Email :",user.email)}
            {this._renderLine("Address :",user.address.street+' ,'+user.address.suite+' ,'+user.address.city)}
            {this._renderLine("Phone :",user.phone)}
            {this._renderLine("Website :",user.website)}
            {this._renderLine("Company :",user.company.name)}
        </View>
      )
  }

  render() {
    return (
        <View>
            <Spinner
            visible={this.state.isLoading}
            textContent="loading Users with Odd Id"
            size="large"
            color="white"/>
            <ScrollView contentContainerStyle={styles.mainContainer}>
                {this.state.users.map(user=>this._renderContactCard(user))}
            </ScrollView>
        </View>
      
    );
  }
}
const styles= StyleSheet.create({
    mainContainer:{
        padding:12,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    cardContainer:{
        width:Dimensions.get('window').width-30,
        padding:10,
        borderRadius:10,
        shadowColor:'gray',
        shadowOpacity:0.7,
        shadowOffset:{
            width:0,
            height:0
        },
        elevation:2,
        marginVertical:10
    },
    lineContainer:{
        flexDirection:'row',
        padding:6,
        //marginVertical:6,
        //justifyContent:'center',
        alignItems:'center'
    },
    label:{
        color:'gray',
        fontSize:14,
        fontWeight:'600',
        width:70,
        textAlign:'left'
    },
    value:{
        color:'black',
        fontSize:14,
        fontWeight:'800',
        textAlign:'left'
    }
})
