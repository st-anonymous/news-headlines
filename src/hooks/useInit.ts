import {useState} from 'react';
import Splash from '../screens/Splash';
import Home from '../screens/Home';
import {GetAsyncStorage} from '../utils/AsyncStorage';

export type ScreenType = React.JSX.Element;

const useInit = () => {
  const [Screen, setScreen] = useState<ScreenType>(Splash);
  (async () => {
    const headlines = await GetAsyncStorage('headlines');
    if (headlines) {
    } else {
    }
  })();
  setTimeout(() => {
    setScreen(Home);
  }, 5000);
  return {Screen};
};
export default useInit;
