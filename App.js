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
      user_id: null,
    };
  }

  setUserId = (user_id) => {
    this.setState({user_id})
  }
  
  render() {   
    return <WrappedTabNavigator screenProps={{user_id: this.state.user_id, setUserId: this.setUserId}} />
  }
}

export default App;
