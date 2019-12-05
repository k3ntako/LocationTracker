import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Dimensions,
  Text,
} from 'react-native';

import BackgroundGeolocation from "react-native-background-geolocation";

import MapView, { Marker } from 'react-native-maps';

import CreateRun from './CreateRun';

import runUtils from '../../utilities/runUtils';
const finishRun = runUtils.finishRun;
const config = runUtils.config;

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
      runName: `Run - ${dateTime}`,
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

  onRunNameChange = (text) => {
    this.setState({ name: text });
  }

  componentDidMount() {
    const window = Dimensions.get('window');
    const { width, height } = window;

    const deltas = { ...this.state.deltas };
    deltas.longitudeDelta = deltas.latitudeDelta + width / height;

    this.setState({ deltas }, this.getLocation);

    BackgroundGeolocation.onLocation(this.onLocation, this.onError);

    BackgroundGeolocation.ready(config(BackgroundGeolocation), this.onReady);
    BackgroundGeolocation.getCurrentPosition();
  }

  onReady = (state) => {
    console.log('state', state.url);
    console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
  }

  componentWillUnmount() {
    BackgroundGeolocation.removeListeners();
  }

  onLocation = (location) => {
    const { latitude, longitude } = location.coords;
    this.setState({
      coordinates: {
        latitude, longitude
      }
    })
    console.log('[location] -', location);
  }

  toggleIsRunning = () => {
    let newIsRunning = !this.state.isRunning;

    const callback = newIsRunning ? this.startRecording : this.finishRecording;

    this.setState({
      isRunning: newIsRunning,
      disableToggle: true,
    }, callback);
  };

  startRecording = async () => {
    try {
      const { run_id } = this.props.screenProps;
      if (!run_id) {
        throw new Error('No run ID');
      }

      const state = await BackgroundGeolocation.setConfig({
        autoSync: true,
        url: `https://location-tracker25.herokuapp.com/api/run/${run_id}/record`,
      });

      if (!state.url || !state.url.includes(run_id)) {
        throw new Error('Invalid run ID')
      }

      BackgroundGeolocation.start().then((state) => {
        console.log('[start] success - ', state.enable);
        this.setState({ disableToggle: false });
      });
    } catch (error) {
      console.error(error);
    }
  }

  finishRecording = async () => {
    try{
      const { setRunId, run_id } = this.props.screenProps;

      BackgroundGeolocation.stop();

      finishRun(run_id);
      setRunId(null);

      await BackgroundGeolocation.setConfig({
        autoSync: false,
        url: '',
      });

      //enable toggle buttons
      setTimeout(() => {
        this.setState({ disableToggle: false });
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { run_id, setRunId, user} = this.props.screenProps;
    const { coordinates, isRunning, disableToggle, runName } = this.state;

    if (!run_id) {
      return <CreateRun
        user_id={user.id}
        setRunId={setRunId}
        runName={runName}
        onRunNameChange={this.onRunNameChange} />
    }

    const { latitude, longitude } = coordinates;
    const { latitudeDelta, longitudeDelta } = this.state.deltas;
    const region = {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    };

    const buttonText = isRunning ? 'Stop Tracking' : 'Start Tracking';

    return (
      <View style={styles.locator}>
        <MapView style={styles.map} region={region}>
          <Marker title={'Current Location'} coordinate={coordinates} />
        </MapView>
        <Text style={styles.runName}>{runName}</Text>
        <View style={styles.buttonWrapper}>
          <Button
            title={buttonText}
            onPress={this.toggleIsRunning}
            disabled={disableToggle}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  locator: {
    flex: 1,
    display: 'flex',
  },
  map: {
    height: '80%',
    marginBottom: 10,
    position: 'relative',
    top: 0,
  },
  runName: {
    width: '100%',
    textAlign: 'center',
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default LocatorScreen;
