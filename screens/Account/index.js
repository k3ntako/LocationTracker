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
      <SafeAreaView>
        <Text>{`${user.first_name} ${user.last_name}`}</Text>
        {shareButton}
      </SafeAreaView>
    );
  }
}

export default LocatorScreen;
