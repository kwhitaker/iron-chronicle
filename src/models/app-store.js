import range from 'lodash/fp/range';
import { LoremIpsum } from 'lorem-ipsum';
import { onPatch, types } from 'mobx-state-tree';
import { createContext, useContext } from 'react';
import { Character } from './character';
import { Game } from './game';

const AppStore = types.model('App Store', {
  games: types.array(Game),
  characters: types.array(Character),
  currentGame: types.reference(Game),
});

export const appStore = AppStore.create({
  games: [
    {
      id: 'foo',
      title: 'test game',
      characters: {},
      rolls: {},
      journal: new LoremIpsum({
        sentencesPerParagraph: {
          max: 8,
          min: 4,
        },
        wordsPerSentence: {
          max: 16,
          min: 4,
        },
      }).generateParagraphs(20),
    },
  ],
  currentGame: 'foo',
  characters: [
    {
      id: 'bar',
      name: 'Yo Mama',
      attributes: [
        { name: 'edge', value: 1 },
        { name: 'heart', value: 1 },
        { name: 'iron', value: 1 },
        { name: 'shadow', value: 1 },
        { name: 'wits', value: 1 },
      ],
      xp: 0,
      conditions: [],
      banes: [],
      burdens: [],
      stats: [
        {
          name: 'health',
          min: 0,
          max: 5,
          value: 5,
        },
        {
          name: 'spirit',
          min: 0,
          max: 5,
          value: 5,
        },
        {
          name: 'supply',
          min: 0,
          max: 5,
          value: 5,
        },
      ],
      momentum: {
        min: -6,
        max: 10,
        resetValue: 2,
        currentMax: 10,
        value: 2,
      },
      vows: [
        {
          id: 'vow1',
          type: 'vow',
          name: 'test vow',
          marks: range(0, 11).map((i) => ({
            id: i.toString(),
            value: 0,
          })),
          difficulty: 'formidable',
        },
      ],
      bonds: [
        {
          id: 'bond1',
          type: 'bond',
          name: 'test bond',
          marks: range(0, 11).map((i) => ({
            id: i.toString(),
            value: 0,
          })),
          difficulty: 'bond',
        },
      ],
      miscProgress: [
        {
          id: 'combat1',
          type: 'combat',
          name: 'test combat',
          marks: range(0, 11).map((i) => ({
            id: i.toString(),
            value: 0,
          })),
          difficulty: 'extreme',
        },
      ],
      assets: [
        {
          id: 'asset1',
          name: 'test asset',
          type: 'companion',
          health: 3,
          abilities: [
            { id: 'ability1', description: 'foo', available: true },
            { id: 'ability2', description: 'bar', available: false },
          ],
        },
      ],
    },
  ],
});

// onSnapshot(appStore, (snapshot) => {

// });

onPatch(appStore, (patch) => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('Patch  ', patch);
  }
});
export const AppStoreContext = createContext(null);

export const AppStoreProvider = AppStoreContext.Provider;
export const useAppStore = () => {
  const store = useContext(AppStoreContext);
  if (store === null) {
    throw new Error('useAppStore must be used with an AppStoreProvider.');
  }

  return store;
};
