import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Dimensions,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
Geolocation.setRNConfiguration({});

import runUtils from '../../utilities/runUtils';
const startRun = runUtils.startRun;
const recordPoint = runUtils.recordPoint;
const getRun = runUtils.getRun;

class LocatorScreen extends Component {
  constructor(props) {
    const now = new Date();
    const dateTime = now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timezone: 'America/New_York',
    });

    super(props);
    this.state = {
      run_id: null,
      isRunning: false,
      disableToggle: false,
      name: `Run - ${dateTime}`,
      coordinates: {
        latitude: 40.667545,
        longitude: -73.969877,
      },
      deltas: {
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0922,
      },
    };
  }

  componentDidMount() {
    const window = Dimensions.get('window');
    const { width, height } = window;

    const deltas = { ...this.state.deltas };
    deltas.longitudeDelta = deltas.latitudeDelta + width / height;

    this.setState({ deltas }, this.getLocation);
  }

  getLocation() {
    Geolocation.getCurrentPosition(this.getLocationCallback);
  }

  getLocationCallback = async position => {
    const coordinates = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    const { name, user_id, isRunning } = this.state;

    let run_id = this.state.run_id;
    if (isRunning && !run_id) {
      run_id = await startRun(name, coordinates, user_id);
    } else if (isRunning) {
      await recordPoint(coordinates);
    }

    this.setState({ coordinates, run_id, disableToggle: false });
  };

  toggleIsRunning = () => {
    const newIsRunning = !this.state.isRunning;
    const callback = newIsRunning ? this.getLocation : this.enableToggle;

    this.setState({
      isRunning: newIsRunning,
      disableToggle: true,
    }, callback);
  };

  enableToggle() {
    setTimeout(() => {
      this.setState({ disableToggle: false });
    }, 1000);
  }

  render() {
    const { coordinates, isRunning, disableToggle } = this.state;
    const { latitude, longitude } = coordinates;
    const { latitudeDelta, longitudeDelta } = this.state.deltas;
    const region = {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    };

    const buttonText = isRunning ? 'Stop Run' : 'Start Run';

    return (
      <View>
        <MapView style={styles.map} region={region}>
          <Marker title={'Current Location'} coordinate={coordinates} />
        </MapView>
        <Button
          title={buttonText}
          onPress={this.toggleIsRunning}
          disabled={disableToggle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: '80%',
    marginVertical: 50,
  },
});

export default LocatorScreen;
