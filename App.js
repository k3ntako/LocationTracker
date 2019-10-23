import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
Geolocation.setRNConfiguration({});

import {sendLocation} from './utilities/locationUtils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
      deltas: {
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0922,
      },
    };
  }

  componentDidMount() {
    const window = Dimensions.get('window');
    const {width, height} = window;

    const deltas = {...this.state.deltas};
    deltas.longitudeDelta = deltas.latitudeDelta + width / height;

    this.setState({deltas}, this.getLocation);
  }

  getLocation() {
    Geolocation.getCurrentPosition(this.getLocationCallback);
  }

  getLocationCallback = position => {
    const coordinates = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    // sendLocation(coordinates);

    this.setState({coordinates});
  };

  render() {
    const {coordinates} = this.state;
    const {latitude, longitude} = coordinates;
    const {latitudeDelta, longitudeDelta} = this.state.deltas;
    const region = {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    };

    return (
      <MapView style={styles.map} region={region}>
        <Marker title={'Current Location'} coordinate={coordinates} />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: '80%',
    marginVertical: 50,
  },
});

export default App;
