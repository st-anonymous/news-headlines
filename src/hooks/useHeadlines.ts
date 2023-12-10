/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {HeadlinesAtom, PinnedHeadlinesAtom} from '../data/Headlines';
import {SetAsyncStorage} from '../utils/AsyncStorage';
import {HeadlinesType} from '../types/Headlines';
import {RowMap} from 'react-native-swipe-list-view';
import GetRenderingItems from '../utils/GetRenderingItems';
import UserSettingsAtom from '../data/UserSettings';
import FetchHeadlinesFromAPI from '../utils/FetchHeadlines';

const useHeadlines = () => {
  const [headlinesAtom, setHeadlinesAtom] = useRecoilState(HeadlinesAtom); // All the headlines to be shown in original order...
  const [pinnedHeadlinesAtom, setPinnedHeadlinesAtom] =
    useRecoilState(PinnedHeadlinesAtom); // All the headlines that are pinned...
  const [renderingItems, setRenderingItems] = useState<Array<HeadlinesType>>(
    [],
  ); // It's the array that to be shown... (Here I've tried to maintain the original order so that on unpinning the item would be back at its original position)
  const [userSettingsAtom, setUserSettingsAtom] =
    useRecoilState(UserSettingsAtom); // for delay time change or manual refresh...
  const [size, setSize] = useState<number>(10); // Size of item array to be shown at any particalar time...
  const [deletedItemsCount, setDeletedItemsCount] = useState<number>(0); //count of total items deleted...
  const [shouldUpdateRenderingItems, setShouldUpdateRenderingItems] =
    useState(true); // at some instance while updating headline atom we don't want to update the rendering items, that's why it's used...

  useEffect(() => {
    if (size + deletedItemsCount >= 100) {
      (async () => {
        const headlines = await FetchHeadlinesFromAPI();
        // reset to initial if all headlines are exhausted... (as per requirement)
        setPinnedHeadlinesAtom([]);
        setHeadlinesAtom(headlines ? headlines : []);
        setSize(10);
        setDeletedItemsCount(0);
        setShouldUpdateRenderingItems(true);
      })();
    }
  }, [size]);

  useEffect(() => {
    // set interval for automatically update the feed...
    const autoUpdationTimer = setInterval(() => {
      setSize(prev => prev + 5);
      setShouldUpdateRenderingItems(true);
    }, userSettingsAtom.delay * 1000);
    // reset the timer and set as user changes the delay time...
    return () => {
      clearInterval(autoUpdationTimer);
    };
  }, [userSettingsAtom.delay]);

  useEffect(() => {
    // on manual refresh more news to be shown on feed...
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
      // GetRenderingItems calculates the items to be shown depending on the size, pinned and unpinned items...
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

  // on pinning/unpinning add/remove the items in pinnedHeadlines and also change the isPinned property in headlines array...
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

  // on delete remove from both headlines and from pinned and to update renderingItems setShouldUpdateRenderingItems to true
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
    setDeletedItemsCount(prev => prev + 1);
    setShouldUpdateRenderingItems(true);
  };

  return {renderingItems, onTogglePinRow, onDeleteRow};
};

export default useHeadlines;
