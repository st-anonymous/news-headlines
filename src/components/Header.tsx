import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity>
        <Text style={styles.symbolText}>⏲</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>News</Text>
      <TouchableOpacity>
        <Text style={styles.symbolText}>↻</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

export const styles = StyleSheet.create({
  headerContainer: {
    height: '10%',
    backgroundColor: 'skyblue',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  headerText: {
    fontSize: 48,
    color: 'black',
  },
  symbolText: {
    fontSize: 40,
    color: 'blue',
  },
});
