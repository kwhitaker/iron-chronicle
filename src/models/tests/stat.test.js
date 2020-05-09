import { describe } from 'riteway';
import { Stat } from '../stat';

describe('Stat.inc()', async (assert) => {
  const incrementer = (startingVal) => {
    const stat = Stat.create({
      name: 'health',
      min: 0,
      max: 5,
      value: startingVal,
    });

    stat.inc();
    return stat.value;
  };

  const should = 'increment by 1 up-to the maximum value';

  assert({
    given: 'the value is less than the max',
    should,
    actual: incrementer(2),
    expected: 3,
  });

  assert({
    given: 'the value is the max',
    should,
    actual: incrementer(5),
    expected: 5,
  });
});

describe('Stat.dec()', async (assert) => {
  const decrementer = (startingVal) => {
    const stat = Stat.create({
      name: 'health',
      min: 0,
      max: 5,
      value: startingVal,
    });

    stat.dec();
    return stat.value;
  };

  const should = 'decrement by 1 up-to the minimum value';

  assert({
    given: 'the value is more than the min',
    should,
    actual: decrementer(2),
    expected: 1,
  });

  assert({
    given: 'the value is the min',
    should,
    actual: decrementer(0),
    expected: 0,
  });
});
