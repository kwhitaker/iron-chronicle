import format from 'date-fns/format';
import isEmpty from 'lodash/fp/isEmpty';
import shortid from 'shortid';
import { RollResult } from '../models';

// taken https://www.the-art-of-web.com/javascript/random/
const roller = (sides = 10) => () => {
  return 1 + Math.floor(Math.random() * sides);
};

const d10 = roller(10);
const d6 = roller(6);

export const actionRoll = (stat = null, adds = 0) => {
  if (isEmpty(stat) || !stat.value || !stat.name) {
    throw new Error('Cannot roll without a stat.');
  }

  const challenge1 = d10();
  const challenge2 = d10();
  const action = d6();
  const dateRolled = Date.now();
  const title = `${stat.name} roll: ${format(dateRolled, 'PP pp')}`;

  return RollResult.create({
    id: shortid(),
    dateRolled,
    title,
    stat,
    rolls: [challenge1, challenge2, action],
    adds,
  });
};
