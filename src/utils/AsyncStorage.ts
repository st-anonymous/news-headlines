import AsyncStorage from '@react-native-async-storage/async-storage';
import {HeadlinesType} from '../types/Headlines';

const GetAsyncStorage = async (key: string) => {
  const asyncStorageValue = await AsyncStorage.getItem(key);
  return JSON.parse(asyncStorageValue as string);
};

const SetAsyncStorage = (key: string, valueObj: Array<HeadlinesType>) => {
  // we should not store isRendered value as that would not be appropriate...
  const modifiedValueObj = valueObj.map(item => {
    return {
      key: item.key,
      title: item.title,
      isPinned: item.isPinned,
    };
  });
  const asyncStorageValue = JSON.stringify(modifiedValueObj);
  AsyncStorage.setItem(key, asyncStorageValue);
};

export {GetAsyncStorage, SetAsyncStorage};
