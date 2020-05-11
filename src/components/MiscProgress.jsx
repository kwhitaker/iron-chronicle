import React from 'react';
import { observer } from 'mobx-react-lite';
import { ProgressTrack } from './ProgressTrack';

export const MiscProgress = observer(({ tracks = [] }) => {
  return (
    <div className="mt-4 pt-2">
      <h3 className="uppercase mb-4 pb-2 text-2xl border-b-2 border-black text-center">
        Other
      </h3>
      {tracks.map((t) => (
        <ProgressTrack key={t.id} track={t} />
      ))}
    </div>
  );
});
