/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import Splash from '../screens/Splash';
import Home from '../screens/Home';
import {GetAsyncStorage, SetAsyncStorage} from '../utils/AsyncStorage';
import {useSetRecoilState} from 'recoil';
import {HeadlinesAtom, PinnedHeadlinedsAtom} from '../data/Headlines';
import axios from 'axios';

export type ScreenType = React.JSX.Element;

const useInit = () => {
  const [Screen, setScreen] = useState<ScreenType>(Splash);
  const setHeadlinesAtom = useSetRecoilState(HeadlinesAtom);
  const setPinnedHeadlinedsAtom = useSetRecoilState(PinnedHeadlinedsAtom);
  useEffect(() => {
    (async () => {
      let headlines = await GetAsyncStorage('headlines');
      let pinnedHeadlines = await GetAsyncStorage('pinnedHeadlines');
      console.log(headlines, 'headlines');
      console.log(pinnedHeadlines, 'pinnedHeadlines');
      if (!headlines) {
        const news = await axios.get(
          'https://newsapi.org/v2/top-headlines?country=in&apiKey=b6684226df7948ddb6df5ad210a9c9dd',
        );
        const articles = news.data.articles;
        headlines = articles.map((article: any) => {
          return {
            title: article.title,
            key: article.publishedAt.toString(),
            isPinned: false,
          };
        });
        SetAsyncStorage('headlines', headlines);
      }
      setHeadlinesAtom(headlines);
      if (pinnedHeadlines) {
        setPinnedHeadlinedsAtom(pinnedHeadlines);
      }
      setTimeout(() => {
        setScreen(Home);
      }, 3000);
    })();
  }, []);
  return {Screen};
};
export default useInit;
