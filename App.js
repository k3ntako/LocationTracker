/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MapView from 'react-native-maps';

import Geolocation from '@react-native-community/geolocation';
Geolocation.setRNConfiguration({});

const App: () => React$Node = () => {
  const locationInfo = Geolocation.getCurrentPosition(info => info);

  return <MapView style={styles.map}/>
};

const styles = StyleSheet.create({
  map: {
    height: '80%',
    marginVertical: 50,
  },
});

export default App;
