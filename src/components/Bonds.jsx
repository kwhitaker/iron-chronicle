import PlusIcon from 'mdi-react/PlusIcon';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { TabActionButton, TabContent, TabHeader } from './CharacterTab';
import { CreateProgressTrack, ProgressTrack } from './ProgressTrack';

export const Bonds = observer(({ bonds = [] }) => {
  const [showCreate, setShowCreate] = useState(false);

  const hideCreate = () => setShowCreate(false);

  return (
    <TabContent>
      <TabHeader>
        Bonds
        <TabActionButton onClick={() => setShowCreate(true)}>
          <PlusIcon size={16} />
        </TabActionButton>
      </TabHeader>
      {bonds.map((b) => (
        <ProgressTrack key={b.id} track={b} showDifficulty={false} />
      ))}
      {showCreate && (
        <CreateProgressTrack onRequestClose={hideCreate} category="bonds" />
      )}
    </TabContent>
  );
});
