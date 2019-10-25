import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
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
      const user_id = await login(email, password);

      this.props.setUserId(user_id);
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
    const { email, password } = this.state;

    return (
      <View>
        <TextInput
          style={styles.input}
          onChangeText={this.onEmailChange}
          value={email}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={this.onPasswordChange}
          value={password}
          placeholder="Password"
        />

        <Button
          title={"Login!"}
          onPress={this.login}
          disabled={!this.isValid()}
        />
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
    paddingHorizontal: 5
  },
});

export default Login;
