import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { FontAwesome, MaterialIcons ,MaterialCommunityIcons } from '@expo/vector-icons';


export default class App extends React.Component {
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.back,
  }

  async componentDidMount() {
    this.getPermissionAsync()
  }

  getPermissionAsync = async () => {
    // permission pour l'appareil photo d'iphone
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Désolé nous avon sbesoins de votre permission pour fonctionner');
      }
    }
    // permission de l'appareil photo
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }

  //pour switcher le côter de l'appareil photo
  handleCameraType=()=>{
    const { cameraType } = this.state

    this.setState({cameraType:
      cameraType === Camera.Constants.Type.back
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back
    })
  }
  //pour prendre la photo
  takePicture = async () => {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
  }

  onPictureSaved = photo => {
    console.log(photo);
  } 

  //pour trouver une photo dans sa galerie
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });
    
    console.log(result)
  }
  

  render(){
    const { hasPermission } = this.state
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>Accès à l'appareil photo refuser</Text>;
    } else {
      return (
          <View style={styles.container}>
            <Camera style={styles.camera} type={this.state.cameraType}  ref={ref => {this.camera = ref}}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent'                 
                  }}
                  onPress={()=>this.pickImage()}>
                  <MaterialIcons name="photo-library" size={40} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}
                  onPress={()=>this.takePicture()}
                  >
                  <FontAwesome
                      name="camera"
                      style={{ color: "#fff", fontSize: 40,justifyContent:"space-between"}}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}
                  onPress={()=>this.handleCameraType()}
                  >
                  <MaterialCommunityIcons
                      name="camera-switch"
                      style={{ color: "#fff", fontSize: 40,justifyContent:"space-between"}}
                  />
                </TouchableOpacity>

              </View>
            </Camera>
        </View>
      );
    }
  }
  
}


const takePicture = async () => {
  if (this.camera) {
      const options = {quality: 1, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log(data);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"space-between",
  },
  camera: {
    flex: 1,
    justifyContent:"space-between",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 100,
    justifyContent:"space-between",
  

  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
