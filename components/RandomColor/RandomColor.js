import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Color from './Color'



//Création des couleurs
const redColor = new Color("Red", "#f54242", [0, 90, 61], 15)
const blueColor = new Color("Blue", "#2ecbff", [195, 100, 59], 30)
const greenColor = new Color("Green", "#47e32b", [111, 77, 53], 38)
const yellowColor = new Color("Yellow", "#e5e82a", [61, 81, 54], 10)
const purpleColor = new Color("Purple", "#7130c7", [266, 61, 48], 25)

//Toute les couleurs sont stockés dans allColor
const allColor = [redColor, blueColor, greenColor, yellowColor, purpleColor]

//Variable de test de la comparaison
const testRGB = [113, 48, 199]

class RandomColor extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            //Couleur actuel affiché à l'écran
            currentColor: this.ChooseRandomColor(allColor),
            photoTaken: false,
            averagePhotoRGB: [0,0,0]
        }

        //Style de Random color, semblable à du CSS
        this.styles = StyleSheet.create({
            container: {
                padding: '1%'
            }
        })
    }

    ChangeBackgroundColorParent = (value) => {
        this.props.changeBGC(value)
    }

    //Renvoie une couleur aléatoire parmis toute les couleurs possibles.
    ChooseRandomColor = (colorArray) => {
        console.log("ChooseRandomColor")
        const indexColor = Math.floor(Math.random() * colorArray.length)
        console.log(colorArray[indexColor])
        this.ChangeBackgroundColorParent(colorArray[indexColor].backgroundColor)
        return colorArray[indexColor]
    }

    GenerateNewColor = () => {
        console.log("GenerateNewColor")
        this.setState({ currentColor: this.ChooseRandomColor(allColor), photoTaken: false })
    }

    TakePhoto = () => {
        //Code prise puis extraction Photo

        console.log("Take Photo")
        this.setState({photoTaken: true, averagePhotoRGB: testRGB})

    }

    ShowVictory = () => {

        if(this.state.photoTaken){
            console.log("Show Victory Photo Taken")

            if(this.state.currentColor.CheckIfColorCorrespond(this.state.averagePhotoRGB)){
                console.log("Show Victory : VICTORY")

                return (
                    <Text>Gagné !</Text>
                )
            }
            else{
                console.log("Show Victory : DEFEAT")

                return (
                    <Text>Perdu !</Text>
                )
            }
        }
        else{
            return null
        }
    }

    render() {
        console.log("Rendering...")
        console.log(testRGB)
        let styles = this.styles
        const { currentColor } = this.state

        return (
            <View style={styles.container} >
                {this.ShowVictory()}
                <Text> {currentColor.name + " : " + currentColor.backgroundColor} </Text>
                <Button title="New Color" onPress={() => { this.GenerateNewColor() }} />
                <Button title="Check Color Test" onPress={() => { this.TakePhoto() }} />
            </View>
        );
    }

}

export default RandomColor;