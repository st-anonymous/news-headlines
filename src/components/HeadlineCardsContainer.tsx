import React from 'react';
import {
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RowMap, SwipeListView} from 'react-native-swipe-list-view';
import {HeadlinesType} from '../types/Headlines';
import useHeadlines from '../hooks/useHeadlines';

const HeadlineCardsContainer = () => {
  const {renderingItems, onTogglePinRow, onDeleteRow} = useHeadlines();

  const renderItem = (data: ListRenderItemInfo<HeadlinesType>) => {
    return (
      <View style={styles.visibleRow}>
        <Text style={styles.visibleRowText}>{data.item.title}</Text>
        {data.item.isPinned && <Text style={styles.pinnedSymbol}>⭐</Text>}
      </View>
    );
  };

  const renderHiddenItem = (
    data: ListRenderItemInfo<HeadlinesType>,
    rowMap: RowMap<HeadlinesType>,
  ) => {
    return (
      <View style={styles.invisibleRow}>
        <TouchableOpacity
          onPress={() => onTogglePinRow(rowMap, data.item)}
          style={styles.invisibleActionButton}>
          <Text style={styles.pinButtonText}>
            {data.item.isPinned ? 'Unpin' : 'pin'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDeleteRow(rowMap, data.item)}
          style={styles.invisibleActionButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SwipeListView
      style={styles.container}
      data={renderingItems}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={75}
      rightOpenValue={-75}
    />
  );
};

export default HeadlineCardsContainer;

const styles = StyleSheet.create({
  container: {
    height: '90%',
    width: '100%',
  },
  visibleRow: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    justifyContent: 'center',
    height: 80,
  },
  visibleRowText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: 'black',
    paddingHorizontal: 15,
    textAlign: 'left',
  },
  pinnedSymbol: {
    position: 'absolute',
    top: 0,
    left: 0,
    color: 'yellow',
  },
  invisibleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  invisibleActionButton: {
    height: '100%',
    width: '50%',
  },
  pinButtonText: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    color: 'white',
    backgroundColor: 'green',
    textAlign: 'left',
  },
  deleteButtonText: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    color: 'white',
    backgroundColor: 'red',
    textAlign: 'right',
  },
});
