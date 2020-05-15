import React from 'react';
import { observer } from 'mobx-react-lite';
import { Modal } from '../Modal';
import { BlueButton, GrayButton } from '../Buttons';
import { useAppStore } from '../../models';

const trackCategories = {
  vows: 'vow',
  bonds: 'bond',
  miscProgress: 'progress track',
};

export const CreateProgressTrack = observer(
  ({ category = 'miscProgress', onRequestClose }) => {
    const { characters } = useAppStore();
    const character = characters[0];

    const handleCreate = (e) => {
      e.preventDefault();

      try {
        character.addProgressTrack(category);
        onRequestClose();
      } catch (err) {
        // console.error(err);
      }
    };

    const title = trackCategories[category] || trackCategories.miscProgress;

    return (
      <Modal isOpen onRequestClose={onRequestClose} className="w-1/2">
        <Modal.Header>
          <div className="text-lg font-black uppercase">
            <h2>New {title}</h2>
          </div>
        </Modal.Header>
        <form className="py-4 px-2" onSubmit={handleCreate}>
          <Modal.Footer>
            <BlueButton type="submit" onClick={handleCreate}>
              Save
            </BlueButton>
            <GrayButton onClick={onRequestClose}>Cancel</GrayButton>
          </Modal.Footer>
        </form>
      </Modal>
    );
  },
);
