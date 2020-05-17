import React from 'react';
import { values } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useAppStore } from '../../models';
import { DebilityList } from './DebilityList';

export const Debilities = observer(() => {
  const { currentCharacter } = useAppStore();

  return (
    <div className="flex flex-shrink-0 w-full h-48 bg-black text-white justify-center">
      <DebilityList
        type="conditions"
        debilities={values(currentCharacter.conditions)}
      />
      <DebilityList
        type="burdens"
        debilities={values(currentCharacter.burdens)}
      />
      <DebilityList type="banes" debilities={values(currentCharacter.banes)} />
    </div>
  );
});
