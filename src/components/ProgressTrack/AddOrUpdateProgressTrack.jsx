import { observer } from 'mobx-react-lite';
import { getSnapshot } from 'mobx-state-tree';
import React, { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  difficultyLevels,
  progressTrackTypes,
  useAppStore,
} from '../../models';
import { BlueButton, GrayButton, RedButton } from '../Buttons';
import { Form } from '../Form';
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
  ({
    progressTrack = {},
    onRequestClose,
    title = 'Progress Track',
    onDelete,
  }) => {
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
      <Modal isOpen onRequestClose={onRequestClose}>
        <Modal.Header onRequestClose={onRequestClose}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(handleSave)}>
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
            {!!onDelete && (
              <div className="flex flex-1 justify-start items-center">
                <RedButton onClick={onDelete}>Delete</RedButton>
              </div>
            )}
            <BlueButton type="submit" className="mr-2">
              Save
            </BlueButton>
            <GrayButton onClick={onRequestClose}>Cancel</GrayButton>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  },
);
