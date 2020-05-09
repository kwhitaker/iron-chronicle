import { describe } from 'riteway';
import { Momentum } from '../momentum';

describe('Momentum.inc()', async (assert) => {
  const incrementer = (startingVal) => {
    const momentum = Momentum.create({
      resetValue: 0,
      min: -6,
      max: 10,
      value: startingVal,
    });

    momentum.inc();
    return momentum.value;
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
    actual: incrementer(10),
    expected: 10,
  });
});

describe('Momentum.dec()', async (assert) => {
  const decrementer = (startingVal) => {
    const momentum = Momentum.create({
      resetValue: 0,
      min: -6,
      max: 10,
      value: startingVal,
    });

    momentum.dec();
    return momentum.value;
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
    actual: decrementer(-6),
    expected: -6,
  });
});

describe('Momentum.reset()', async (assert) => {
  const resetter = (value) => {
    const momentum = Momentum.create({
      resetValue: -2,
      min: -6,
      max: 10,
      value,
    });

    momentum.reset();
    return momentum.value;
  };

  const should = 'set the value to the reset amount';

  assert({
    given: 'the value is not the reset amount',
    should,
    actual: resetter(2),
    expected: -2,
  });

  assert({
    given: 'the value is the reset amount',
    should,
    actual: resetter(-2),
    expected: -2,
  });
});

describe('Momentum.reset()', async (assert) => {
  const updater = (resetValue) => {
    const momentum = Momentum.create({
      resetValue: 3,
      min: -6,
      max: 10,
      value: 0,
    });

    momentum.updateResetValue(resetValue);
    return momentum.resetValue;
  };

  assert({
    given: 'the value is between the max and min',
    should: 'update the resetValue to the new value',
    actual: updater(2),
    expected: 2,
  });

  assert({
    given: 'the value is greater than the max',
    should: 'update the reset value to the max',
    actual: updater(11),
    expected: 10,
  });

  assert({
    given: 'the value is less than the min',
    should: 'update the reset value to the min',
    actual: updater(-7),
    expected: -6,
  });
});
