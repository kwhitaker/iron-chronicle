import PlusIcon from 'mdi-react/PlusIcon';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import shortid from 'shortid';
import {
  ProgressTrack as ProgressModel,
  progressTrackTypes,
  difficultyLevels,
  useAppStore,
} from '../models';
import { TabActionButton, TabContent, TabHeader } from './CharacterTab';
import { AddOrUpdateProgressTrack, ProgressTrack } from './ProgressTrack';
import { IronText } from './IronText';

export const MiscProgress = observer(() => {
  const { currentCharacter } = useAppStore();
  const [showModalFor, setShowModalFor] = useState(null);

  const isExisting =
    !!showModalFor &&
    currentCharacter.miscProgress.find((t) => t.id === showModalFor.id);

  const toggleCreate = (e) => {
    e.preventDefault();

    const nextBond = ProgressModel.create({
      id: shortid(),
      type: progressTrackTypes.combat,
      name: '',
      difficulty: difficultyLevels.troublesome,
      marks: [],
    });

    setShowModalFor(nextBond);
  };

  const toggleEdit = (id) => (e) => {
    e.preventDefault();

    const track = currentCharacter.miscProgress.find((t) => t.id === id);

    if (track) {
      setShowModalFor(track);
    }
  };

  const handleDeleteTrack = (e) => {
    e.preventDefault();
    currentCharacter.removeTrack(showModalFor);
    setShowModalFor(null);
  };

  const hideModal = () => setShowModalFor(null);

  return (
    <TabContent>
      <TabHeader>
        <IronText>Progress Tracks</IronText>
        <TabActionButton onClick={toggleCreate} title="Add New Progress Track">
          <PlusIcon size={16} />
        </TabActionButton>
      </TabHeader>
      {currentCharacter.miscProgress.map((t) => (
        <ProgressTrack key={t.id} track={t} onEdit={toggleEdit(t.id)} />
      ))}
      {!!showModalFor && (
        <AddOrUpdateProgressTrack
          onRequestClose={hideModal}
          progressTrack={showModalFor}
          title="Progress Track"
          onDelete={isExisting ? handleDeleteTrack : undefined}
        />
      )}
    </TabContent>
  );
});
