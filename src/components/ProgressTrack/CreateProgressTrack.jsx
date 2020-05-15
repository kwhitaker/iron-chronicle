import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import shortid from 'shortid';
import {
  difficultyLevels,
  progressTrackTypes,
  useAppStore,
} from '../../models';
import { BlueButton, GrayButton } from '../Buttons';
import { Input, InputError } from '../Inputs';
import { Label } from '../Label';
import { Modal } from '../Modal';

const trackCategories = {
  vows: 'vow',
  bonds: 'bond',
  miscProgress: 'progress track',
};

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

const isBond = (category) => category === 'bonds';
const isVow = (category) => category === 'vows';
const isBondOrVow = (category) => isBond(category) || isVow(category);

const getDefaultType = (category) => {
  if (isBond(category)) {
    return progressTrackTypes.bond;
  }

  if (isVow(category)) {
    return progressTrackTypes.vow;
  }

  return progressTrackTypes.combat;
};

const getDefaultDifficulty = (category) => {
  if (isBond(category)) {
    return difficultyLevels.bond;
  }

  return difficultyLevels.troublesome;
};

export const CreateProgressTrack = observer(
  ({ category = 'miscProgress', onRequestClose }) => {
    const [submitError, setSubmitError] = useState(null);
    const { register, handleSubmit, errors } = useForm({
      type: getDefaultType(category),
      difficulty: getDefaultDifficulty(category),
    });

    const { currentCharacter } = useAppStore();

    const handleCreate = (values) => {
      const nextTrack = {
        ...values,
        id: shortid(),
        marks: [],
      };

      try {
        setSubmitError(null);
        currentCharacter.addProgressTrack(category, nextTrack);
        onRequestClose();
      } catch (err) {
        setSubmitError(err.toString());
      }
    };

    if (!currentCharacter) {
      throw new Error('No character selected.');
    }

    const title = trackCategories[category] || trackCategories.miscProgress;

    return (
      <Modal isOpen onRequestClose={onRequestClose} className="w-1/2">
        <Modal.Header>
          <div className="text-lg font-black uppercase">
            <h2>New {title}</h2>
          </div>
        </Modal.Header>
        <form className="py-4 px-2" onSubmit={handleSubmit(handleCreate)}>
          {!!submitError && <InputError>{submitError}</InputError>}
          <Label htmlFor="name">
            <Label.Text>Name</Label.Text>
            <Input
              id="name"
              name="name"
              ref={register({ required: 'name is required' })}
              error={!!errors.name}
            />
            {!!errors.name && <InputError>{errors.name?.message}</InputError>}
          </Label>
          <Label htmlFor="type">
            <Label.Text>Type</Label.Text>
            <select
              id="type"
              name="type"
              disabled={isBondOrVow(category)}
              ref={register({ required: 'type is required' })}
              // isError={!!errors.type}
            >
              {typeOptions}
            </select>
            {!!errors.type && <InputError>{errors.type?.message}</InputError>}
          </Label>
          <Label htmlFor="difficulty">
            <Label.Text>Difficulty</Label.Text>
            <select
              id="difficulty"
              name="difficulty"
              disabled={isBond(category)}
              ref={register({
                required: 'difficulty is required',
              })}
              // isError={!!errors.difficulty}
            >
              {difficultyOptions}
            </select>
            {!!errors.difficulty && (
              <InputError>{errors.difficulty?.message}</InputError>
            )}
          </Label>
          <Modal.Footer>
            <BlueButton type="submit">Save</BlueButton>
            <GrayButton onClick={onRequestClose}>Cancel</GrayButton>
          </Modal.Footer>
        </form>
      </Modal>
    );
  },
);
