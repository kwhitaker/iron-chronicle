import range from 'lodash/fp/range';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ActionRoller } from '../ActionRoller';
import { StatValue } from './StatValue';

export const Stat = observer(({ stat }) => {
  const { min = 0, max = 5, name = 'Unknown', value = 5, setValue } = stat;

  const handleValueUpdated = (nextVal) => (e) => {
    e.preventDefault();
    setValue(nextVal);
  };

  return (
    <div className="flex flex-col flex-auto">
      <div className="flex flex-shrink-0 p-2 bg-black uppercase text-white justify-center items-center">
        {name}
        <ActionRoller stat={stat} inverted />
      </div>
      <div className="h-full flex flex-col flex-auto">
        {range(min, max + 1)
          .reverse()
          .map((v) => (
            <StatValue
              key={v}
              active={value === v}
              onClick={handleValueUpdated(v)}
              value={v}
            />
          ))}
      </div>
    </div>
  );
});
