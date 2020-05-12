import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../models';
import { Modal, ModalHeader } from '../Modal';
import { actionRoll } from './action-roll';
import { RollResult } from './RollResult';
import { Label } from '../Label';
import { Input } from '../Inputs';

export const RollModal = observer(
  ({ onRequestClose, stat: { name, value } }) => {
    const { currentGame } = useAppStore();
    const [latestResult, setLatestResult] = useState();
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
      const result = actionRoll({ name, value }, adds);

      currentGame.addRollResult(result);
      setLatestResult(result);
    };

    const hasResult = !!latestResult;

    return (
      <Modal
        isOpen
        onRequestClose={onRequestClose}
        className={hasResult ? 'w-1/2' : 'w-1/4'}
      >
        <ModalHeader onRequestClose={onRequestClose}>
          <div className="text-lg font-black uppercase">
            <h2>Roll {name}</h2>
          </div>
        </ModalHeader>
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
              <button
                type="button"
                className="p-2 bg-blue-500 text-white hover:bg-blue-700 uppercase"
                onClick={handleActionRolled}
              >
                Roll
              </button>
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