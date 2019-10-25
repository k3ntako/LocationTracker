
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
      errorMessage: '',
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
      const {email, firstName, lastName, password} = this.state;
      const response = await signUp(email, firstName, lastName, password);      

      if (response.user_id && !response.error) {
        this.props.setUserId(response.user_id);
      } else {
        this.setState({
          errorMessage: response.error || 'Unable to sign-up',
        })
      }
    }
  }

  isValid = () => {
    const { email, firstName, lastName, password, passwordConfirmation } = this.state;
    const params = { email, firstName, lastName, password, passwordConfirmation };

    for (let key in params) {
      const param = params[key];
      
      if (!param || !param.trim()) return false;
    }

    if (password !== passwordConfirmation) return false;

    return true;
  }

  render() {
    const { email, firstName, lastName, password, passwordConfirmation, errorMessage } = this.state;
    const errorText = !!errorMessage && <Text>{errorMessage}</Text>

    return (
      <View>
        <TextInput
          placeholder="First Name"
          style={styles.input}
          onChangeText={this.onFirstNameChange}
          value={firstName}
          autoCorrect={false}
          autoCompleteType={'name'}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.input}
          onChangeText={this.onLastNameChange}
          value={lastName}
          autoCorrect={false}
          autoCompleteType={'name'}
          autoCapitalize={'none'}
        />
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
          autoCorrect={false}
          autoCompleteType={'password'}
          secureTextEntry={true}
          autoCapitalize={'none'}
        />
        <TextInput
          placeholder="Password Confirmation"
          style={styles.input}
          onChangeText={this.onPasswordConfirmationChange}
          value={passwordConfirmation}
          autoCorrect={false}
          autoCompleteType={'password'}
          secureTextEntry={true}
        />

        <Button
          title={"Sign Up!"}
          onPress={this.signUp}
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
    paddingHorizontal: 5
  },
});

export default SignUp;
