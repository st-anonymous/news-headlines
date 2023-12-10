/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import Splash from '../screens/Splash';
import Home from '../screens/Home';
import {GetAsyncStorage, SetAsyncStorage} from '../utils/AsyncStorage';
import {useSetRecoilState} from 'recoil';
import {HeadlinesAtom, PinnedHeadlinesAtom} from '../data/Headlines';
import FetchHeadlinesFromAPI from '../utils/FetchHeadlines';

export type ScreenType = React.JSX.Element;

const useInit = () => {
  const [Screen, setScreen] = useState<ScreenType>(Splash);
  const setHeadlinesAtom = useSetRecoilState(HeadlinesAtom);
  const setPinnedHeadlinesAtom = useSetRecoilState(PinnedHeadlinesAtom);
  useEffect(() => {
    (async () => {
      let headlines = await GetAsyncStorage('headlines');
      let pinnedHeadlines = await GetAsyncStorage('pinnedHeadlines');
      if (!headlines) {
        headlines = await FetchHeadlinesFromAPI();
        SetAsyncStorage('headlines', headlines);
      }
      setHeadlinesAtom(headlines);
      if (pinnedHeadlines) {
        setPinnedHeadlinesAtom(pinnedHeadlines);
      }
      setTimeout(() => {
        setScreen(Home);
      }, 3000);
    })();
  }, []);
  return {Screen};
};
export default useInit;
