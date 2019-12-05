import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  Share,
} from 'react-native';


import Onboarding from './Onboarding';

class LocatorScreen extends Component {
  constructor({props}) {
    super(props);
    this.state = {};
  }

  share = async () => {
    try {
      const run_id = this.props.screenProps.run_id;
      const link = `https://location-tracker25.herokuapp.com/${run_id}`;

      const result = await Share.share({
        title: 'Share your run!',
        message: `I'm currently running! Open the link to track me live!`,
        url: link
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // TODO: success and error messages
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }


  render() {
    const props = this.props.screenProps;
    const {user, run_id} = props;

    if(!user){
      return <Onboarding setUser={props.setUser}/>
    }

    let shareButton;
    if (run_id) {
      shareButton = <Button title={"Share!"} onPress={this.share} />
    }

    return (
      <SafeAreaView style={styles.account}>
        <Text style={styles.name}>{`${user.first_name} ${user.last_name}`}</Text>
        <Text style={styles.id}>User ID: {user.id}</Text>
        <Text style={styles.id}>Run ID: {run_id}</Text>
        {shareButton}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  account: {
    marginVertical: 75,
  },
  name: {
    textAlign: 'center',
    fontSize: 36,
  },
  id: {
    textAlign: 'center',
  },
});

export default LocatorScreen;
