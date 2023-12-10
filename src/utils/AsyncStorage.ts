import AsyncStorage from '@react-native-async-storage/async-storage';
import {HeadlinesType} from '../types/Headlines';

const GetAsyncStorage = async (key: string) => {
  const asyncStorageValue = await AsyncStorage.getItem(key);
  return JSON.parse(asyncStorageValue as string);
};

const SetAsyncStorage = (key: string, valueObj: Array<HeadlinesType>) => {
  const asyncStorageValue = JSON.stringify(valueObj);
  AsyncStorage.setItem(key, asyncStorageValue);
};

export {GetAsyncStorage, SetAsyncStorage};
