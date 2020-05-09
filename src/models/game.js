import { types } from 'mobx-state-tree';
import { Character } from './character';
import { RollResult } from './roll-result';

export const Game = types
  .model('Game', {
    id: types.identifier,
    characters: types.map(Character),
    rolls: types.map(RollResult),
    journal: types.maybeNull(types.string),
  })
  .actions((self) => ({
    setJournal(nextVal) {
      self.journal = nextVal;
    },
  }));
