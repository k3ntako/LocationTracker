import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
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

import Onboarding from './Onboarding';

class LocatorScreen extends Component {
  constructor({props}) {
    super(props);
    this.state = {};
  }


  render() {    
    const props = this.props.screenProps;
    const user = props.user;

    if(!user){
      return <Onboarding setUser={props.setUser}/>
    }

    return (
      <SafeAreaView>
        <Text>{`${user.first_name} ${user.first_name}`}</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 5
  },
});

export default LocatorScreen;
