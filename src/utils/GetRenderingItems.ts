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
    // it would create an array of items that are rendered but not pinned...
    const alreadyRenderedUnpinnedItems = headlines.filter(
      headline => !headline.isPinned && headline.isRendered,
    );

    // total new items to be added would be size - total present items (i.e. pinned + unpinned)
    let newItemsToBeAddedCount =
      size - pinnedHeadlines.length - alreadyRenderedUnpinnedItems.length;

    // It would produce the Array for newly rendered items on each iteration...
    let newlyRenderedItems: Array<HeadlinesType> = [];

    headlines.map(headline => {
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

    const newlyRenderedItemsKeys = newlyRenderedItems.map(item => item.key);

    // rest of the array to be added to the last to show newly added items first...
    const restOfHeadlines = headlines.filter(
      headline => !newlyRenderedItemsKeys.includes(headline.key),
    );

    const newHeadlines = [...newlyRenderedItems, ...restOfHeadlines];

    // set headlines and store in async storage...
    setHeadlinesAtom(newHeadlines);
    SetAsyncStorage('headlines', newHeadlines);

    // first to show pinned items, then new items and lastly other rendered items...
    newRenderingItems = [
      ...pinnedHeadlines,
      ...newlyRenderedItems,
      ...alreadyRenderedUnpinnedItems,
    ];
  }

  return newRenderingItems;
};

export default GetRenderingItems;
