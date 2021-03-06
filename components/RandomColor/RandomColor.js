import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Color from './Color'



//Création des couleurs
const redColor = new Color("Red", "#f54242", [350, 15], [25, 100], [20, 100])
const blueColor = new Color("Blue", "#2ecbff", [160, 240], [25, 100], [20, 100])
const greenColor = new Color("Green", "#47e32b", [80, 150], [25, 100], [20, 100])
const yellowColor = new Color("Yellow", "#e5e82a", [40, 70], [25, 100], [20, 100])
const purpleColor = new Color("Purple", "#7130c7", [240, 300], [25, 100], [20, 100])
const blackColor = new Color("Black", "#121211", [0, 360], [0, 100], [0, 20])
const whiteColor = new Color("White", "#f7f6f5", [0, 360], [0, 40], [70, 100])

//Toute les couleurs sont stockés dans allColor
const allColor = [redColor, blueColor, greenColor, yellowColor, purpleColor, blackColor, whiteColor]

//Variable de test de la comparaison
const testRGB = [221, 232, 237]

class RandomColor extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            //Couleur actuel affiché à l'écran
            currentColor: this.ChooseRandomColor(allColor),
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
        this.setState({ currentColor: this.ChooseRandomColor(allColor)})
        this.props.ResetPhoto()
    }


    ShowVictory = () => {

        console.log("Show Victory Photo Taken", this.props.colorToTest)

        if (this.props.colorToTest != null) {
            if (this.state.currentColor.CheckIfColorCorrespond(this.props.colorToTest)) {
                console.log("Show Victory : VICTORY")

                return (
                    <Text>Gagné !</Text>
                )
            }
            else {
                console.log("Show Victory : DEFEAT")

                return (
                    <Text>Perdu !</Text>
                )
            }
        }
    }

render() {
    console.log("Rendering...")
    let styles = this.styles
    const { currentColor } = this.state

    return (
        <View style={styles.container} >
            {this.ShowVictory()}
            <Text> {currentColor.name + " : " + currentColor.backgroundColor} </Text>
            <Button title="New Color" onPress={() => { this.GenerateNewColor() }} />
        </View>
    );
}

}

export default RandomColor;