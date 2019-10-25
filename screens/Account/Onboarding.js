import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import SegmentedControlIOS from "@react-native-community/segmented-control";


import Login from './Login'
import SignUp from './SignUp'

export default (props) => {
  const [selectSegmentIdx, setSelectSegmentIdx] = useState(0);
  const content = selectSegmentIdx === 0 ? <Login /> : <SignUp />;

  return <SafeAreaView>
    <SegmentedControlIOS
      values={["Login", "Sign Up"]}
      selectedIndex={selectSegmentIdx}
      onChange={event => setSelectSegmentIdx(event.nativeEvent.selectedSegmentIndex)}
    />
    
    {content}
  </SafeAreaView>
}