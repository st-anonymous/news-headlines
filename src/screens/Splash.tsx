import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/logo.png')} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDF2F7',
  },
  image: {width: 200, height: 200},
});
