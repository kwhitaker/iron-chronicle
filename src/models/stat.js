import { types } from 'mobx-state-tree';
import clamp from 'lodash/fp/clamp';

export const Stat = types
  .model('Stat', {
    name: types.string,
    min: types.number,
    max: types.number,
    value: types.number,
  })
  .actions((self) => ({
    setValue(nextVal) {
      self.value = clamp(self.min, self.max, nextVal);
    },
  }));
