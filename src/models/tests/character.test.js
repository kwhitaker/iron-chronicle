import { describe } from 'riteway';
import { Character } from '../character';

const createChar = (xp) => {
  const char = Character.create({
    name: 'foo',
    attributes: [],
    xp,
    conditions: [],
    burdens: [],
    banes: [],
    momentum: {
      min: -6,
      max: 10,
      resetValue: 2,
      value: 2,
    },
    stats: [],
    vows: [],
    bonds: [],
    miscProgress: [],
  });

  return char;
};

describe('Character.addXP()', async (assert) => {
  const incrementer = (startingVal, toAdd) => {
    const char = createChar(startingVal);

    char.addXP(toAdd);
    return char.xp;
  };

  const should = 'add the value to the XP, up-to the maximum value';

  assert({
    given: 'the value is less than the max',
    should,
    actual: incrementer(2, 1),
    expected: 3,
  });

  assert({
    given: 'the value is the max',
    should,
    actual: incrementer(30, 1),
    expected: 30,
  });
});

describe('Character.subXP()', async (assert) => {
  const decrementer = (startingVal, toSub) => {
    const char = createChar(startingVal);

    char.subXP(toSub);
    return char.xp;
  };

  const should = 'subtract the value to the XP, down-to the minimum value';

  assert({
    given: 'the value is more than the min',
    should,
    actual: decrementer(2, 1),
    expected: 1,
  });

  assert({
    given: 'the value is the min',
    should,
    actual: decrementer(0, 1),
    expected: 0,
  });
});
