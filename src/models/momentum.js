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
    setResetValue(nextReset) {
      const next = clamp(self.min, self.max, nextReset);
      self.resetValue = next;
    },
    setCurrentMax(nextMax) {
      const next = clamp(self.min, self.max, nextMax);
      self.currentMax = next;

      // TODO add test for this
      if (self.value > next) {
        self.value = next;
      }
    },
  }));
