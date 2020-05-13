import { types } from 'mobx-state-tree';
import clamp from 'lodash/fp/clamp';
import pluck from 'lodash/fp/pluck';
import sum from 'lodash/fp/sum';
import compose from 'lodash/fp/compose';

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

const getProgressForDifficulty = (
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
    id: types.identifier,
    value: types.number,
  })
  .actions((self) => ({
    setValue(value) {
      self.value = clamp(0, MAX_MARK_VAL, value);
    },
  }));

export const ProgressTrack = types
  .model('Progress Track', {
    id: types.identifier,
    type: types.string,
    name: types.string,
    marks: types.array(ProgressMark),
    difficulty: types.string,
  })
  .views((self) => ({
    get totalProgress() {
      return sumProgress(self.marks);
    },
    get completedMarks() {
      return self.marks.filter((m) => m.value === MAX_MARK_VAL).length;
    },
    get isComplete() {
      return self.totalProgress >= MAX_MARK_VAL * self.marks.length;
    },
  }))
  .actions((self) => ({
    markProgress() {
      if (self.isComplete) {
        return;
      }

      const lastProgress = self.totalProgress;
      const nextProgress = getProgressForDifficulty(
        lastProgress,
        self.difficulty,
      );

      let delta = nextProgress - lastProgress;

      self.marks.forEach((mark) => {
        if (mark.value >= MAX_MARK_VAL || delta === 0) {
          return;
        }

        if (delta <= MAX_MARK_VAL) {
          mark.setValue(mark.value + delta);
          delta = 0;
          return;
        }

        delta -= MAX_MARK_VAL;
        mark.setValue(mark.value + delta);
      });
    },
    resetProgress() {
      self.marks.forEach((mark) => mark.setValue(0));
    },
  }));
