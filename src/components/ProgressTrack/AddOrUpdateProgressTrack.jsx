import { observer } from 'mobx-react-lite';
import { getSnapshot } from 'mobx-state-tree';
import React, { useState, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import {
  difficultyLevels,
  progressTrackTypes,
  useAppStore,
} from '../../models';
import { BlueButton, GrayButton } from '../Buttons';
import { Input, InputError, Select } from '../Inputs';
import { Label } from '../Label';
import { Modal } from '../Modal';

const typeOptions = Object.keys(progressTrackTypes).map((type) => (
  <option key={type} value={type}>
    {type}
  </option>
));

const difficultyOptions = Object.keys(difficultyLevels).map((difficulty) => (
  <option key={difficulty} value={difficulty}>
    {difficulty}
  </option>
));

const isBond = (track) => track.type === progressTrackTypes.bond;
const isVow = (track) => track.type === progressTrackTypes.vow;
const isBondOrVow = (track) => isBond(track) || isVow(track);

export const AddOrUpdateProgressTrack = observer(
  ({ progressTrack = {}, onRequestClose, title = 'Progress Track' }) => {
    const [submitError, setSubmitError] = useState(null);
    const nameRef = useRef(null);
    const { register, handleSubmit, errors } = useForm({
      defaultValues: getSnapshot(progressTrack),
    });

    const { currentCharacter } = useAppStore();

    const focusAndRegisterName = useCallback(
      (node) => {
        if (!node) {
          return;
        }

        register({ required: 'name is required' })(node);
        nameRef.current = node;
        nameRef.current.focus();
      },
      [register],
    );

    const handleSave = (values) => {
      try {
        setSubmitError(null);
        progressTrack.update(values);
        currentCharacter.maybeAddTrack(progressTrack);

        onRequestClose();
      } catch (err) {
        setSubmitError(err.toString());
      }
    };

    if (!currentCharacter) {
      throw new Error('No character selected.');
    }

    return (
      <Modal isOpen onRequestClose={onRequestClose} className="w-1/2">
        <Modal.Header onRequestClose={onRequestClose}>
          <div className="text-lg font-black uppercase">
            <h2>{title}</h2>
          </div>
        </Modal.Header>
        <form className="py-4 px-2" onSubmit={handleSubmit(handleSave)}>
          {!!submitError && <InputError>{submitError}</InputError>}
          <Label htmlFor="name">
            <Label.Text>Name</Label.Text>
            <Input
              id="name"
              name="name"
              ref={focusAndRegisterName}
              error={!!errors.name}
            />
            {!!errors.name && <InputError>{errors.name?.message}</InputError>}
          </Label>
          <Label htmlFor="type">
            <Label.Text>Type</Label.Text>
            <Select
              id="type"
              name="type"
              disabled={isBondOrVow(progressTrack)}
              ref={register({ required: 'type is required' })}
              error={!!errors.type}
            >
              {typeOptions}
            </Select>
            {!!errors.type && <InputError>{errors.type?.message}</InputError>}
          </Label>
          <Label htmlFor="difficulty">
            <Label.Text>Difficulty</Label.Text>
            <Select
              id="difficulty"
              name="difficulty"
              disabled={isBond(progressTrack)}
              ref={register({
                required: 'difficulty is required',
              })}
              error={!!errors.difficulty}
            >
              {difficultyOptions}
            </Select>
            {!!errors.difficulty && (
              <InputError>{errors.difficulty?.message}</InputError>
            )}
          </Label>
          <Modal.Footer>
            <BlueButton type="submit" className="mr-2">
              Save
            </BlueButton>
            <GrayButton onClick={onRequestClose}>Cancel</GrayButton>
          </Modal.Footer>
        </form>
      </Modal>
    );
  },
);
