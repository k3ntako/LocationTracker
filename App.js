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
    };
  }

  setUser = (user) => {
    this.setState({user});
  }
  
  render() {   
    const user = this.state.user;
    if (!user) {
      return <AccountScreen screenProps={{ user: this.state.user, setUser: this.setUser }} />
    }

    return <WrappedTabNavigator screenProps={{user: this.state.user, setUser: this.setUser}} />
  }
}

export default App;
