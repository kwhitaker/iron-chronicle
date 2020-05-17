import { observer } from 'mobx-react-lite';
import React from 'react';
import { useModal } from 'react-modal-hook';
import { DiceButton } from '../Buttons';
import { RollModal } from './RollModal';

export const ActionRoller = observer(({ stat, inverted = false }) => {
  const [showModal, hideModal] = useModal(() => (
    <RollModal stat={stat} onRequestClose={hideModal} />
  ));

  return (
    <DiceButton
      inverted={inverted}
      onClick={showModal}
      title={`Roll ${stat.name}`}
    />
  );
});
