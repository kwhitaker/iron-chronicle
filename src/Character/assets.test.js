import omit from 'lodash/fp/omit';
import { describe } from 'riteway';
import { createAssetAbility, toggleAbilityAvailable } from './__tests__/assets';

const noId = omit(['id']);

describe('createAssetAbility()', async (assert) => {
  assert({
    given: 'it is called with an empty payload',
    should: 'return an ability with available: false and description: null',
    actual: noId(createAssetAbility()),
    expected: {
      available: false,
      description: null,
    },
  });

  assert({
    given: 'it is called',
    should: 'returns an ability with an id',
    actual: !!createAssetAbility().id,
    expected: true,
  });

  assert({
    given: 'it is called with a description',
    should: 'return an ability with a description',
    actual: noId(createAssetAbility({ description: 'foo' })),
    expected: {
      description: 'foo',
      available: false,
    },
  });

  assert({
    given: 'it is called with available true',
    should: 'return an ability with available: true',
    actual: noId(createAssetAbility({ available: true })),
    expected: {
      description: null,
      available: true,
    },
  });
});

describe('toggleAbilityAvailable()', async (assert) => {
  const testAbility = createAssetAbility();

  assert({
    given: 'the ability has avaialable: false',
    should: 'set to true',
    actual: toggleAbilityAvailable(testAbility).available,
    expected: true,
  });

  testAbility.available = true;
  assert({
    given: 'the ability has avaialable: true',
    should: 'set to false',
    actual: toggleAbilityAvailable(testAbility).available,
    expected: false,
  });
});
