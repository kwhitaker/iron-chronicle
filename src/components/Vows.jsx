import React from 'react';
import { observer } from 'mobx-react-lite';
import { ProgressTrack } from './ProgressTrack';
import { TabContent, TabHeader } from './CharacterTab';

export const Vows = observer(({ vows = [] }) => {
  return (
    <TabContent>
      <TabHeader>Vows</TabHeader>
      {vows.map((v) => (
        <ProgressTrack key={v.id} track={v} />
      ))}
    </TabContent>
  );
});
