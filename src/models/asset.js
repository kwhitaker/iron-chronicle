import { types } from 'mobx-state-tree';
import clamp from 'lodash/fp/clamp';

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

export const Asset = types
  .model('Asset', {
    id: types.identifier,
    name: types.string,
    type: types.string,
    description: types.maybeNull(types.string),
    health: types.maybeNull(types.number),
    maxHealth: types.maybeNull(types.number),
    abilities: types.array(AssetAbility),
  })
  .actions((self) => ({
    setMaxHealth(nextMax) {
      self.maxHealth = nextMax;

      if (nextMax === null) {
        self.health = null;
      }
    },
    setHealth(nextHealth) {
      if (Number.isNaN(nextHealth)) {
        return;
      }

      if (self.maxHealth === null) {
        self.maxHealth = nextHealth;
      }

      self.health = clamp(0, self.maxHealth, nextHealth);
    },
  }));
