import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
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

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';


import LocatorScreen from './screens/Locator';
import AccountScreen from './screens/Account';

const TabNavigator = createBottomTabNavigator({
  Locator: LocatorScreen,
  Account: AccountScreen,
});



const WrappedTabNavigator = createAppContainer(TabNavigator);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      run_id: null,
    };
  }

  setUser = (user) => {
    this.setState({user});
  }

  setRunId = (run_id) => {
    this.setState({ run_id });
  }
  
  render() {   
    const {user, run_id} = this.state;

    const screenProps = {
      user, 
      setUser: this.setUser,
      run_id,
      setRunId: this.setRunId,
    };

    if (!user) {
      return <AccountScreen screenProps={screenProps} />
    }

    return <WrappedTabNavigator screenProps={screenProps} />
  }
}

export default App;
