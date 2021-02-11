import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Button } from 'react-native';
import CameraAcces from './components/CameraAcces';
import styles from './AppStyles'
import GetPixelColor from 'react-native-get-pixel-color';
import RandomColor from './components/RandomColor/RandomColor';

export default class App extends React.Component {

  constructor(props) {
    super(props)


    this.state = {
      appState: 0,                   //État de l'app. 0: Menu principal, 1: Dans le jeu
      backgroundColor: "#6ecff0"      //Couleur de Fond
    }
  }


  //Change l'État de l'app
  ChangeAppState = (value) => {
    console.log("ChangeAppState", value)
    this.setState({ appState: value })
  }

  //Change La Couleur de Fond
  ChangeBackgroundColor = (value) => {
    console.log("BackgroundColorChange", value)
    this.setState({ backgroundColor: value })
  }


  render() {

    const additionalStyles = { backgroundColor: this.state.backgroundColor }

    if (this.state.appState === 0) {

      return (
        <View style={[styles.container, additionalStyles]}>
          <StatusBar></StatusBar>

          <Text>CATCH THE COLOR</Text>
          <Button title="Start" onPress={() => { this.ChangeAppState(1) }} />

        </View>
      )

    }
    else if (this.state.appState === 1) {

      return (
        <View style={[styles.container, additionalStyles]}>

          <StatusBar></StatusBar>
          <Button title="Menu" onPress={() => { this.ChangeAppState(0) }} />
          <RandomColor changeBGC = {this.ChangeBackgroundColor}/>
          <CameraAcces></CameraAcces>
        </View>
      )

    }
  }
}

 