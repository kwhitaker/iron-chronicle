import clamp from 'lodash/fp/clamp';
import { types } from 'mobx-state-tree';
import { Asset } from './asset';
import { Attribute } from './attribute';
import { Debility } from './debility';
import { Momentum } from './momentum';
import { ProgressTrack } from './progress-track';
import { Stat } from './stat';

const getTrackKey = (type) => {
  if (type === 'bond') {
    return 'bonds';
  }

  if (type === 'vow') {
    return 'vows';
  }

  return 'miscProgress';
};

export const Character = types
  .model({
    id: types.identifier,
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
    maybeAddTrack(nextTrack) {
      if (!nextTrack) {
        throw new Error('No track provided to addProgressTrack');
      }

      const category = getTrackKey(nextTrack.type);

      if (!self[category].find((track) => track.id === nextTrack.id)) {
        self[category].push(nextTrack);
      }
    },
  }));
