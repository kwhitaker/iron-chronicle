import React from 'react';
import { observer } from 'mobx-react-lite';
import { ProgressTrack } from './ProgressTrack';
import { TabContent, TabHeader } from './CharacterTab';

export const MiscProgress = observer(({ tracks = [] }) => {
  return (
    <TabContent>
      <TabHeader>Other</TabHeader>
      {tracks.map((t) => (
        <ProgressTrack key={t.id} track={t} />
      ))}
    </TabContent>
  );
});
