import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';


// Description de la Class Color
//
// *** Variable : ***
//
// name (string) : C'est le nom de la couleur affiché par le jeu. e.g "Rouge"
// backgroundColor(string) : Hexadecimal de la couleur de fond à affiché pour cette couleur e.g "#f54242"
// pivotHue(int) : valeur pivot de la teinte de la couleur. On y ajoute ou soustrait range pour connaitre les bornes max et min de notre intervalle de validité
// range(int): valeur à ajouter ou soustraire à pivoit pour obtenir les bornes de validité.  pivot - range donc la borne minimale, et pivot + range donne la borne maximal
// 
//
// *** Fonction : ***
// CheckIfColorCorrespond(r, g, b) : Prend en parametre trois int representant la valeur rgb de la couleur à tester. Convertie cette valeur rgb en hsl puis regarde si la valeur H (Hue, la teinte de la couleur) appartient à l'intervalle de validité.

class Color {

    constructor(name, backgroundColor, pivotHue, range) {
        this.name = name;
        this.backgroundColor = backgroundColor;
        this.pivotHue = pivotHue;
        this.range = range;
    }

    CheckIfColorCorrespond(rgb) {
        const normalizedR = rgb[0] / 255
        const normalizedG = rgb[1] / 255
        const normalizedB = rgb[2] / 255

        console.log(normalizedR, normalizedG, normalizedB)

        let cmin = Math.min(normalizedR, normalizedG, normalizedB)
        let cmax = Math.max(normalizedR, normalizedG, normalizedB)
        let delta = cmax - cmin

        let h = 0
        let s = 0
        let l = 0

        //Pour le moment ou n'utilise que la Hue, on fera le reste si on a le temps. Mais du coup le blanc le noir
        //et les teintes de gris risque de donner des résultats inatendu. Pour changer cela il faudra prendre en compte 
        //la saturation S et la luminosité L de la couleur. Pour le moment elle ne sont pas calculé. 

        // Calculate hue
        // No difference
        if (delta == 0) {
            h = 0
            console.log("Delta 0")
        }
        // Red is max
        else if (cmax == normalizedR) {
            h = ((normalizedG - normalizedB) / delta) % 6
            console.log("cmax is red")
        }

        // Green is max
        else if (cmax == normalizedG) {
            h = (normalizedB - normalizedR) / delta + 2;
            console.log("cmax is blue")

        }
        // Blue is max
        else {
            h = (normalizedR - normalizedG) / delta + 4;
            console.log("cmax is green")
        }

        h = Math.round(h * 60);

        console.log("hue " + h);
        // Make negative hues positive behind 360°
        /*if (h < 0)
            h += 360;*/

        let isColorCorresponding;

        if (h <= this.pivotHue + this.range && h >= this.pivotHue - this.range) {
            isColorCorresponding = true;
        }
        else {
            isColorCorresponding = false;
        }

        return isColorCorresponding;
    }

}

//Création des couleurs
const redColor = new Color("Red", "#f54242", 0, 15)
const blueColor = new Color("Blue", "#2ecbff", 200, 30)
const greenColor = new Color("Green", "#47e32b", 112, 38)
const yellowColor = new Color("Yellow", "#e5e82a", 60, 10)
const purpleColor = new Color("Purple", "#7130c7", 275, 25)

//Toute les couleurs sont stockés dans allColor
const allColor = [redColor, blueColor, greenColor, yellowColor, purpleColor]

//Variable de test de la comparaison
const testRGB = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255) ]

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
                <Button title="Take Photo" onPress={() => { this.TakePhoto() }} />
            </View>
        );
    }

}

export default RandomColor;