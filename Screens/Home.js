import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        word:'',
        savedWord:''
    };
  }

  componentDidMount(){
      this._getData();
  }

  _storeData = async (valueToBeSaved) => {
    try {
      await AsyncStorage.setItem('name', valueToBeSaved)
    } catch (e) {
      Alert.alert("Error",e);
    }
  }

  _getData = async () => {
    try {
      const value = await AsyncStorage.getItem('name')
      if(value !== null && value !=='') {
        this.setState({savedWord:value})
      }
    } catch(e) {
        Alert.alert("Error",e);
    }
  }

  _setText=(text)=>{
      this.setState({word:text});
  }
  _resetText=()=>{
      this._storeData('');
      this.setState({word:'', savedWord:''});
  }
  _navigateToList=()=>{
      this.props.navigation.navigate('ListOfContacts');
  }
  _saveToAsyncStorage=()=>{
      if(this.state.word!==''){
        this._storeData(this.state.word);
        Alert.alert("storage success","name saved successfully");
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> Name is: <Text style={styles.word}>{this.state.word? this.state.word:this.state.savedWord}</Text></Text>
        <TextInput
            style={styles.textInput}
            value={this.state.word}
            onChangeText={(text)=>this._setText(text)}/>
        <View style={styles.buttonContainer}>
            <View style={{width:125}}>
                <Button color="green" title="Save" onPress={()=>this._saveToAsyncStorage()}/>
            </View>
            <View style={{width:125}}>
                <Button color="blue" title="Reset" onPress={()=>this._resetText()}/>
            </View>
        </View>
        <Button title="Call API" onPress={()=>this._navigateToList()}/>
      </View>
    );
  }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center',
        width:Dimensions.get('window').width
    },
    text:{
        fontSize:20,
        fontWeight:'400',
        minWidth:250
    },
    word:{
        fontSize:20,
        fontWeight:'800',
        color:'red'
    },
    buttonContainer:{
        flexDirection:"row",
        justifyContent:'space-around',
        alignItems:'center',
        height:40,
        width:300
    },
    textInput:{
        borderRadius:10,
        height:40,
        backgroundColor:'gray',
        minWidth:250
    }
})