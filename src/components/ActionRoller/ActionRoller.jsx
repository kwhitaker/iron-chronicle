import DiceMultipleIcon from 'mdi-react/DiceMultipleIcon';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useModal } from 'react-modal-hook';
import { Button } from '../Buttons';
import { RollModal } from './RollModal';

export const ActionRoller = observer(({ stat, inverted = false }) => {
  const { name } = stat;
  const [showModal, hideModal] = useModal(() => (
    <RollModal stat={stat} onRequestClose={hideModal} />
  ));

  return (
    <Button
      className={`block ml-2 p-1 ${
        inverted
          ? 'hover:bg-white hover:text-black'
          : 'hover:bg-black hover:text-white'
      }`}
      title={`Roll ${name}`}
      onClick={showModal}
    >
      <DiceMultipleIcon size={18} />
    </Button>
  );
});
