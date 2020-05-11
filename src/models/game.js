import { types } from 'mobx-state-tree';
import orderBy from 'lodash/fp/orderBy';
import { Character } from './character';
import { RollResult } from './roll-result';

export const Game = types
  .model('Game', {
    id: types.identifier,
    title: types.string,
    characters: types.map(Character),
    rolls: types.map(RollResult),
    journal: types.maybeNull(types.string),
  })
  .actions((self) => ({
    setJournal(nextVal) {
      self.journal = nextVal;
    },
    addRollResult(nextResult) {
      self.rolls.set(nextResult.id, nextResult);
    },
  }))
  .views((self) => ({
    get rollsDesc() {
      return orderBy('dateRolled', 'asc', Array.from(self.rolls.values()));
    },
  }));
