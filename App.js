// React native
import React, {Component} from 'react';
import { AppState } from 'react-native';

// Icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const accountIcon = ({ focused, horizontal, tintColor }) => {
  return <FontAwesome5 name={'user-circle'} color={tintColor} size={20}/>;
}

const locatorIcon = ({ focused, horizontal, tintColor }) => {
  return <FontAwesome5 name={'map-marker-alt'} color={tintColor} size={20}/>;
}

// Navigation and Screens
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LocatorScreen from './screens/Locator';
import AccountScreen from './screens/Account';

const TabNavigator = createBottomTabNavigator({
  Locator: {
    screen: LocatorScreen,
    navigationOptions: {
      tabBarLabel: "Map",
      tabBarIcon: locatorIcon,
      tabBarOptions: {
        activeTintColor: '#e91e63',
        showLabel: false,
        showIcon: true,
    },
  },
  },
  Account: {
    screen: AccountScreen,
    navigationOptions: {
      tabBarLabel: "Account",
      tabBarIcon: accountIcon,
      tabBarOptions: {
        showLabel: false,
        showIcon: true,
        activeTintColor: '#e91e63',
      },
    },
  },
});




const WrappedTabNavigator = createAppContainer(TabNavigator);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      run_id: null,
      appState: AppState.currentState,
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    console.log("Previous appState:", this.appState);
    console.log("Next appState:", this.nextAppState);
    
    this.setState({ appState: nextAppState });
  };

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
