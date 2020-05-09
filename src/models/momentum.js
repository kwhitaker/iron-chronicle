import { types } from 'mobx-state-tree';
import clamp from 'lodash/fp/clamp';

export const Momentum = types
  .model({
    min: types.number,
    max: types.number,
    currentMax: types.number,
    resetValue: types.number,
    value: types.number,
  })
  .actions((self) => ({
    setValue(nextVal) {
      self.value = clamp(self.min, self.max, nextVal);
    },
    reset() {
      self.value = self.resetValue;
    },
    setResetValue(value) {
      const next = clamp(self.min, self.max, value);
      self.resetValue = next;
    },
    setCurrentMax(value) {
      const next = clamp(self.min, self.max, value);
      self.currentMax = next;
    },
  }));
