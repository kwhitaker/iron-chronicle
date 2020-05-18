import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../models';
import { Modal } from '../Modal';
import { actionRoll } from './action-roll';
import { RollResult } from './RollResult';
import { Label } from '../Label';
import { Input } from '../Inputs';
import { BlueButton } from '../Buttons';

export const RollModal = observer(
  ({ onRequestClose, stat: { name, value }, result = null }) => {
    const { currentGame } = useAppStore();
    const [latestResult, setLatestResult] = useState(result);
    const [adds, setAdds] = useState(0);
    const addsRef = useRef(null);

    useEffect(() => {
      if (addsRef.current) {
        addsRef.current.focus();
      }
    }, []);

    const handleAddsUpdated = (e) => {
      const next = Number(e.currentTarget.value);

      setAdds(next);
    };

    const handleActionRolled = (e) => {
      e.preventDefault();
      const nextResult = actionRoll({ name, value }, adds);

      currentGame.addRollResult(nextResult);
      setLatestResult(nextResult);
    };

    const hasResult = !!latestResult;

    return (
      <Modal
        isOpen
        onRequestClose={onRequestClose}
        size={hasResult ? 'base' : 'sm'}
      >
        <Modal.Header onRequestClose={onRequestClose}>
          <div className="text-lg font-black uppercase">
            <h2>Roll {name}</h2>
          </div>
        </Modal.Header>
        {!hasResult && (
          <div className="flex items-center justify-between py-4 px-2 text-left">
            <Label htmlFor="adds" inline>
              <Label.Text inline>Adds:</Label.Text>
              <Input
                id="adds"
                value={adds}
                className="w-8"
                ref={addsRef}
                onChange={handleAddsUpdated}
              />
            </Label>
            <div>
              <BlueButton onClick={handleActionRolled}>Roll</BlueButton>
            </div>
          </div>
        )}
        {hasResult && (
          <RollResult result={latestResult} onRequestClose={onRequestClose} />
        )}
      </Modal>
    );
  },
);
