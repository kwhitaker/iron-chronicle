import React from 'react';
import range from 'lodash/fp/range';
import { observer } from 'mobx-react-lite';
import { StatValue } from './StatValue';

export const Stat = observer(
  ({ stat: { min = 0, max = 5, name = 'Unknown', value = 5, setValue } }) => {
    const handleValueUpdated = (nextVal) => (e) => {
      e.preventDefault();
      setValue(nextVal);
    };

    return (
      <div className="flex flex-col">
        <div className="flex-shrink-0 p-2 bg-black uppercase text-white text-center">
          {name}
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
  },
);
