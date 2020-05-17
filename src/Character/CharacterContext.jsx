/* eslint-disable consistent-return */
import produce from 'immer';
import clamp from 'lodash/fp/clamp';
import merge from 'lodash/fp/merge';
import React, { createContext, useContext, useReducer } from 'react';
import shortid from 'shortid';
import {
  createNewTrack,
  markTrackProgress,
  resetProgress,
  updateTrack,
} from '../components/ProgressTrack/actions';

export const ASSET_ABILITY_ADDED = 'ASSET_ABILITY_ADDED';
export const ASSET_ABILITY_TOGGLED = 'ASSET_ABILITY_TOGGLED';
export const ASSET_ABILITY_UPDATED = 'ASSET_ABILITY_UPDATED';
export const ASSET_ADDED = 'ASSET_ADDED';
export const ASSET_DELETED = 'ASSET_DELETED';
export const ASSET_UPDATED = 'ASSET_UPDATED';
export const ATTR_UPDATED = 'ATTR_UPDATED';
export const BANE_UPDATED = 'BANE_UPDATED';
export const BURDEN_UPDATED = 'BURDEN_UPDATED';
export const CHARACTER_CREATED = 'CHARACTER_CREATED';
export const CHARACTER_LOADED = 'CHARACTER_LOADED';
export const CONDITION_UPDATED = 'CONDITION_UPDATED';
export const JOURNAL_UPDATED = 'JOURNAL_UPDATED';
export const MOMENTUM_MAX_UPDATED = 'MOMENTUM_MAX_UPDATED';
export const MOMENTUM_RESET = 'MOMENTUM_RESET';
export const MOMENTUM_RESET_UPDATED = 'MOMENTUM_RESET_UPDATED';
export const MOMENTUM_UPDATED = 'MOMENTUM_UPDATED';
export const NAME_UPDATED = 'NAME_UPDATED';
export const PROGRESS_TRACK_ADDED = 'PROGRESS_TRACK_ADDED';
export const PROGRESS_TRACK_DELETED = 'PROGRESS_TRACK_DELETED';
export const PROGRESS_TRACK_MARKED = 'PROGRESS_TRACK_MARKED';
export const PROGRESS_TRACK_RESET = 'PROGRESS_TRACK_RESET';
export const PROGRESS_TRACK_UPDATED = 'PROGRESS_TRACK_UPDATED';
export const STAT_UPDATED = 'STAT_UPDATED';
export const XP_UPDATED = 'XP_UPDATED';

export const defaultMomentum = {
  min: -6,
  max: 10,
  currentMax: 10,
  value: 2,
  resetValue: 2,
};

export const initialState = {
  id: null,
  name: null,
  xp: 0,
  attributes: {
    edge: 1,
    heart: 1,
    iron: 1,
    shadow: 1,
    wits: 1,
  },
  conditions: {
    wounded: false,
    shaken: false,
    unprepared: false,
    encumbered: false,
  },
  banes: {
    maimed: false,
    corrupted: false,
  },
  burdens: {
    cursed: false,
    tormented: false,
  },
  stats: {
    health: {
      min: 0,
      max: 5,
      value: 5,
    },
    spirit: {
      min: 0,
      max: 5,
      value: 5,
    },
    supply: {
      min: 0,
      max: 5,
      value: 5,
    },
  },
  momentum: defaultMomentum,
  progressTracks: {},
  assets: {},
  journal: '',
};

const charReducerFunc = (draft, { payload, type }) => {
  switch (type) {
    case ASSET_ABILITY_ADDED:
      draft.assets[payload.assetId].abilities[payload.ability.id] =
        payload.ability;
      return;
    case ASSET_ABILITY_TOGGLED:
      draft.assets[payload.assetId].abilities[payload.ability.id].available =
        payload.available;
      return;
    case ASSET_ABILITY_UPDATED:
      draft.assets[payload.assetId].abilities[payload.ability.id] = payload;
      return;
    case ASSET_ADDED:
      draft.assets[payload.id] = payload;
      return;
    case ASSET_UPDATED:
      draft.assets[payload.id] = payload;
      return;
    case ASSET_DELETED:
      delete draft.assets[payload.id];
      return;
    case ATTR_UPDATED:
      draft.attributes[payload.name] = payload.value;
      return;
    case BANE_UPDATED:
      draft.banes[payload.name] = payload.active;
      return;
    case BURDEN_UPDATED:
      draft.burdens[payload.name] = payload.active;
      return;
    case CHARACTER_CREATED:
      return merge(initialState, payload, { id: shortid() });
    case CHARACTER_LOADED:
      return payload;
    case CONDITION_UPDATED:
      draft.conditions[payload.name] = payload.active;
      return;
    case JOURNAL_UPDATED:
      draft.journal = payload;
      return;
    case MOMENTUM_MAX_UPDATED:
      draft.momentum.currentMax = payload;
      return;
    case MOMENTUM_RESET:
      draft.momentum.value = draft.momentum.resetValue;
      return;
    case MOMENTUM_RESET_UPDATED:
      draft.momentum.resetValue = payload;

      if (draft.momentum.value > payload) {
        draft.momentum.value = payload;
      }

      return;
    case MOMENTUM_UPDATED: {
      const { min, max } = draft.momentum;
      draft.momentum.value = clamp(min, max, payload);
      return;
    }
    case NAME_UPDATED:
      draft.name = payload;
      return;
    case PROGRESS_TRACK_ADDED: {
      const nextTrack = createNewTrack(payload);
      draft.progressTracks[nextTrack.id] = nextTrack;
      return;
    }
    case PROGRESS_TRACK_DELETED:
      delete draft.progressTracks[payload.id];
      return;
    case PROGRESS_TRACK_MARKED:
      draft.progressTracks[payload.id] = markTrackProgress(payload);
      return;
    case PROGRESS_TRACK_RESET:
      draft.progressTracks[payload.id] = resetProgress(payload);
      return;
    case PROGRESS_TRACK_UPDATED:
      draft.progressTracks[payload.id] = updateTrack(payload);
      return;
    case STAT_UPDATED: {
      const { min, max } = draft.stats[payload.name];
      draft.stats[payload.name] = clamp(min, max, payload.value);
      return;
    }
    case XP_UPDATED:
      draft.xp = clamp(0, 30, payload);
      return;
    default:
      return draft;
  }
};

const characterReducer = produce(charReducerFunc);

const CharacterStateContext = createContext(null);
const CharacterDispatchContext = createContext(null);

export const CharacterProvider = ({ children }) => {
  const [character, dispatch] = useReducer(characterReducer, initialState);

  return (
    <CharacterStateContext.Provider value={character}>
      <CharacterDispatchContext.Provider value={dispatch}>
        {children}
      </CharacterDispatchContext.Provider>
    </CharacterStateContext.Provider>
  );
};

export const useCharacter = () => {
  const context = useContext(CharacterStateContext);

  if (context === null) {
    throw new Error('useCharacter must be used with a CharacterProvider');
  }

  return context;
};

export const useCharacterDispatch = () => {
  const context = useContext(CharacterDispatchContext);

  if (context === null) {
    throw new Error(
      'useCharacterDispatch must be used with a CharacterProvider',
    );
  }

  return context;
};
