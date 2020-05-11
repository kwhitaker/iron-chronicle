import DiceMultipleIcon from 'mdi-react/DiceMultipleIcon';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useModal } from 'react-modal-hook';
import { RollModal } from './RollModal';

export const ActionRoller = observer(({ stat, inverted = false }) => {
  const { name } = stat;
  const [showModal, hideModal] = useModal(() => (
    <RollModal stat={stat} onRequestClose={hideModal} />
  ));

  return (
    <button
      className={`block ml-2 p-1 rounded-sm transition-colors duration-200 bg-transparent ${
        inverted
          ? 'hover:bg-white hover:text-black'
          : 'hover:bg-black hover:text-white'
      }`}
      type="button"
      title={`Roll ${name}`}
      onClick={showModal}
    >
      <DiceMultipleIcon size={18} />
    </button>
  );
});
