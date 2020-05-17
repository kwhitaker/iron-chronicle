import produce from 'immer';
import shortid from 'shortid';
import isObject from 'lodash/fp/isObject';

export const assetTypes = {
  companion: 'companion',
  path: 'path',
  talent: 'combat talent',
  ritual: 'ritual',
};

export const defaultAsset = {
  type: assetTypes.companion,
  name: null,
  id: null,
  description: null,
  health: null,
  abilities: {},
};

const defaultAbility = {
  id: null,
  description: null,
  available: false,
};

export const createAsset = (payload = {}) => ({
  ...defaultAsset,
  ...payload,
  id: shortid(),
});

export const updateAsset = produce((draft, payload = {}) => {
  const { name, type, description, health, abilities } = payload;

  if (name) {
    draft.name = name;
  }

  if (type) {
    draft.type = type;
  }

  if (description) {
    draft.description = description;
  }

  if (health !== undefined || health !== null) {
    draft.health = health;
  }

  if (isObject(abilities)) {
    draft.abilities = abilities;
  }

  return draft;
});

export const createAssetAbility = (payload) => ({
  ...defaultAbility,
  ...payload,
  id: shortid(),
});

export const updateAssetAbility = produce((draft, payload = {}) => {
  const { description, available } = payload;

  if (description) {
    draft.description = description;
  }

  if (available !== draft.available) {
    draft.available = available;
  }

  return draft;
});

export const toggleAbilityAvailable = produce((draft) => {
  draft.available = !draft.available;

  return draft;
});
