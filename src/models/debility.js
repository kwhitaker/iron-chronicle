import { types } from 'mobx-state-tree';

export const Debility = types
  .model('Debility', {
    name: types.string,
    active: types.boolean,
  })
  .actions((self) => ({
    toggle() {
      self.active = !self.active;
    },
  }));
