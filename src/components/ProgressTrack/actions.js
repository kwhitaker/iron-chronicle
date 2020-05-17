import produce from 'immer';
import pluck from 'lodash/fp/pluck';
import sum from 'lodash/fp/sum';
import compose from 'lodash/fp/compose';
import times from 'lodash/fp/times';
import shortid from 'shortid';
import { difficultyLevels, progressTrackTypes, MAX_MARK_VAL } from './types';

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

export const sumProgress = compose(sum, pluck('value'));

const trackComplete = (marks = []) =>
  sumProgress(marks) >= marks.length * MAX_MARK_VAL;

const makeMarks = (numMarks = 10) =>
  times(() => ({ id: shortid(), value: 0 }), numMarks);

export const createNewTrack = ({
  type = progressTrackTypes.combat,
  name = 'new progress track',
  difficulty = difficultyLevels.troublesome,
}) => ({
  id: shortid(),
  type,
  name,
  difficulty,
  marks: makeMarks(),
});

export const createNewBond = ({ name = 'new bond' }) =>
  createNewTrack({
    name,
    type: progressTrackTypes.bond,
    difficulty: difficultyLevels.bond,
  });

export const createNewVow = ({ name = 'new vow' }) =>
  createNewTrack({
    name,
    type: progressTrackTypes.vow,
    difficulty: difficultyLevels.epic,
  });

export const markTrackProgress = produce((draft) => {
  const { difficulty, marks = [] } = draft;
  if (trackComplete(marks)) {
    return draft;
  }

  const lastProgress = sumProgress(marks);
  const nextProgress = getProgressForDifficulty(lastProgress, difficulty);
  let delta = nextProgress - lastProgress;

  draft.marks.forEach((mark) => {
    if (mark.value >= MAX_MARK_VAL || delta === 0) {
      return;
    }

    if (delta <= MAX_MARK_VAL) {
      mark.value += delta;
      delta = 0;
      return;
    }

    delta -= MAX_MARK_VAL;
    mark.value += MAX_MARK_VAL;
  });

  return draft;
});

export const resetProgress = produce((draft) => {
  draft.marks.forEach((mark) => {
    mark.value = 0;
  });

  return draft;
});

export const completedMarksCount = (marks = []) =>
  marks.filter((m) => m.value === MAX_MARK_VAL).length;

export const updateTrack = produce((draft, { name, difficulty, type }) => {
  if (name) {
    draft.name = name;
  }

  if (difficulty) {
    draft.difficulty = difficulty;
  }

  if (type) {
    draft.type = type;
  }

  if (type || difficulty) {
    resetProgress(draft);
  }

  return draft;
});
