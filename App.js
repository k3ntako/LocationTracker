import React, {Component} from 'react';
import { AppState } from 'react-native';


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
