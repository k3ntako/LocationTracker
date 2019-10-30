import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Button,
} from 'react-native';

import userUtils from '../../utilities/userUtils';
const login = userUtils.login;


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
    };

    this.onEmailChange = this.onChangeText.bind(this, 'email');
    this.onPasswordChange = this.onChangeText.bind(this, 'password');
  }

  onChangeText = (field, text) => {
    this.setState({ [field]: text })
  }

  login = async () => {
    if (this.isValid()) {
      const { email, password } = this.state;
      const response = await login(email, password);

      if (response.user && !response.error) {        
        this.props.setUser(response.user);
      }else{
        this.setState({
          errorMessage: response.error || 'Unable to login',
        })
      }
    }
  }

  isValid = () => {
    const { email, password } = this.state;
    const params = { email, password };

    for (let key in params) {
      const param = params[key];

      if (!param || !param.trim()) return false;
    }

    return true;
  }

  render() {
    const { email, password, errorMessage } = this.state;
    const errorText = !!errorMessage && <Text>{errorMessage}</Text>

    return (
      <View>
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={this.onEmailChange}
          value={email}
          autoCorrect={false}
          autoCompleteType={'email'}
          autoCapitalize={'none'}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={this.onPasswordChange}
          value={password}
          autoCompleteType={'password'}
          autoCorrect={false}
          secureTextEntry={true}
          autoCapitalize={'none'}
        />

        <Button
          title={"Login!"}
          onPress={this.login}
          disabled={!this.isValid()}
        />
        {errorText}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 5,
    color: 'black',
  },
});

export default Login;
