import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GetPixelColor from 'react-native-get-pixel-color';

function hexToRgb(hex) {
    var result = /^#?([a-fd]{2})([a-fd]{2})([a-fd]{2})$/i.exec(hex);
    if (result) {
        var r = parseInt(result[1], 16);
        var g = parseInt(result[2], 16);
        var b = parseInt(result[3], 16);
        return [r, g, b];//return 23,14,45 -> reformat if needed 
    }
    return null;
}
console.log(hexToRgb("#0a3678"));//"10,54,120"

const GetAverage = (imgPath, heigth, width) => {

  console.log(imgPath, heigth, width)
  let averageR = 0;
  let averageG = 0;
  let averageB = 0;

  //Code Non Fonctionnel
  /*GetPixelColor.init(imgPath)
  .then(() => {
    console.log("init")
  })
  .catch(err => {
    console.log(err)
  });*/

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < heigth; y++) {

        //Code Non Fonctionnel
        /*GetPixelColor.pickColorAt(x, y)
          .then((color) => {
            console.log(color)
            let rgb = hexToRgb(color)
            averageR += rgb[0]
            averageG += rgb[1]
            averageB += rgb[2]
          })
          .catch(err => {
            console.log(err)
          });*/

    }
  }

  averageR = averageR / (width*heigth)
  averageG = averageG / (width*heigth)
  averageB = averageB / (width*heigth)
 
  /* On set manuellement les différentes moyennes pour pouvoir essayer le programme malgré la librairie non fonctionnelle */
  averageR = 201
  averageG = 22
  averageB = 22

  return [averageR, averageG, averageB]
}

export default GetAverage;

