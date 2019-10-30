import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Dimensions,
  Text,
} from 'react-native';

import BackgroundGeolocation from "react-native-background-geolocation";

import MapView, { Marker } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// Geolocation.setRNConfiguration({});

import CreateRun from './CreateRun';

import runUtils from '../../utilities/runUtils';
const startRun = runUtils.startRun;
const recordPoint = runUtils.recordPoint;
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
  }

  onReady = (state) => {
    console.log('state', state.url);
    console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
  }

  // setRunId  = (run_id) => {
  //   BackgroundGeolocation.setConfig({
  //     url: `https://location-tracker25.herokuapp.com/api/run/${run_id}/record`,
  //   }).then((state) => {
  //     console.log('run id set to: ', state);
  //   })
  // }

  componentWillUnmount() {
    BackgroundGeolocation.removeListeners();
  }

  onLocation(location) {
    console.log('[location] -', location);
  }

  // getLocation() {
  //   Geolocation.getCurrentPosition(this.getLocationCallback);
  // }

  // getLocationCallback = async position => {
  //   const coordinates = {
  //     latitude: position.coords.latitude,
  //     longitude: position.coords.longitude,
  //   };

  //   const { name, isRunning } = this.state;
  //   const { user, setRunId } = this.props.screenProps;   
  //   let run_id = this.props.screenProps.run_id;

  //   if (isRunning && user && !run_id) {
  //     run_id = await startRun(name, coordinates, user.id);
  //     this.startRecording();
  //   } else if (isRunning && user && run_id) {
  //     await recordPoint(coordinates, run_id);
  //   }

  //   setRunId(run_id);
  //   this.setState({ coordinates, disableToggle: false });
  // };

  toggleIsRunning = () => {
    let newIsRunning = !this.state.isRunning;

    const callback = newIsRunning ? this.startRecording : this.finishRecording;

    this.setState({
      isRunning: newIsRunning,
      disableToggle: true,
    }, callback);
  };

  startRecording = async () => {
    const {run_id} = this.props.screenProps;
    if (!run_id) {
      throw new Error('No run ID');
    }

    BackgroundGeolocation.setConfig({
      url: `https://location-tracker25.herokuapp.com/api/run/${run_id}/record`,
    }).then(state => {
      if (!state.url || !state.url.includes(run_id)){
        throw new Error('Invalid run ID')
      }

      BackgroundGeolocation.start().then((state) => {
        console.log('[start] success - ', state.enable);
        this.setState({ disableToggle: false });
      });
    });
  }

  finishRecording() {
    const { setRunId, run_id } = this.props.screenProps;

    BackgroundGeolocation.stop();

    finishRun(run_id);
    this.props.screenProps.setRunId(null);

    //enable toggle buttons
    setTimeout(() => {
      this.setState({ disableToggle: false });
    }, 1000);
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

    const buttonText = isRunning ? 'Stop Run' : 'Start Run';

    return (
      <View>
        <MapView style={styles.map} region={region}>
          <Marker title={'Current Location'} coordinate={coordinates} />
        </MapView>
        <Text style={styles.runName}>{runName}</Text>
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
  runName: {
    width: '100%',
    textAlign: 'center',
  }
});

export default LocatorScreen;
