import times from 'lodash/fp/times';
import { describe } from 'riteway';
import {
  difficultyLevels,
  MAX_MARK_VAL,
  ProgressMark,
  ProgressTrack,
  progressTrackTypes,
} from '../progress-track';

const makeMarks = (numMarks = 10) => times(() => ({ value: 0 }), numMarks);

describe('ProgressTrack.totalProgress()', async (assert) => {
  const withProgress = ProgressTrack.create({
    type: progressTrackTypes.vow,
    difficulty: difficultyLevels.troublesome,
    name: 'foo',
    marks: [
      ProgressMark.create({
        value: MAX_MARK_VAL,
      }),
      ProgressMark.create({
        value: 3,
      }),
    ],
  });

  const noProgress = ProgressTrack.create({
    type: progressTrackTypes.vow,
    difficulty: difficultyLevels.troublesome,
    name: 'foo',
    marks: [
      ProgressMark.create({
        value: 0,
      }),
      ProgressMark.create({
        value: 0,
      }),
    ],
  });

  const noMarks = ProgressTrack.create({
    type: progressTrackTypes.vow,
    difficulty: difficultyLevels.troublesome,
    name: 'foo',
    marks: [],
  });

  assert({
    given: 'the track has marks with progress',
    should: 'return the sum of all mark values',
    actual: withProgress.totalProgress,
    expected: MAX_MARK_VAL + 3,
  });

  assert({
    given: 'the track has no marks with progress',
    should: 'return 0',
    actual: noProgress.totalProgress,
    expected: 0,
  });

  assert({
    given: 'no marks',
    should: 'return 0',
    actual: noMarks.totalProgress,
    expected: 0,
  });
});

describe('ProgressTrack.markProgress()', async (assert) => {
  const marker = (track) => {
    track.markProgress();
    return track.totalProgress;
  };

  const troubleSome = ProgressTrack.create({
    name: difficultyLevels.troublesome,
    type: progressTrackTypes.vow,
    difficulty: difficultyLevels.troublesome,
    marks: makeMarks(),
  });

  assert({
    given: `the track is ${difficultyLevels.troublesome}`,
    should: `update by ${MAX_MARK_VAL * 3}`,
    actual: marker(troubleSome),
    expected: MAX_MARK_VAL * 3,
  });

  const dangerous = ProgressTrack.create({
    name: difficultyLevels.dangerous,
    type: progressTrackTypes.vow,
    difficulty: difficultyLevels.dangerous,
    marks: makeMarks(),
  });

  assert({
    given: `the track is ${difficultyLevels.dangerous}`,
    should: `update by ${MAX_MARK_VAL * 2}`,
    actual: marker(dangerous),
    expected: MAX_MARK_VAL * 2,
  });

  const formidable = ProgressTrack.create({
    name: difficultyLevels.formidable,
    type: progressTrackTypes.vow,
    difficulty: difficultyLevels.formidable,
    marks: makeMarks(),
  });

  assert({
    given: `the track is ${difficultyLevels.formidable}`,
    should: `update by ${MAX_MARK_VAL}`,
    actual: marker(formidable),
    expected: MAX_MARK_VAL,
  });

  const extreme = ProgressTrack.create({
    name: difficultyLevels.extreme,
    type: progressTrackTypes.vow,
    difficulty: difficultyLevels.extreme,
    marks: makeMarks(),
  });

  assert({
    given: `the track is ${difficultyLevels.extreme}`,
    should: `update by ${MAX_MARK_VAL / 2}`,
    actual: marker(extreme),
    expected: MAX_MARK_VAL / 2,
  });

  const epic = ProgressTrack.create({
    name: difficultyLevels.epic,
    type: progressTrackTypes.vow,
    difficulty: difficultyLevels.epic,
    marks: makeMarks(),
  });

  assert({
    given: `the track is ${difficultyLevels.epic}`,
    should: `update by 1`,
    actual: marker(epic),
    expected: 1,
  });

  const bond = ProgressTrack.create({
    name: difficultyLevels.bond,
    type: progressTrackTypes.vow,
    difficulty: difficultyLevels.bond,
    marks: makeMarks(),
  });

  assert({
    given: `the track is ${difficultyLevels.bond}`,
    should: `update by 1`,
    actual: marker(bond),
    expected: 1,
  });

  // make sure each mark gets the correct value
  bond.resetProgress();
  bond.markProgress();
  bond.markProgress();
  bond.markProgress();
  bond.markProgress();
  bond.markProgress();

  assert({
    given: `the last mark has a value of ${MAX_MARK_VAL}`,
    should: 'add progress to the next mark',
    actual: bond.marks[1]?.value,
    expected: 1,
  });
});

describe('ProgressTrack.markProgress()', async (assert) => {
  const track = ProgressTrack.create({
    name: 'foo',
    type: progressTrackTypes.vow,
    difficulty: difficultyLevels.troublesome,
    marks: makeMarks(),
  });

  const resetter = () => {
    track.resetProgress();
    return track.totalProgress;
  };

  track.markProgress();

  assert({
    given: 'a track has progress',
    should: 'reset it to 0',
    actual: resetter(),
    expected: 0,
  });
});
