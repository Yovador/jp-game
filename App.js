import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Button, Image } from 'react-native';
import CameraAcces from './components/CameraAcces';
import styles from './AppStyles'
import RandomColor from './components/RandomColor/RandomColor';
import GetAverage from './components/ColorPicker';


export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      appState: 0,                   //État de l'app. 0: Menu principal, 1: Dans le jeu
      backgroundColor: "#6ecff0",      //Couleur de Fond
      photo : null
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

  GetPhoto = (photo) => {
    console.log("GetPhoto")
    this.setState({photo: photo})
  }
  
  ResetPhoto = () => {
    this.setState({photo: null})
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
          <RandomColor ResetPhoto= {this.ResetPhoto} colorToTest = { this.state.photo != null ? GetAverage(this.state.photo.uri, this.state.heigth, this.state.width) : null }  changeBGC={this.ChangeBackgroundColor} />
          <CameraAcces SendPhoto = {this.GetPhoto}> </CameraAcces>
        </View>
      )

    }
  }
}

