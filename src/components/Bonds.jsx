import React from 'react';
import { observer } from 'mobx-react-lite';
import { ProgressTrack } from './ProgressTrack';

export const Bonds = observer(({ bonds = [] }) => {
  return (
    <div className="mt-4 pt-2">
      <h3 className="uppercase mb-4 pb-2 text-2xl border-b-2 border-black text-center">
        Bonds
      </h3>
      {bonds.map((b) => (
        <ProgressTrack key={b.id} track={b} showDifficulty={false} />
      ))}
    </div>
  );
});
