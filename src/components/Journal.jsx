import FeatherIcon from 'mdi-react/FeatherIcon';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkDown from 'react-markdown';
import { useAppStore } from '../models';
import { BlueButton, GrayButton } from './Buttons';
import { TabActionButton, TabContent, TabHeader } from './CharacterTab';
import { TextArea } from './Inputs';
import { IronText } from './IronText';
import { Modal } from './Modal';

export const Journal = observer(() => {
  const { currentGame } = useAppStore();
  const { journal, setJournal } = currentGame;
  const [nextJournal, setNextJournal] = useState(journal);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const closeModal = () => setEditing(false);

  const handleJournalUpdated = (e) => {
    setNextJournal(e.currentTarget.value);
  };

  const handleSaveJournal = (e) => {
    e.preventDefault();
    setJournal(nextJournal);
    closeModal();
  };

  return (
    <TabContent>
      <TabHeader>
        <IronText>Journal</IronText>
        <TabActionButton onClick={() => setEditing(true)} title="Edit Journal">
          <FeatherIcon size={16} />
        </TabActionButton>
      </TabHeader>
      <div className="w-full">
        <ReactMarkDown source={journal} />
      </div>
      <Modal isOpen={editing} onRequesetClose={closeModal}>
        <Modal.Header onRequestClose={closeModal}>
          <Modal.Title>Edit Journal</Modal.Title>
        </Modal.Header>
        <form className="py-4 px-2" onSubmit={handleSaveJournal}>
          <TextArea
            id="journal"
            className="h-64"
            value={nextJournal}
            onChange={handleJournalUpdated}
            placeholder="Notes, reminders, things worth recording..."
          />
          <Modal.Footer>
            <BlueButton className="mr-2" type="submit">
              Save
            </BlueButton>
            <GrayButton onClick={closeModal}>Cancel</GrayButton>
          </Modal.Footer>
        </form>
      </Modal>
    </TabContent>
  );
});
