import { types } from 'mobx-state-tree';
import clamp from 'lodash/fp/clamp';

export const Momentum = types
  .model({
    min: types.number,
    max: types.number,
    resetValue: types.number,
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
    reset() {
      self.value = self.resetValue;
    },
    updateResetValue(value) {
      const next = clamp(self.min, self.max, value);
      self.resetValue = next;
    },
  }));
