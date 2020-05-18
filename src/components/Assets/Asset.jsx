import times from 'lodash/fp/times';
import FeatherIcon from 'mdi-react/FeatherIcon';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { assetTypes } from '../../models';
import { Button } from '../Buttons';
import { LabelledCheckbox, Select } from '../Inputs';
import { IronText } from '../IronText';
import { Label } from '../Label';

const HealthOpts = ({ max = 0 }) => {
  return (
    <>
      {times(
        (i) => (
          <option value={i + 1} key={i + 1}>
            {i + 1}
          </option>
        ),
        max,
      )}
    </>
  );
};

export const Asset = observer(({ asset, onEdit }) => {
  const {
    id,
    name,
    type,
    health,
    abilities = [],
    maxHealth,
    setHealth,
    description,
  } = asset;

  const handleHealthUpdated = (e) => {
    const next = Number(e.currentTarget.value);

    setHealth(next);
  };

  return (
    <div className="flex flex-col w-full h-full overflow-hidden bg-gray-200 border border-gray-400 p-2 rounded-sm">
      <div className="flex justify-start flex-grow-0 border-b border-black pb-1 items-center">
        <IronText className="flex-auto overflow-hidden truncate">
          {name}
        </IronText>
        <div className="flex-shrink-0">
          <Button title="Edit Asset" onClick={onEdit}>
            <FeatherIcon size={16} />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {!!description && <p className="my-2 text-sm">{description}</p>}
        <ul>
          {abilities.map((ab) => (
            <li key={ab.id} className="mb-2 text-sm">
              <LabelledCheckbox htmlFor={ab.id}>
                <div className="flex items-top mt-1">
                  <LabelledCheckbox.Checkbox
                    defaultChecked={ab.available}
                    id={ab.id}
                    name={ab.id}
                    onChange={ab.toggleAvailable}
                    className="mt-1"
                  />
                  <div className="ml-2 normal-case">{ab.description}</div>
                </div>
              </LabelledCheckbox>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-grow-0 justify-between items-center border-t border-black pt-1 w-full">
        <div>
          {health !== null && (
            <Label htmlFor={`${id}-health`} inline className="text-sm">
              Health:
              <Select
                defaultValue={health}
                className="w-16 text-sm ml-2"
                onChange={handleHealthUpdated}
                inline
              >
                <HealthOpts max={maxHealth} />
              </Select>
            </Label>
          )}
        </div>
        <strong className="uppercase text-sm">{assetTypes[type]}</strong>
      </div>
    </div>
  );
});
