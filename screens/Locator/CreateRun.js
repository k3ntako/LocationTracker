import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  Button,
} from 'react-native';

import runUtils from '../../utilities/runUtils';
const createRun = runUtils.createRun;


class CreateRun extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  isValid(){
    const { runName, user_id } = this.props;
    return user_id && runName && !!runName.trim();
  }

  createRun = async () => {
    try {
      const {runName, user_id, setRunId} = this.props;
      const run_id = await createRun(user_id, runName);
      setRunId(run_id);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { runName, onRunNameChange } = this.props;

    return (
      <SafeAreaView>
        <TextInput
          placeholder="Name of Run"
          style={styles.input}
          onChangeText={onRunNameChange}
          value={runName}
          autoCorrect={false}
          autoCapitalize={'none'}
        />

        <Button
          title={"Create a Run!"}
          onPress={this.createRun}
          disabled={!this.isValid()}
        />
      </SafeAreaView>
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

export default CreateRun;
