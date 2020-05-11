import React from 'react';
import { observer } from 'mobx-react-lite';
import { ProgressTrack } from './ProgressTrack';

export const Vows = observer(({ vows = [] }) => {
  return (
    <div className="mt-4 pt-2">
      <h3 className="uppercase mb-4 pb-2 text-2xl border-b-2 border-black text-center">
        Vows
      </h3>
      {vows.map((v) => (
        <ProgressTrack key={v.id} track={v} />
      ))}
    </div>
  );
});
