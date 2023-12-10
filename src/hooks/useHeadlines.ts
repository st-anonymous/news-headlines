/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {HeadlinesAtom, PinnedHeadlinesAtom} from '../data/Headlines';
import {SetAsyncStorage} from '../utils/AsyncStorage';
import {HeadlinesType} from '../types/Headlines';
import {RowMap} from 'react-native-swipe-list-view';
import GetRenderingItems from '../utils/GetRenderingItems';
import UserSettingsAtom from '../data/UserSettings';

const useHeadlines = () => {
  const [headlinesAtom, setHeadlinesAtom] = useRecoilState(HeadlinesAtom);
  const [pinnedHeadlinesAtom, setPinnedHeadlinesAtom] =
    useRecoilState(PinnedHeadlinesAtom);
  const [renderingItems, setRenderingItems] = useState<Array<HeadlinesType>>(
    [],
  );
  const [userSettingsAtom, setUserSettingsAtom] =
    useRecoilState(UserSettingsAtom);
  const [size, setSize] = useState<number>(10);
  const [shouldUpdateRenderingItems, setShouldUpdateRenderingItems] =
    useState(true);

  useEffect(() => {
    if (userSettingsAtom.manualRefresh) {
      setSize(prev => prev + 5);
      setShouldUpdateRenderingItems(true);
      setUserSettingsAtom(prev => {
        return {
          ...prev,
          manualRefresh: false,
        };
      });
    }
  }, [userSettingsAtom.manualRefresh]);

  useEffect(() => {
    if (shouldUpdateRenderingItems) {
      setShouldUpdateRenderingItems(false);
      const newRenderingItems = GetRenderingItems(
        headlinesAtom,
        pinnedHeadlinesAtom,
        size,
        setHeadlinesAtom,
      );
      setRenderingItems(newRenderingItems);
      SetAsyncStorage('headlines', headlinesAtom);
      SetAsyncStorage('pinnedHeadlines', pinnedHeadlinesAtom);
    }
  }, [shouldUpdateRenderingItems]);

  const onTogglePinRow = (
    rowMap: RowMap<HeadlinesType>,
    rowItem: HeadlinesType,
  ) => {
    // console.log(rowItem, 'pinning 📌');
    rowMap[rowItem.key].closeRow();
    if (rowItem.isPinned) {
      setPinnedHeadlinesAtom(
        pinnedHeadlinesAtom.filter(
          pinnedItem => pinnedItem.key !== rowItem.key,
        ),
      );
    } else {
      setPinnedHeadlinesAtom([
        {...rowItem, isPinned: true},
        ...pinnedHeadlinesAtom.filter(
          pinnedItem => pinnedItem.key !== rowItem.key,
        ),
      ]);
    }
    setHeadlinesAtom(
      headlinesAtom.map(item => {
        if (item.key === rowItem.key) {
          return {...rowItem, isPinned: !rowItem.isPinned};
        } else {
          return item;
        }
      }),
    );
    setShouldUpdateRenderingItems(true);
  };

  const onDeleteRow = (
    rowMap: RowMap<HeadlinesType>,
    rowItem: HeadlinesType,
  ) => {
    // console.log(rowItem, 'deleting ❌');
    rowMap[rowItem.key].closeRow();
    setPinnedHeadlinesAtom(
      pinnedHeadlinesAtom.filter(pinnedItem => pinnedItem.key !== rowItem.key),
    );
    setHeadlinesAtom(headlinesAtom.filter(item => item.key !== rowItem.key));
    setSize(prev => prev - 1);
    setShouldUpdateRenderingItems(true);
  };

  return {renderingItems, onTogglePinRow, onDeleteRow};
};

export default useHeadlines;
