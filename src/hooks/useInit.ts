/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import Splash from '../screens/Splash';
import Home from '../screens/Home';
import {GetAsyncStorage, SetAsyncStorage} from '../utils/AsyncStorage';
import {useSetRecoilState} from 'recoil';
import {HeadlinesAtom, PinnedHeadlinesAtom} from '../data/Headlines';
import axios from 'axios';

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
        try {
          const news = await axios.get(
            'https://newsapi.org/v2/everything?apiKey=b6684226df7948ddb6df5ad210a9c9dd&q=india',
          );
          const articles = news.data.articles;
          headlines = articles.map((article: any) => {
            return {
              title: article.title,
              key: article.publishedAt.toString(),
              isPinned: false,
            };
          });
        } catch (error) {
          console.log(error);
        }
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
