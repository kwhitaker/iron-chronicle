import PlusIcon from 'mdi-react/PlusIcon';
import TrashIcon from 'mdi-react/TrashCanOutlineIcon';
import { getSnapshot } from 'mobx-state-tree';
import React, { useCallback, useRef } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import shortid from 'shortid';
import { assetTypes } from '../../models';
import { BlueButton, Button, GrayButton, RedButton } from '../Buttons';
import { Form } from '../Form';
import { Input, InputError, Select, TextArea } from '../Inputs';
import { Label } from '../Label';
import { Modal } from '../Modal';

const assetTypeOpts = Object.entries(assetTypes).map(([type, label]) => (
  <option value={type} key={type}>
    {label}
  </option>
));

export const AddOrUpdateAsset = ({
  asset = {},
  onRequestClose,
  onSubmit,
  onDelete,
}) => {
  const nameRef = useRef(null);
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      ...getSnapshot(asset),
      abilities: asset.abilities.map((a) => ({
        id: a.id,
        description: a.description,
        available: a.available,
      })),
    },
  });

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'abilities',
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

  const mapValuesToSnapshot = (values) => {
    const mappedAbilities = values.abilities
      .filter((a) => !!a.description)
      .map((a) => ({
        ...a,
        available: a.available === 'true',
      }));

    onSubmit({
      ...values,
      abilities: mappedAbilities,
    });
  };

  return (
    <Modal isOpen onRequestClose={onRequestClose}>
      <Modal.Header onRequestClose={onRequestClose}>
        <Modal.Title>Asset</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(mapValuesToSnapshot)}>
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
        <Label htmlFor="abilities[0].description">
          <Label.Text>
            Abilities&nbsp;
            <Button onClick={() => append({ id: shortid(), description: '' })}>
              <PlusIcon size={16} />
            </Button>
          </Label.Text>
          {fields.map((field, idx) => (
            <div key={field.id} className="flex items-center mb-1">
              <input
                type="hidden"
                name={`abilities[${idx}].id`}
                value={field.id}
                ref={register()}
              />
              <input
                type="hidden"
                name={`abilities[${idx}].available`}
                value={field.available}
                ref={register()}
              />
              <Input
                id={`abilities[${idx}].description`}
                name={`abilities[${idx}].description`}
                ref={register()}
                defaultValue={field.description}
                className="flex-auto mr-1"
              />
              <Button onClick={() => remove(idx)} title="Remove Ability">
                <TrashIcon size={16} />
              </Button>
            </div>
          ))}
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
          {!!onDelete && (
            <div className="flex flex-1 justify-start items-center">
              <RedButton onClick={onDelete}>Delete Asset</RedButton>
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
};
