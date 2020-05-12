import React from 'react';
import { observer } from 'mobx-react-lite';
import { TabContent, TabHeader } from './CharacterTab';

export const Assets = observer(({ assets = [] }) => {
  return (
    <TabContent>
      <TabHeader>Assets</TabHeader>
      {assets.map((a) => (
        <h5 key={a.id}>{a.name}</h5>
      ))}
    </TabContent>
  );
});
