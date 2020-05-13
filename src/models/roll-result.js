import { types } from 'mobx-state-tree';

export const hitTypes = {
  strong: 'strong',
  weak: 'weak',
  miss: 'miss',
};

export const RollResult = types
  .model('Roll Result', {
    id: types.identifier,
    title: types.string,
    description: types.maybeNull(types.string),
    outcome: types.maybeNull(types.string),
    adds: types.maybeNull(types.number),
    rolls: types.array(types.number),
    stat: types.model('Roll Result Stat', {
      name: types.string,
      value: types.number,
    }),
    dateRolled: types.number,
  })
  .views((self) => ({
    get hitType() {
      const [challenge1, challenge2, actionDie] = self.rolls;
      const actionScore = actionDie + self.stat.value + self.adds;

      if (actionScore > challenge1 && actionScore > challenge2) {
        return hitTypes.strong;
      }

      if (actionScore < challenge1 && actionScore < challenge2) {
        return hitTypes.miss;
      }

      return hitTypes.weak;
    },
    get isMatch() {
      const [challenge1, challenge2] = self.rolls;

      return challenge1 === challenge2;
    },
    get isProgress() {
      return self.stat.name === 'progress';
    },
  }))
  .actions((self) => ({
    setDescription(nextDesc) {
      self.description = nextDesc;
    },
    setTitle(nextTitle) {
      self.title = nextTitle;
    },
    setOutcome(nextOutcome) {
      self.outcome = nextOutcome;
    },
  }));
