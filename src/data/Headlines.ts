import {atom} from 'recoil';
import {HeadlinesType} from '../types/Headlines';

const HeadlinesAtom = atom<Array<HeadlinesType>>({
  key: 'HeadlinesAtom',
  default: [],
});

const PinnedHeadlinedsAtom = atom<Array<HeadlinesType>>({
  key: 'PinnedHeadlinedsAtom',
  default: [],
});

export {HeadlinesAtom, PinnedHeadlinedsAtom};
