import { describe } from 'riteway';
import { AssetAbility } from '../asset';

describe('AssetAbility.toggleAvailable()', async (assert) => {
  const toggler = (available) => {
    const ability = AssetAbility.create({
      id: 'foo',
      description: 'foo',
      available,
    });

    ability.toggleAvailable();
    return ability.available;
  };

  assert({
    given: 'the ability is not avaialble',
    should: 'set available to true',
    actual: toggler(false),
    expected: true,
  });

  assert({
    given: 'the ability is avaialble',
    should: 'set available to false',
    actual: toggler(true),
    expected: false,
  });
});
