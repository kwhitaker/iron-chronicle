import { onSnapshot, types } from 'mobx-state-tree';
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
      attributes: [],
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

onSnapshot(appStore, (snapshot) => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('Snapshot ', snapshot);
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
