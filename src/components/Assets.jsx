import times from 'lodash/fp/times';
import FeatherIcon from 'mdi-react/FeatherIcon';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { assetTypes, useAppStore } from '../models';
import { Button } from './Buttons';
import { TabContent, TabHeader } from './CharacterTab';
import { LabelledCheckbox, Select } from './Inputs';
import { IronText } from './IronText';
import { Label } from './Label';

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

const Asset = observer(({ asset }) => {
  const {
    id,
    name,
    type,
    health,
    abilities = [],
    maxHealth,
    setHealth,
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
          <Button title="Edit Asset">
            <FeatherIcon size={16} />
          </Button>
        </div>
      </div>
      <ul className="flex-1 overflow-y-auto">
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
      <div className="flex flex-grow-0 justify-between items-center border-t border-black pt-1 w-full">
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
        <strong className="uppercase text-sm">{assetTypes[type]}</strong>
      </div>
    </div>
  );
});

export const Assets = observer(() => {
  const { currentCharacter } = useAppStore();
  return (
    <TabContent>
      <TabHeader>
        <IronText>Assets</IronText>
      </TabHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-64">
        {currentCharacter.assets.map((a) => (
          <Asset asset={a} key={a.id} />
        ))}
      </div>
    </TabContent>
  );
});
