import { describe } from 'riteway';
import { Attribute } from '../attribute';

describe('Attribute.setValue()', async (assert) => {
  const updater = (value, nextValue) => {
    const attr = Attribute.create({
      name: 'foo',
      value,
    });

    attr.setValue(nextValue);
    return attr.value;
  };

  assert({
    given: 'the value is =< 3 and >= 1',
    should: 'update the value to the provided value',
    actual: updater(1, 2),
    expected: 2,
  });

  assert({
    given: 'the value is > 3',
    should: 'update the value to the max value',
    actual: updater(1, 4),
    expected: 3,
  });

  assert({
    given: 'the value is < 1',
    should: 'update the value to the min value',
    actual: updater(3, 0),
    expected: 1,
  });
});
