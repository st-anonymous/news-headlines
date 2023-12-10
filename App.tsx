/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {RecoilRoot} from 'recoil';
import Navigator from './src/navigator/Navigator';

const App = (): React.JSX.Element => {
  return (
    <RecoilRoot>
      <SafeAreaView>
        <StatusBar hidden={true} />
        <View style={{height: '100%'}}>
          <Navigator />
        </View>
      </SafeAreaView>
    </RecoilRoot>
  );
};

export default App;
