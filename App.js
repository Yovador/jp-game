import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Button } from 'react-native';
import RandomColor from './components/RandomColor/RandomColor';
import styles from './AppStyles'

export default class App extends React.Component {

  constructor(props){
    super(props)


    this.state = {
      appState : 0,
      backgroundColor: "#6ecff0"
    }
  }

  ChangeAppState = (value) =>{
    console.log("ChangeAppState", value)
    this.setState({appState: value})
  }

  ChangeBackgroundColor = (value) =>{
    console.log("BackgroundColorChange", value)
    this.setState({backgroundColor: value})
  }

  LoadView = () =>{
    console.log('LoadView', this.state.appState)
    const additionalStyles = {backgroundColor: this.state.backgroundColor}
    if(this.state.appState === 0){

      return (
        <View style={[styles.container, additionalStyles]}>
          <Text>CATCH THE COLOR</Text>
          <Button title="Start" onPress={() => { this.ChangeAppState(1)} }/>
        </View>
      )
    }
    else if(this.state.appState === 1){
      return ( 
        <View style={[styles.container, additionalStyles]}>

          <Button title="Menu" onPress={() => { this.ChangeAppState(0)} }/>

          <RandomColor changeBGC = {this.ChangeBackgroundColor}/>
        </View>
      )
    }
  }


  render(){

    return (
      this.LoadView()
    )
  }
}

