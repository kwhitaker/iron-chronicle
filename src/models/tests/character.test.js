import { describe } from 'riteway';
import { Character } from '../character';

const createChar = (name = 'foo', xp = 0) => {
  const char = Character.create({
    id: 'foo',
    name,
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
      currentMax: 10,
    },
    stats: [],
    vows: [],
    bonds: [],
    miscProgress: [],
    assets: [],
  });

  return char;
};

describe('Character.setName()', async (assert) => {
  const setter = (name, nextName) => {
    const char = createChar(name);

    char.setName(nextName);
    return char.name;
  };

  const expected = 'bar';

  assert({
    given: 'a new name is provided',
    should: 'change the name',
    actual: setter('foo', expected),
    expected,
  });
});

describe('Character.setXP()', async (assert) => {
  const setter = (xp, nextXP) => {
    const char = createChar('foo', xp);
    char.setXP(nextXP);
    return char.xp;
  };

  assert({
    given: 'a value > 0 and < 30 is provided',
    should: 'change the xp',
    actual: setter(0, 5),
    expected: 5,
  });

  assert({
    given: 'a value < 0 is provided',
    should: 'change the xp to 0',
    actual: setter(0, -5),
    expected: 0,
  });

  assert({
    given: 'a value > 30 is provided',
    should: 'change the xp to 30',
    actual: setter(0, 50),
    expected: 30,
  });
});
