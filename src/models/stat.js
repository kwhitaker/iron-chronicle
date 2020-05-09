import { types } from 'mobx-state-tree';

export const Stat = types
  .model('Stat', {
    name: types.string,
    min: types.number,
    max: types.number,
    value: types.number,
  })
  .actions((self) => ({
    inc() {
      const next = Math.min(self.max, self.value + 1);
      self.value = next;
    },
    dec() {
      const next = Math.max(self.min, self.value - 1);
      self.value = next;
    },
  }));
