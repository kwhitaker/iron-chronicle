import { describe } from 'riteway';
import { Stat } from '../stat';

describe('Stat.setValue()', async (assert) => {
  const setter = (value, nextVal) => {
    const stat = Stat.create({
      name: 'health',
      min: 0,
      max: 5,
      value,
    });

    stat.setValue(nextVal);
    return stat.value;
  };

  assert({
    given: 'argument >= min and argument <= max',
    should: 'set the value to the requested new value',
    actual: setter(2, 3),
    expected: 3,
  });

  assert({
    given: 'argument <= min',
    should: 'set the value to the min',
    actual: setter(0, -1),
    expected: 0,
  });

  assert({
    given: 'argument >= max',
    should: 'set the value to the max',
    actual: setter(0, 6),
    expected: 5,
  });
});
