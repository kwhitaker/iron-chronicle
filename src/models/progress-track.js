import { types } from 'mobx-state-tree';
import pluck from 'lodash/fp/pluck';
import sum from 'lodash/fp/sum';
import compose from 'lodash/fp/compose';
import clamp from 'lodash/fp/clamp';

export const MAX_MARK_VAL = 4;

export const difficultyLevels = {
  troublesome: 'troublesome',
  dangerous: 'dangerous',
  formidable: 'formidable',
  extreme: 'extreme',
  epic: 'epic',
  bond: 'bond',
};

export const progressTrackTypes = {
  bond: 'bond',
  vow: 'vow',
  combat: 'combat',
  journey: 'journey',
  other: 'other',
};

const updateProgress = (
  currentProgress = 0,
  difficulty = difficultyLevels.troublesome,
) => {
  let nextProgress;
  switch (difficulty) {
    case difficultyLevels.troublesome:
      nextProgress = currentProgress + MAX_MARK_VAL * 3;
      break;
    case difficultyLevels.dangerous:
      nextProgress = currentProgress + MAX_MARK_VAL * 2;
      break;
    case difficultyLevels.formidable:
      nextProgress = currentProgress + MAX_MARK_VAL;
      break;
    case difficultyLevels.extreme:
      nextProgress = currentProgress + MAX_MARK_VAL / 2;
      break;
    case difficultyLevels.epic:
      nextProgress = currentProgress + 1;
      break;
    case difficultyLevels.bond:
      nextProgress = currentProgress + 1;
      break;
    default:
      nextProgress = currentProgress;
  }

  return nextProgress;
};

const sumProgress = compose(sum, pluck('value'));

export const ProgressMark = types
  .model('Progress Mark', {
    value: types.number,
  })
  .actions((self) => ({
    updateValue(nextVal) {
      self.value = clamp(0, MAX_MARK_VAL, nextVal);
    },
  }));

export const ProgressTrack = types
  .model('Progress Track', {
    type: types.string,
    name: types.string,
    marks: types.array(ProgressMark),
    difficulty: types.string,
  })
  .views((self) => ({
    get totalProgress() {
      return sumProgress(self.marks);
    },
  }))
  .actions((self) => ({
    markProgress() {
      const lastProgress = self.totalProgress;
      const nextProgress = updateProgress(lastProgress, self.difficulty);
      let delta = nextProgress - lastProgress;

      self.marks.forEach((mark) => {
        if (mark.value >= MAX_MARK_VAL || delta === 0) {
          return;
        }

        if (delta <= MAX_MARK_VAL) {
          mark.updateValue(mark.value + delta);
          delta = 0;
          return;
        }

        delta -= MAX_MARK_VAL;
        mark.updateValue(mark.value + delta);
      });
    },
    resetProgress() {
      self.marks.forEach((mark) => mark.updateValue(0));
    },
  }));
