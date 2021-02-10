import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GetPixelColor from 'react-native-get-pixel-color';

function hexToRgb(hex) {
    var result = /^#?([a-fd]{2})([a-fd]{2})([a-fd]{2})$/i.exec(hex);
    if(result){
        var r= parseInt(result[1], 16);
        var g= parseInt(result[2], 16);
        var b= parseInt(result[3], 16);
        return r+","+g+","+b;//return 23,14,45 -> reformat if needed 
    } 
    return null;
  }
  console.log(hexToRgb("#0a3678"));//"10,54,120"