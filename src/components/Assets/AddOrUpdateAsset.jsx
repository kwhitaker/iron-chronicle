import { getSnapshot } from 'mobx-state-tree';
import React, { useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { assetTypes } from '../../models';
import { BlueButton, GrayButton } from '../Buttons';
import { Input, InputError, TextArea, Select } from '../Inputs';
import { Label } from '../Label';
import { Modal } from '../Modal';

const assetTypeOpts = Object.entries(assetTypes).map(([type, label]) => (
  <option value={type} key={type}>
    {label}
  </option>
));

export const AddOrUpdateAsset = ({ asset = {}, onRequestClose, onSubmit }) => {
  const nameRef = useRef(null);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: getSnapshot(asset),
  });

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
    onSubmit(values);
  };

  return (
    <Modal isOpen onRequestClose={onRequestClose}>
      <Modal.Header onRequestClose={onRequestClose}>
        <Modal.Title>Asset</Modal.Title>
      </Modal.Header>
      <form className="py-4 px-2" onSubmit={handleSubmit(handleSave)}>
        <p className="italic text-sm mx-2">* optional field.</p>
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
            id="difficulty"
            name="difficulty"
            ref={register({
              required: 'type is required',
            })}
            error={!!errors.type}
          >
            {assetTypeOpts}
          </Select>
          {!!errors.type && <InputError>{errors.type?.message}</InputError>}
        </Label>
        <Label htmlFor="description">
          <Label.Text>Description *</Label.Text>
          <TextArea
            id="description"
            name="description"
            className="h-32"
            ref={register}
          />
        </Label>
        <Label htmlFor="maxHealth">
          <Label.Text>Max Health *</Label.Text>
          <Input
            id="maxHealth"
            name="maxHealth"
            ref={register}
            error={!!errors.maxHealth}
          />
          {!!errors.maxHealth && (
            <InputError>{errors.maxHealth?.message}</InputError>
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
};
