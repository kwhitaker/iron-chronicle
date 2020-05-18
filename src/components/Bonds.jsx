import PlusIcon from 'mdi-react/PlusIcon';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import shortid from 'shortid';
import {
  difficultyLevels,
  ProgressTrack as ProgressModel,
  progressTrackTypes,
  useAppStore,
} from '../models';
import { TabActionButton, TabContent, TabHeader } from './CharacterTab';
import { IronText } from './IronText';
import { AddOrUpdateProgressTrack, ProgressTrack } from './ProgressTrack';

export const Bonds = observer(() => {
  const { currentCharacter } = useAppStore();
  const [showModalFor, setShowModalFor] = useState(null);

  const isExisting =
    !!showModalFor &&
    currentCharacter.bonds.find((b) => b.id === showModalFor.id);

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

    const bond = currentCharacter.bonds.find((b) => b.id === id);

    if (bond) {
      setShowModalFor(bond);
    }
  };

  const handleDeleteBond = (e) => {
    e.preventDefault();
    currentCharacter.removeTrack(showModalFor);
    setShowModalFor(null);
  };

  const hideModal = () => setShowModalFor(null);

  return (
    <TabContent>
      <TabHeader>
        <IronText>Bonds</IronText>
        <TabActionButton onClick={toggleCreate} title="Add New Bond">
          <PlusIcon size={16} />
        </TabActionButton>
      </TabHeader>
      {currentCharacter.bonds.map((b) => (
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
          onDelete={isExisting ? handleDeleteBond : undefined}
        />
      )}
    </TabContent>
  );
});
