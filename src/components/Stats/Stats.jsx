import React from 'react';
import { observer } from 'mobx-react-lite';
import { Stat } from './Stat';

export const Stats = observer(({ stats = [] }) => {
  return (
    <div className="w-2/12 h-full flex flex-col overflow-y-auto border border-black">
      {stats.map((stat) => (
        <Stat key={stat.name} stat={stat} />
      ))}
    </div>
  );
});
