import { types } from 'mobx-state-tree';
import { Debility } from './debility';
import { Stat } from './stat';
import { Momentum } from './momentum';
import { ProgressTrack } from './progress-track';
import { Attribute } from './attribute';
import { Asset } from './asset';

export const Character = types
  .model({
    name: types.string,
    attributes: types.array(Attribute),
    xp: types.number,
    conditions: types.array(Debility),
    banes: types.array(Debility),
    burdens: types.array(Debility),
    stats: types.array(Stat),
    momentum: Momentum,
    vows: types.array(ProgressTrack),
    bonds: types.array(ProgressTrack),
    miscProgress: types.array(ProgressTrack),
    assets: types.array(Asset),
  })
  .actions((self) => ({
    addXP(addend) {
      const next = Math.min(30, self.xp + addend);
      self.xp = next;
    },
    subXP(subtrahend) {
      const next = Math.max(0, self.xp - subtrahend);
      self.xp = next;
    },
  }));
