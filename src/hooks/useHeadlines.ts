import {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {HeadlinesAtom, PinnedHeadlinedsAtom} from '../data/Headlines';
import {SetAsyncStorage} from '../utils/AsyncStorage';
import {HeadlinesType} from '../types/Headlines';
import {RowMap} from 'react-native-swipe-list-view';

const useHeadlines = () => {
  const [headlinesAtom, setHeadlinesAtom] = useRecoilState(HeadlinesAtom);
  const [pinnedHeadlinedsAtom, setPinnedHeadlinedsAtom] =
    useRecoilState(PinnedHeadlinedsAtom);
  const [renderingItems, setRenderingItems] =
    useState<Array<HeadlinesType>>(headlinesAtom);

  useEffect(() => {
    const newRenderingItems = [
      ...pinnedHeadlinedsAtom,
      ...headlinesAtom.filter(item => !item.isPinned),
    ];
    setRenderingItems(newRenderingItems);
    SetAsyncStorage('headlines', headlinesAtom);
    SetAsyncStorage('pinnedHeadlines', pinnedHeadlinedsAtom);
  }, [headlinesAtom, pinnedHeadlinedsAtom]);

  const onTogglePinRow = (
    rowMap: RowMap<HeadlinesType>,
    rowItem: HeadlinesType,
  ) => {
    // console.log(rowItem, 'pinning 📌');
    rowMap[rowItem.key].closeRow();
    setHeadlinesAtom(
      headlinesAtom.map(item => {
        if (item.key === rowItem.key) {
          return {...rowItem, isPinned: !rowItem.isPinned};
        } else {
          return item;
        }
      }),
    );
    if (rowItem.isPinned) {
      setPinnedHeadlinedsAtom(
        pinnedHeadlinedsAtom.filter(
          pinnedItem => pinnedItem.key !== rowItem.key,
        ),
      );
    } else {
      setPinnedHeadlinedsAtom([
        {...rowItem, isPinned: true},
        ...pinnedHeadlinedsAtom.filter(
          pinnedItem => pinnedItem.key !== rowItem.key,
        ),
      ]);
    }
  };

  const onDeleteRow = (
    rowMap: RowMap<HeadlinesType>,
    rowItem: HeadlinesType,
  ) => {
    // console.log(rowItem, 'deleting ❌');
    rowMap[rowItem.key].closeRow();
    setPinnedHeadlinedsAtom(
      pinnedHeadlinedsAtom.filter(pinnedItem => pinnedItem.key !== rowItem.key),
    );
    setHeadlinesAtom(headlinesAtom.filter(item => item.key !== rowItem.key));
  };

  return {renderingItems, onTogglePinRow, onDeleteRow};
};

export default useHeadlines;
