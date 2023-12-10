import {atom} from 'recoil';
import {HeadlinesType} from '../types/Headlines';

const HeadlinesAtom = atom<Array<HeadlinesType>>({
  key: 'HeadlinesAtom',
  default: [],
});

export default HeadlinesAtom;
