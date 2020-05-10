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
  games: [{ id: 'foo', title: 'test game', characters: {}, rolls: {} }],
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
      vows: [],
      bonds: [],
      miscProgress: [],
      assets: [],
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
