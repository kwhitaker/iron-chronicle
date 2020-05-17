import { observer } from 'mobx-react-lite';
import React from 'react';
import { useAppStore } from '../models';
import { TabContent, TabHeader } from './CharacterTab';
import { IronText } from './IronText';

export const Assets = observer(() => {
  const { currentCharacter } = useAppStore();
  return (
    <TabContent>
      <TabHeader>
        <IronText>Assets</IronText>
      </TabHeader>
      {currentCharacter.assets.map((a) => (
        <h5 key={a.id}>{a.name}</h5>
      ))}
    </TabContent>
  );
});
