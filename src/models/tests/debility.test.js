import { describe } from 'riteway';
import { Debility } from '../debility';

describe('Debility.toggle()', async (assert) => {
  const toggler = (active) => {
    const debility = Debility.create({
      name: 'wounded',
      active,
    });

    debility.toggle();
    return debility.active;
  };

  const should = 'toggle active';

  assert({
    given: 'active is false',
    should,
    actual: toggler(false),
    expected: true,
  });

  assert({
    given: 'active is true',
    should,
    actual: toggler(true),
    expected: false,
  });
});
