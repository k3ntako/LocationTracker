import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Dimensions,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
Geolocation.setRNConfiguration({});

import runUtils from '../../utilities/runUtils';
const startRun = runUtils.startRun;
const recordPoint = runUtils.recordPoint;
const finishRun = runUtils.finishRun;

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
      isRunning: false,
      disableToggle: false,  //disable Start/Stop button to prevent multiple requests to server
      name: `Run - ${dateTime}`,
      coordinates: {
        latitude: 40.667545,
        longitude: -73.969877,
      },
      deltas: {
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0922,
      },
      interval: 15, //time between each check in secs
    };

    this.timer = null;
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

    const { name, isRunning } = this.state;
    const { user, setRunId } = this.props.screenProps;   
    let run_id =  this.props.screenProps.run_id;

    if (isRunning && user && !run_id) {
      run_id = await startRun(name, coordinates, user.id);
      this.startRecording();
    } else if (isRunning && user && run_id) {
      await recordPoint(coordinates, run_id);
    }

    setRunId(run_id);
    this.setState({ coordinates, disableToggle: false });
  };

  toggleIsRunning = (isRunning = null) => {
    let newIsRunning = !this.state.isRunning;
    if (typeof isRunning === 'boolean'){
      newIsRunning = isRunning;
    }
    const callback = newIsRunning ? this.getLocation : this.finishRecording;

    this.setState({
      isRunning: newIsRunning,
      disableToggle: true,
    }, callback);
  };

  startRecording = () => {
    this.timer = setInterval(() => {      
      this.getLocation();
    }, this.state.interval * 1000);
  }

  finishRecording() {
    const { setRunId, run_id } = this.props.screenProps;

    finishRun(run_id);
    this.props.screenProps.setRunId(null);

    //enable toggle buttons
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
