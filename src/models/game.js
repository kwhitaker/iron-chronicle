import { types } from 'mobx-state-tree';
import { Character } from './character';
import { RollResult } from './roll-result';

export const Game = types.model('Game', {
  characters: types.map(Character),
  rolls: types.map(RollResult),
});
