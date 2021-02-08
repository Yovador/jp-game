import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import RandomColor from './components/RandomColor/RandomColor';
import styles from './AppStyles'

export default function App() {
  return (
    <View style={styles.container}>
      <RandomColor/>
      <StatusBar style="auto" />
    </View>
  );
}

