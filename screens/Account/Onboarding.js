import React, { useState } from 'react';
import { SafeAreaView, SegmentedControlIOS } from 'react-native';
// SegmentedControlIOS from 'react-native' is deprecated.
// https://facebook.github.io/react-native/docs/segmentedcontrolios
// However, @react-native-community/react-native-segmented-control has an issue where a build will fail.
// https://github.com/react-native-community/react-native-segmented-control/issues/15


import Login from './Login'
import SignUp from './SignUp'

export default (props) => {
  const [selectSegmentIdx, setSelectSegmentIdx] = useState(0);
  const content = selectSegmentIdx === 0 ? <Login setUser={props.setUser} /> : <SignUp setUser={props.setUser} />;

  return <SafeAreaView>
    <SegmentedControlIOS
      values={["Login", "Sign Up"]}
      selectedIndex={selectSegmentIdx}
      onChange={event => setSelectSegmentIdx(event.nativeEvent.selectedSegmentIndex)}
    />
    
    {content}
  </SafeAreaView>
}