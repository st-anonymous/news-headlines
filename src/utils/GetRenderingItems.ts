import {SetterOrUpdater} from 'recoil';
import {HeadlinesType} from '../types/Headlines';
import {SetAsyncStorage} from './AsyncStorage';

const GetRenderingItems = (
  headlines: Array<HeadlinesType>,
  pinnedHeadlines: Array<HeadlinesType>,
  size: number,
  setHeadlinesAtom: SetterOrUpdater<HeadlinesType[]>,
) => {
  let newRenderingItems: Array<HeadlinesType> = [];

  if (size <= pinnedHeadlines.length) {
    newRenderingItems = pinnedHeadlines.slice(0, size);
  } else {
    const alreadyRenderedUnpinnedItems = headlines.filter(
      headline => !headline.isPinned && headline.isRendered,
    );

    let newlyRenderedItems: Array<HeadlinesType> = [];

    let newItemsToBeAddedCount =
      size - pinnedHeadlines.length - alreadyRenderedUnpinnedItems.length;

    const newHeadlines = headlines.map(headline => {
      if (
        !headline.isPinned &&
        !headline.isRendered &&
        newItemsToBeAddedCount > 0
      ) {
        newlyRenderedItems = [
          ...newlyRenderedItems,
          {...headline, isRendered: true},
        ];
        newItemsToBeAddedCount--;
        return {...headline, isRendered: true};
      } else {
        return headline;
      }
    });

    setHeadlinesAtom(newHeadlines);
    SetAsyncStorage('headlines', newHeadlines);

    newRenderingItems = [
      ...pinnedHeadlines,
      ...newlyRenderedItems,
      ...alreadyRenderedUnpinnedItems,
    ];
    console.log(newRenderingItems, 'finalNewRenderingItems');
  }
  return newRenderingItems;
};

export default GetRenderingItems;
