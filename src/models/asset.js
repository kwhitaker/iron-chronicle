import { types } from 'mobx-state-tree';

export const assetTypes = {
  companion: 'companion',
  path: 'path',
  talent: 'combat talent',
  ritual: 'ritual',
};

export const AssetAbility = types
  .model('Asset Ability', {
    id: types.identifier,
    description: types.string,
    available: types.boolean,
  })
  .actions((self) => ({
    toggleAvailable() {
      self.available = !self.available;
    },
    setDescription(nextDesc) {
      self.description = nextDesc;
    },
  }));

export const Asset = types.model('Asset', {
  id: types.identifier,
  name: types.string,
  type: types.string,
  description: types.maybeNull(types.string),
  health: types.maybeNull(types.number),
  abilities: types.array(AssetAbility),
});
