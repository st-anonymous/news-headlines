import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

const HeadlineCardsContainer = () => {
  const items = [
    {key: 1, value: 'tony'},
    {key: 2, value: 'siri'},
    {key: 3, value: 'tony'},
    {key: 4, value: 'siri'},
    {key: 5, value: 'tony'},
    {key: 6, value: 'siri'},
  ];
  return (
    <SwipeListView
      data={items}
      renderItem={data => (
        <View style={styles.visibleRow}>
          <Text>{data.item.value}</Text>
        </View>
      )}
      renderHiddenItem={data => (
        <View style={styles.invisibleRow}>
          <TouchableOpacity
            onPress={() => {
              console.log(data.item);
            }}
            style={styles.invisibleActionButton}>
            <Text style={styles.pinButtonText}>Pin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log(data.item);
            }}
            style={styles.invisibleActionButton}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
      leftOpenValue={75}
      rightOpenValue={-75}
    />
  );
};

export default HeadlineCardsContainer;

export const styles = StyleSheet.create({
  container: {
    height: '90%',
    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  visibleRow: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    padding: 20,
  },
  invisibleRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  invisibleActionButton: {
    height: '100%',
    width: '50%',
  },
  pinButtonText: {
    padding: 20,
    color: 'white',
    backgroundColor: 'green',
    textAlign: 'left',
  },
  deleteButtonText: {
    padding: 20,
    color: 'white',
    backgroundColor: 'red',
    textAlign: 'right',
  },
});
