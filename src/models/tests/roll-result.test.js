import { describe } from 'riteway';
import shortid from 'shortid';
import { RollResult, hitTypes } from '../roll-result';

describe('RollResult.setDescription()', async (assert) => {
  const setter = (description, nextDesc) => {
    const result = RollResult.create({
      id: shortid(),
      name: 'foo',
      description,
      adds: 0,
      rolls: [1, 1, 1],
      title: 'foo',
      stat: {
        name: 'edge',
        value: 1,
      },
      dateRolled: Date.now(),
    });

    result.setDescription(nextDesc);
    return result.description;
  };

  assert({
    given: 'no description',
    should: 'update the description',
    actual: setter(null, 'bar'),
    expected: 'bar',
  });

  assert({
    given: 'it has a description',
    should: 'update the description',
    actual: setter('bar', 'baz'),
    expected: 'baz',
  });
});

describe('RollResult.setTitle()', async (assert) => {
  const setter = (title, nextTitle) => {
    const result = RollResult.create({
      id: shortid(),
      name: 'foo',
      adds: 0,
      rolls: [1, 1, 1],
      title,
      stat: {
        name: 'edge',
        value: 1,
      },
      dateRolled: Date.now(),
    });

    result.setTitle(nextTitle);
    return result.title;
  };

  assert({
    given: 'a new title is provided',
    should: 'update the title',
    actual: setter('bar', 'baz'),
    expected: 'baz',
  });
});

describe('RollResult.setOutcome()', async (assert) => {
  const setter = (outcome, nextOutcome) => {
    const result = RollResult.create({
      id: shortid(),
      name: 'foo',
      adds: 0,
      rolls: [1, 1, 1],
      outcome,
      title: 'foo',
      stat: {
        name: 'edge',
        value: 1,
      },
      dateRolled: Date.now(),
    });

    result.setOutcome(nextOutcome);
    return result.title;
  };

  assert({
    given: 'a new outcome is provided',
    should: 'update the outcome',
    actual: setter('bar', 'baz'),
    expected: 'baz',
  });
});

describe('RollResult.hitType', async (assert) => {
  const getter = (rollAndAdds) => {
    const result = RollResult.create({
      ...rollAndAdds,
      id: shortid(),
      name: 'foo',
      title: 'foo',
      description: null,
      dateRolled: Date.now(),
    });

    return result.hitType;
  };

  const statAndAdds = {
    adds: 1,
    stat: {
      name: 'edge',
      value: 1,
    },
  };

  const strong = {
    ...statAndAdds,
    rolls: [1, 1, 1],
  };

  const weak = {
    ...statAndAdds,
    rolls: [1, 4, 1],
  };

  const weakEq = {
    ...statAndAdds,
    rolls: [1, 3, 1],
  };

  const miss = {
    ...statAndAdds,
    rolls: [6, 6, 1],
  };

  assert({
    given: 'the stat + adds + action score is higher than both challenge rolls',
    should: `return ${hitTypes.strong}`,
    actual: getter(strong),
    expected: hitTypes.strong,
  });

  assert({
    given:
      'the stat + adds + action score is higher than one challenge roll, but less than the other',
    should: `return ${hitTypes.weak}`,
    actual: getter(weak),
    expected: hitTypes.weak,
  });

  assert({
    given:
      'the stat + adds + action score is higher than one challenge roll, but equal to the other',
    should: `return ${hitTypes.weak}`,
    actual: getter(weakEq),
    expected: hitTypes.weak,
  });

  assert({
    given: 'the stat + adds + action score is lower than both challenge rolls',
    should: `return ${hitTypes.miss}`,
    actual: getter(miss),
    expected: hitTypes.miss,
  });
});
