import React, {useEffect, useState} from 'react';
import {
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RowMap, SwipeListView} from 'react-native-swipe-list-view';

export type ItemType = {key: number; title: string; isPinned: boolean};

const HeadlineCardsContainer = () => {
  const [items, setItems] = useState<Array<ItemType>>([
    {key: 1, title: 'tony1', isPinned: false},
    {key: 2, title: 'siri2', isPinned: false},
    {key: 3, title: 'tony3', isPinned: false},
    {key: 4, title: 'siri4', isPinned: false},
    {key: 5, title: 'tony5', isPinned: false},
    {key: 6, title: 'siri6', isPinned: false},
  ]);
  const [pinnedItems, setPinnedItems] = useState<Array<ItemType>>([]);
  const [renderingItems, setRenderingItems] = useState<Array<ItemType>>(items);

  useEffect(() => {
    const newRenderingItems = [
      ...pinnedItems,
      ...items.filter(item => !item.isPinned),
    ];
    setRenderingItems(newRenderingItems);
  }, [items, pinnedItems]);

  const onTogglePinRow = (rowMap: RowMap<ItemType>, rowItem: ItemType) => {
    // console.log(rowItem, 'pinning 📌');
    rowMap[rowItem.key].closeRow();
    setItems(
      items.map(item => {
        if (item.key === rowItem.key) {
          return {...rowItem, isPinned: !rowItem.isPinned};
        } else {
          return item;
        }
      }),
    );
    if (rowItem.isPinned) {
      setPinnedItems(
        pinnedItems.filter(pinnedItem => pinnedItem.key !== rowItem.key),
      );
    } else {
      pinnedItems.unshift({...rowItem, isPinned: true});
    }
  };

  const onDeleteRow = (rowMap: RowMap<ItemType>, rowItem: ItemType) => {
    // console.log(rowItem, 'deleting ❌');
    rowMap[rowItem.key].closeRow();
    setPinnedItems(
      pinnedItems.filter(pinnedItem => pinnedItem.key !== rowItem.key),
    );
    setItems(items.filter(item => item.key !== rowItem.key));
  };

  const renderItem = (data: ListRenderItemInfo<ItemType>) => {
    return (
      <View style={styles.visibleRow}>
        <Text>{data.item.title}</Text>
        {data.item.isPinned && <Text style={styles.pinnedSymbol}>⭐</Text>}
      </View>
    );
  };

  const renderHiddenItem = (
    data: ListRenderItemInfo<ItemType>,
    rowMap: RowMap<ItemType>,
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
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
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
