import React from 'react';
import { observer } from 'mobx-react-lite';
import { Stat } from './Stat';

export const Stats = observer(({ stats = [] }) => {
  return (
    <div className="w-2/12 h-full flex flex-col overflow-y-auto border border-black scrollbar-w-2 scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray scrolling-touch">
      {stats.map((stat) => (
        <Stat key={stat.name} stat={stat} />
      ))}
    </div>
  );
});
