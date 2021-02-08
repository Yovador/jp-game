import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


class Color{

    constructor(name, backgroundColor, range, pivotHue){
        this.name = name;
        this.backgroundColor = backgroundColor;
        this.range = range;
        this.pivotHue = pivotHue;

    }

    CheckIfColorCorrespond(r, g, b){
        const normalizedR = r/255
        const normalizedG = g/255
        const normalizedB = b/255

        console.log(normalizedR, normalizedG, normalizedB)

        let cmin = Math.min(normalizedR, normalizedG, normalizedB)
        let cmax = Math.max(normalizedR, normalizedG, normalizedB)
        let delta = cmax - cmin
        
        let h = 0
        let s = 0
        let l = 0

        //Pour le moment ou n'utilise que la Hue, le reste n'est pas obligatoire
        
        // Calculate hue
        // No difference
        if (delta == 0){
            h = 0
            console.log("Delta 0")
        }
        // Red is max
        else if (cmax == normalizedR){
            h = ((normalizedG - normalizedB) / delta) % 6
            console.log("cmax is red")
        }

        // Green is max
        else if (cmax == normalizedG){
            h = (normalizedB - normalizedR) / delta + 2;
            console.log("cmax is blue")

        }
        // Blue is max
        else{
            h = (normalizedR - normalizedG) / delta + 4;
            console.log("cmax is green")
        }

        h = Math.round(h * 60);
        
        console.log("hue " + h);
        // Make negative hues positive behind 360°
        /*if (h < 0)
            h += 360;*/

        let isColorCorresponding;

        if(h <= this.pivotHue + this.range && h >= this.pivotHue - this.range ){
            isColorCorresponding = true;
        }
        else{
            isColorCorresponding = false;
        }

        return isColorCorresponding;
    }

}

const redColor = new Color("Red", "#f54242", 15, 0)
const blueColor = new Color("Blue", "#2ecbff", 30, 200)
const greenColor = new Color("Green", "#47e32b", 38, 112)
const yellowColor = new Color("Yellow", "#e5e82a", 10, 60)

const allColor = [redColor, blueColor, greenColor, yellowColor]

const testRGB = [0,0,0]

class RandomColor extends React.Component {

    constructor(props){
        super(props);
        
        this.ChooseRandomColor = this.ChooseRandomColor.bind(this);
        this.state = {
            currentColor : this.ChooseRandomColor(allColor)
        };

        this.styles = StyleSheet.create({
            container: {
              width: "100%",
              height: "100%",
              backgroundColor: this.state.currentColor.backgroundColor,
              justifyContent: 'center',
              alignItems: 'center'
            },
          });
    }

    ChooseRandomColor(colorArray){
        const indexColor = Math.floor(Math.random() * colorArray.length)

        return colorArray[indexColor]
    }


    render() { 

        let styles = this.styles
        const {currentColor} = this.state

        return (
            <View style={styles.container} >
                <Text> { currentColor.name + " : " + currentColor.backgroundColor + " / " + currentColor.range + " / " + currentColor.pivotHue} </Text>
                <Text> { "Is color : " + currentColor.CheckIfColorCorrespond( testRGB[0], testRGB[1],testRGB[2] ) } </Text>
            </View>
        );
    }

}


 
export default RandomColor ;