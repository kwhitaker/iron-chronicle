import { types } from 'mobx-state-tree';
import clamp from 'lodash/fp/clamp';

export const Attribute = types
  .model('Attribute', {
    name: types.string,
    value: types.number,
  })
  .actions((self) => ({
    setValue(nextVal) {
      self.value = clamp(1, 3, nextVal);
    },
  }));
