import { observer } from 'mobx-react-lite';
import React from 'react';
import { RollResult } from '../ActionRoller';
import { Modal } from '../Modal';

export const ProgressRollResult = observer(({ onRequestClose, result }) => {
  return (
    <Modal isOpen onRequestClose={onRequestClose}>
      <Modal.Header>
        <div className="text-lg font-black uppercase">
          <h2>Progress Roll</h2>
        </div>
      </Modal.Header>
      <RollResult result={result} onRequestClose={onRequestClose} />
    </Modal>
  );
});
