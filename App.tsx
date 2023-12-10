/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import useInit from './src/hooks/useInit';

const App = (): React.JSX.Element => {
  const {Screen} = useInit();
  return (
    <SafeAreaView>
      <StatusBar hidden={true} />
      <View style={{height: '100%'}}>{Screen}</View>
    </SafeAreaView>
  );
};

export default App;
