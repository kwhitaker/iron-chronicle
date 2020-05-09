import { describe } from 'riteway';
import { Momentum } from '../momentum';

describe('Momentum.setValue()', async (assert) => {
  const setter = (value, nextVal) => {
    const momentum = Momentum.create({
      resetValue: 0,
      min: -6,
      max: 10,
      currentMax: 10,
      value,
    });

    momentum.setValue(nextVal);
    return momentum.value;
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
    actual: setter(0, -7),
    expected: -6,
  });

  assert({
    given: 'argument >= max',
    should: 'set the value to the max',
    actual: setter(0, 11),
    expected: 10,
  });
});

describe('Momentum.reset()', async (assert) => {
  const resetter = (value) => {
    const momentum = Momentum.create({
      resetValue: -2,
      min: -6,
      max: 10,
      currentMax: 10,
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

describe('Momentum.setResetValue()', async (assert) => {
  const setter = (resetValue) => {
    const momentum = Momentum.create({
      resetValue: 3,
      min: -6,
      max: 10,
      value: 0,
      currentMax: 10,
    });

    momentum.setResetValue(resetValue);
    return momentum.resetValue;
  };

  assert({
    given: 'the value is between the max and min',
    should: 'update the resetValue to the new value',
    actual: setter(2),
    expected: 2,
  });

  assert({
    given: 'the value is greater than the max',
    should: 'update the reset value to the max',
    actual: setter(11),
    expected: 10,
  });

  assert({
    given: 'the value is less than the min',
    should: 'update the reset value to the min',
    actual: setter(-7),
    expected: -6,
  });
});

describe('Momentum.setCurrentMax()', async (assert) => {
  const setter = (newMax) => {
    const momentum = Momentum.create({
      resetValue: 2,
      currentMax: 10,
      min: -6,
      max: 10,
      value: 0,
    });

    momentum.setCurrentMax(newMax);
    return momentum.currentMax;
  };

  assert({
    given: 'the value is between the max and min',
    should: 'update the currentMax to the new value',
    actual: setter(2),
    expected: 2,
  });

  assert({
    given: 'the value is greater than the max',
    should: 'update the currentMaxe to the max',
    actual: setter(11),
    expected: 10,
  });

  assert({
    given: 'the value is less than the min',
    should: 'update the currentMax to the min',
    actual: setter(-7),
    expected: -6,
  });
});
