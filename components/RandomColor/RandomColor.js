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

        let cmin = Math.min(normalizedR, normalizedG, normalizedB)
        let cmax = Math.max(normalizedR, normalizedG, normalizedB)
        let delta = cmax - cmin
        
        let h = 0
        let s = 0
        let l = 0

        //Pour le moment ou n'utilise que la Hue, le reste n'est pas obligatoire
        
        // Calculate hue
        // No difference
        if (delta == 0)
            h = 0;
        // Red is max
        else if (cmax == r)
        h = ((g - b) / delta) % 6;
        // Green is max
        else if (cmax == g)
        h = (b - r) / delta + 2;
        // Blue is max
        else
        h = (r - g) / delta + 4;

        h = Math.round(h * 60);
        
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
const testRGB = [140, 54, 36]

class RandomColor extends React.Component {

    render() { 
        return (
            <View>
                <Text> { redColor.name + " : " + redColor.backgroundColor + " / " + redColor.range } </Text>
                <Text> { redColor.CheckIfColorCorrespond( testRGB[0], testRGB[1],testRGB[2] ) } </Text>
            </View>
        );
    }

}
 
export default RandomColor ;