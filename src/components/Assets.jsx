import { observer } from 'mobx-react-lite';
import React from 'react';
import { useAppStore } from '../models';
import { TabContent, TabHeader } from './CharacterTab';

export const Assets = observer(() => {
  const { currentCharacter } = useAppStore();
  return (
    <TabContent>
      <TabHeader>Assets</TabHeader>
      {currentCharacter.assets.map((a) => (
        <h5 key={a.id}>{a.name}</h5>
      ))}
    </TabContent>
  );
});
