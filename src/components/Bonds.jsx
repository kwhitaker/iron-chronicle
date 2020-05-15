import PlusIcon from 'mdi-react/PlusIcon';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import shortid from 'shortid';
import {
  ProgressTrack as ProgressModel,
  progressTrackTypes,
  difficultyLevels,
} from '../models';
import { TabActionButton, TabContent, TabHeader } from './CharacterTab';
import { AddOrUpdateProgressTrack, ProgressTrack } from './ProgressTrack';

export const Bonds = observer(({ bonds = [] }) => {
  const [showModalFor, setShowModalFor] = useState(null);

  const toggleCreate = (e) => {
    e.preventDefault();

    const nextBond = ProgressModel.create({
      id: shortid(),
      type: progressTrackTypes.bond,
      name: '',
      difficulty: difficultyLevels.bond,
      marks: [],
    });

    setShowModalFor(nextBond);
  };

  const toggleEdit = (id) => (e) => {
    e.preventDefault();

    const bond = bonds.find((b) => b.id === id);

    if (bond) {
      setShowModalFor(bond);
    }
  };

  const hideModal = () => setShowModalFor(null);

  return (
    <TabContent>
      <TabHeader>
        Bonds
        <TabActionButton onClick={toggleCreate}>
          <PlusIcon size={16} />
        </TabActionButton>
      </TabHeader>
      {bonds.map((b) => (
        <ProgressTrack
          key={b.id}
          track={b}
          showDifficulty={false}
          onEdit={toggleEdit(b.id)}
        />
      ))}
      {!!showModalFor && (
        <AddOrUpdateProgressTrack
          onRequestClose={hideModal}
          progressTrack={showModalFor}
          title="Bond"
        />
      )}
    </TabContent>
  );
});
