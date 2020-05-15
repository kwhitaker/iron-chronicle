import { types } from 'mobx-state-tree';
import clamp from 'lodash/fp/clamp';
import { Debility } from './debility';
import { Stat } from './stat';
import { Momentum } from './momentum';
import { ProgressTrack } from './progress-track';
import { Attribute } from './attribute';
import { Asset } from './asset';

const trackKeys = ['vows', 'bonds', 'miscProgress'];

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
    setXP(nextXP) {
      self.xp = clamp(0, 30, nextXP);
    },
    setName(nextName) {
      self.name = nextName;
    },
    addProgressTrack(category = 'miscProgress', nextTrack) {
      if (!nextTrack) {
        throw new Error('No track provided to addProgressTrack');
      }

      if (!trackKeys.includes(category)) {
        throw new Error('Invalid track category');
      }

      self[category].push(nextTrack);
    },
  }));
