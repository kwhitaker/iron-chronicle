import { describe } from 'riteway';
import { Game } from '../game';

describe('Game.setJournal()', async (assert) => {
  const setter = (journal, nextJournal) => {
    const game = Game.create({
      id: 'foo',
      characters: {},
      rolls: {},
      journal,
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
