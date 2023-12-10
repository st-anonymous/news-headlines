import {atom} from 'recoil';
import {HeadlinesType} from '../types/Headlines';

const HeadlinesAtom = atom<Array<HeadlinesType>>({
  key: 'HeadlinesAtom',
  default: [],
});

const PinnedHeadlinesAtom = atom<Array<HeadlinesType>>({
  key: 'PinnedHeadlinesAtom',
  default: [],
});

export {HeadlinesAtom, PinnedHeadlinesAtom};
