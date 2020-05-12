import React from 'react';
import { observer } from 'mobx-react-lite';
import { ProgressTrack } from './ProgressTrack';
import { TabContent, TabHeader } from './CharacterTab';

export const Bonds = observer(({ bonds = [] }) => {
  return (
    <TabContent>
      <TabHeader>Bonds</TabHeader>
      {bonds.map((b) => (
        <ProgressTrack key={b.id} track={b} showDifficulty={false} />
      ))}
    </TabContent>
  );
});
