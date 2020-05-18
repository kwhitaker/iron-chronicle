import range from 'lodash/fp/range';
import { onPatch, types } from 'mobx-state-tree';
import { createContext, useContext } from 'react';
import { Character } from './character';
import { Game } from './game';

const AppStore = types
  .model('App Store', {
    games: types.array(Game),
    characters: types.array(Character),
    currentGame: types.reference(Game),
    currentCharacter: types.safeReference(Character),
  })
  .actions((self) => ({
    setCurrentGame(gameId) {
      self.currentGame = gameId;
    },
    setCurrentCharacter(charId) {
      self.currentCharacter = charId;
    },
  }));

export const appStore = AppStore.create({
  games: [
    {
      id: 'foo',
      title: 'test game',
      characters: {},
      rolls: {},
      journal: '',
    },
  ],
  currentGame: 'foo',
  currentCharacter: 'bar',
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
      conditions: {
        wounded: {
          name: 'wounded',
          active: false,
        },
        shaken: {
          name: 'shaken',
          active: false,
        },
        unprepared: {
          name: 'unprepared',
          active: false,
        },
        encumbered: {
          name: 'encumbered',
          active: false,
        },
      },
      banes: {
        maimed: {
          name: 'maimed',
          active: false,
        },
        corrupted: {
          name: 'corrupted',
          active: false,
        },
      },
      burdens: {
        cursed: {
          name: 'cursed',
          active: false,
        },
        tormented: {
          name: 'tormented',
          active: false,
        },
      },
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
          maxHealth: 5,
          description: 'fizz bang bin bar buzz bar',
          abilities: [
            { id: 'ability1', description: 'foo', available: true },
            { id: 'ability2', description: 'bar', available: false },
            { id: 'ability3', description: 'bar', available: false },
            { id: 'ability4', description: 'bar', available: false },
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
