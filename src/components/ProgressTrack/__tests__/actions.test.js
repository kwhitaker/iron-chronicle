import omit from 'lodash/fp/omit';
import { describe } from 'riteway';
import {
  completedMarksCount,
  createNewTrack,
  createNewBond,
  createNewVow,
  updateTrack,
  sumProgress,
  markTrackProgress,
  resetProgress,
} from '../actions';
import { difficultyLevels, progressTrackTypes, MAX_MARK_VAL } from '../types';

const noIdOrMarks = omit(['id', 'marks']);

describe('createNewTrack()', async (assert) => {
  assert({
    given: 'A payload with a name',
    should:
      'return a new progress track with that name and default type and difficulty',
    actual: noIdOrMarks(createNewTrack({ name: 'foo' })),
    expected: {
      name: 'foo',
      type: progressTrackTypes.combat,
      difficulty: difficultyLevels.troublesome,
    },
  });

  assert({
    given: 'a payload with a type',
    should:
      'return a new progress track with that type and default name and difficulty',
    actual: noIdOrMarks(createNewTrack({ type: progressTrackTypes.bond })),
    expected: {
      name: 'new progress track',
      type: progressTrackTypes.bond,
      difficulty: difficultyLevels.troublesome,
    },
  });

  assert({
    given: 'a payload with a difficulty',
    should:
      'return a new progress track with that difficulty and default name and type',
    actual: noIdOrMarks(createNewTrack({ difficulty: difficultyLevels.epic })),
    expected: {
      name: 'new progress track',
      type: progressTrackTypes.combat,
      difficulty: difficultyLevels.epic,
    },
  });

  assert({
    given: 'the function returns a new track',
    should: 'assign an id',
    actual: !!createNewTrack({}).id,
    expected: true,
  });
});

describe('createNewBound()', async (assert) => {
  assert({
    given: 'a payload with a name',
    should: `create a new bond with that name, and a type: ${progressTrackTypes.bond}, difficulty: ${difficultyLevels.bond}`,
    actual: noIdOrMarks(createNewBond({ name: 'foo' })),
    expected: {
      name: 'foo',
      type: progressTrackTypes.bond,
      difficulty: difficultyLevels.bond,
    },
  });

  assert({
    given: 'a payload with a name',
    should: 'create a new bond with the default name',
    actual: noIdOrMarks(createNewBond({})),
    expected: {
      name: 'new bond',
      type: progressTrackTypes.bond,
      difficulty: difficultyLevels.bond,
    },
  });

  assert({
    given: 'it receives a difficulty or type',
    should: `ignore them and use type: ${progressTrackTypes.bond}, difficulty: ${difficultyLevels.bond}`,
    actual: noIdOrMarks(
      createNewBond({
        difficulty: difficultyLevels.epic,
        type: progressTrackTypes.combat,
      }),
    ),
    expected: {
      name: 'new bond',
      type: progressTrackTypes.bond,
      difficulty: difficultyLevels.bond,
    },
  });
});

describe('createNewVow()', async (assert) => {
  assert({
    given: 'a payload with a name',
    should: `create a new vow with that name, and a type: ${progressTrackTypes.vow}, difficulty: ${difficultyLevels.epic}`,
    actual: noIdOrMarks(createNewVow({ name: 'foo' })),
    expected: {
      name: 'foo',
      type: progressTrackTypes.vow,
      difficulty: difficultyLevels.epic,
    },
  });

  assert({
    given: 'a payload with a name',
    should: 'create a new vow with the default name',
    actual: noIdOrMarks(createNewVow({})),
    expected: {
      name: 'new vow',
      type: progressTrackTypes.vow,
      difficulty: difficultyLevels.epic,
    },
  });

  assert({
    given: 'it receives a difficulty or type',
    should: `ignore them and use type: ${progressTrackTypes.vow}, difficulty: ${difficultyLevels.epic}`,
    actual: noIdOrMarks(
      createNewVow({
        difficulty: difficultyLevels.epic,
        type: progressTrackTypes.combat,
      }),
    ),
    expected: {
      name: 'new vow',
      type: progressTrackTypes.vow,
      difficulty: difficultyLevels.epic,
    },
  });
});

describe('markProgress()', async (assert) => {
  const testTrack = createNewTrack({});

  assert({
    given: 'the test suite is running',
    should: 'create a track with a baseline progress',
    actual: sumProgress(testTrack.marks),
    expected: 0,
  });

  assert({
    given: `the track has a difficulty of ${difficultyLevels.troublesome}`,
    should: `update by ${MAX_MARK_VAL * 3}`,
    actual: sumProgress(markTrackProgress(testTrack).marks),
    expected: MAX_MARK_VAL * 3,
  });

  testTrack.difficulty = difficultyLevels.dangerous;
  assert({
    given: `the track has a difficulty of ${difficultyLevels.dangerous}`,
    should: `update by ${MAX_MARK_VAL * 2}`,
    actual: sumProgress(markTrackProgress(testTrack).marks),
    expected: MAX_MARK_VAL * 2,
  });

  testTrack.difficulty = difficultyLevels.formidable;
  assert({
    given: `the track has a difficulty of ${difficultyLevels.formidable}`,
    should: `update by ${MAX_MARK_VAL}`,
    actual: sumProgress(markTrackProgress(testTrack).marks),
    expected: MAX_MARK_VAL,
  });

  testTrack.difficulty = difficultyLevels.extreme;
  assert({
    given: `the track has a difficulty of ${difficultyLevels.extreme}`,
    should: `update by ${MAX_MARK_VAL / 2}`,
    actual: sumProgress(markTrackProgress(testTrack).marks),
    expected: MAX_MARK_VAL / 2,
  });

  testTrack.difficulty = difficultyLevels.epic;
  assert({
    given: `the track has a difficulty of ${difficultyLevels.epic}`,
    should: `update by 1`,
    actual: sumProgress(markTrackProgress(testTrack).marks),
    expected: 1,
  });

  testTrack.difficulty = difficultyLevels.bond;
  assert({
    given: `the track has a difficulty of ${difficultyLevels.bond}`,
    should: `update by 1`,
    actual: sumProgress(markTrackProgress(testTrack).marks),
    expected: 1,
  });

  const markedTrack = createNewTrack({
    difficulty: difficultyLevels.epic,
  });

  markedTrack.marks[0].value = MAX_MARK_VAL;

  assert({
    given: `the last mark has a value of ${MAX_MARK_VAL}`,
    should: 'add progress to the next mark',
    actual: markTrackProgress(markedTrack).marks[1]?.value,
    expected: 1,
  });
});

describe('updateTrack()', async (assert) => {
  const testTrack = createNewTrack({});

  assert({
    given: 'we are testing updateTrack()',
    should: 'start with a baseline for sanity',
    actual: noIdOrMarks(createNewTrack({})),
    expected: {
      name: 'new progress track',
      type: progressTrackTypes.combat,
      difficulty: difficultyLevels.troublesome,
    },
  });

  assert({
    given: 'a new name is provided',
    should: 'return the track with the name changed to the payload',
    actual: updateTrack(testTrack, { name: 'foo' }).name,
    expected: 'foo',
  });

  assert({
    given: 'a new diffuculty is provided',
    should: 'return the track with the difficulty changed to the payload',
    actual: updateTrack(testTrack, { difficulty: difficultyLevels.formidable })
      .difficulty,
    expected: difficultyLevels.formidable,
  });

  assert({
    given: 'a new type is provided',
    should: 'return the track with the type changed to the payload',
    actual: updateTrack(testTrack, {
      type: progressTrackTypes.journey,
    }).type,
    expected: progressTrackTypes.journey,
  });
});

describe('resetProgress()', async (assert) => {
  const testTrack = markTrackProgress(createNewTrack({}));

  assert({
    given: 'a track has progress marked',
    should: 'reset progress to zero',
    actual: sumProgress(resetProgress(testTrack).marks),
    expected: 0,
  });
});

describe('completedMarksCount()', async (assert) => {
  const testTrack = createNewTrack({});

  assert({
    given: 'a track has no progress',
    should: 'return 0',
    actual: completedMarksCount(testTrack.marks),
    expected: 0,
  });

  assert({
    given: 'a track has progress',
    should: 'return the number of completed marks',
    actual: completedMarksCount(markTrackProgress(testTrack).marks),
    expected: 3,
  });

  const epicTrack = createNewTrack({ difficulty: difficultyLevels.epic });
  epicTrack.marks[0].value = MAX_MARK_VAL;
  epicTrack.marks[1].value = 1;

  assert({
    given: 'a track has progress, but some incomplete marks',
    should: 'return the number of completed marks',
    actual: completedMarksCount(epicTrack.marks),
    expected: 1,
  });
});
