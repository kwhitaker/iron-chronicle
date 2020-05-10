import { describe } from 'riteway';
import { Game } from '../game';
import { RollResult } from '../roll-result';

describe('Game.setJournal()', async (assert) => {
  const setter = (journal, nextJournal) => {
    const game = Game.create({
      id: 'foo',
      characters: {},
      rolls: {},
      journal,
      title: 'foo',
    });

    game.setJournal(nextJournal);
    return game.journal;
  };

  assert({
    given: 'no journal',
    should: 'update the journal',
    actual: setter(null, 'bar'),
    expected: 'bar',
  });

  assert({
    given: 'it has a journal',
    should: 'update the journal',
    actual: setter('bar', 'baz'),
    expected: 'baz',
  });
});

describe.only('Game.rollsDesc()', async (assert) => {
  const now = Date.now();
  const r1 = RollResult.create({
    id: '1',
    title: '1',
    adds: 0,
    rolls: [1, 1, 1],
    stat: {
      name: 'edge',
      value: 1,
    },
    dateRolled: now,
  });

  const r2 = RollResult.create({
    id: '2',
    title: '2',
    adds: 0,
    rolls: [1, 1, 1],
    stat: {
      name: 'edge',
      value: 1,
    },
    dateRolled: now + 100,
  });

  const r3 = RollResult.create({
    id: '3',
    title: '3',
    adds: 0,
    rolls: [1, 1, 1],
    stat: {
      name: 'edge',
      value: 1,
    },
    dateRolled: now + 200,
  });

  const game = Game.create({
    id: 'foo',
    characters: {},
    rolls: {
      [r1.id]: r1,
      [r3.id]: r3,
      [r2.id]: r2,
    },
    journal: '',
    title: 'foo',
  });

  assert({
    given: 'it has rolls',
    should: 'return them sorted by dateRolled, desc',
    actual: game.rollsDesc,
    expected: [r1, r2, r3],
  });
});
