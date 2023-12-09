/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import Header from './src/components/Header';
import HeadlineCardsContainer from './src/components/HeadlineCardsContainer';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar hidden={true} />
      <View style={{height: '100%'}}>
        <Header />
        <HeadlineCardsContainer />
      </View>
    </SafeAreaView>
  );
}

export default App;
