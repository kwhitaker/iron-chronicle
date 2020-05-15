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

export const MiscProgress = observer(({ tracks = [] }) => {
  const [showModalFor, setShowModalFor] = useState(null);

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

    const track = tracks.find((t) => t.id === id);

    if (track) {
      setShowModalFor(track);
    }
  };

  const hideModal = () => setShowModalFor(null);

  return (
    <TabContent>
      <TabHeader>
        Other
        <TabActionButton onClick={toggleCreate}>
          <PlusIcon size={16} />
        </TabActionButton>
      </TabHeader>
      {tracks.map((t) => (
        <ProgressTrack key={t.id} track={t} onEdit={toggleEdit(t.id)} />
      ))}
      {!!showModalFor && (
        <AddOrUpdateProgressTrack
          onRequestClose={hideModal}
          progressTrack={showModalFor}
          title="Progress Track"
        />
      )}
    </TabContent>
  );
});
