
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';

import userUtils from '../../utilities/userUtils';
const signUp = userUtils.signUp;


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
    };

    this.onEmailChange = this.onChangeText.bind(this, 'email');
    this.onFirstNameChange = this.onChangeText.bind(this, 'firstName');
    this.onLastNameChange = this.onChangeText.bind(this, 'lastName');
    this.onPasswordChange = this.onChangeText.bind(this, 'password');
    this.onPasswordConfirmationChange = this.onChangeText.bind(this, 'passwordConfirmation');
  }

  onChangeText = (field, text) => {
    this.setState({ [field]: text })
  }

  signUp = async () => {
    if(this.isValid()){
      const {email, firstName, lastName, password, passwordConfirmation} = this.state;
      const user_id = await signUp(email, firstName, lastName, password, passwordConfirmation);

      this.props.setUserId(user_id);
    }
  }

  isValid = () => {
    const { email, firstName, lastName, password, passwordConfirmation } = this.state;
    const params = { email, firstName, lastName, password, passwordConfirmation };

    for (let key in params) {
      const param = params[key];
      
      if (!param || !param.trim()) return false;
    }

    return true;
  }

  render() {
    const { email, firstName, lastName, password, passwordConfirmation } = this.state;

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
          onChangeText={this.onFirstNameChange}
          value={firstName}
          placeholder="First Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={this.onLastNameChange}
          value={lastName}
          placeholder="Last Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={this.onPasswordChange}
          value={password}
          placeholder="Password"
        />
        <TextInput
          style={styles.input}
          onChangeText={this.onPasswordConfirmationChange}
          value={passwordConfirmation}
          placeholder="Password Confirmation"
        />

        <Button
          title={"Sign Up!"}
          onPress={this.signUp}
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

export default SignUp;
