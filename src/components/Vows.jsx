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

export const Vows = observer(() => {
  const { currentCharacter } = useAppStore();
  const [showModalFor, setShowModalFor] = useState(null);

  const toggleCreate = (e) => {
    e.preventDefault();

    const nextBond = ProgressModel.create({
      id: shortid(),
      type: progressTrackTypes.vow,
      name: '',
      difficulty: difficultyLevels.extreme,
      marks: [],
    });

    setShowModalFor(nextBond);
  };

  const toggleEdit = (id) => (e) => {
    e.preventDefault();

    const vow = currentCharacter.vows.find((v) => v.id === id);

    if (vow) {
      setShowModalFor(vow);
    }
  };

  const hideModal = () => setShowModalFor(null);

  return (
    <TabContent>
      <TabHeader>
        Vows
        <TabActionButton onClick={toggleCreate}>
          <PlusIcon size={16} />
        </TabActionButton>
      </TabHeader>
      {currentCharacter.vows.map((v) => (
        <ProgressTrack key={v.id} track={v} onEdit={toggleEdit(v.id)} />
      ))}
      {!!showModalFor && (
        <AddOrUpdateProgressTrack
          onRequestClose={hideModal}
          progressTrack={showModalFor}
          title="Vow"
        />
      )}
    </TabContent>
  );
});
