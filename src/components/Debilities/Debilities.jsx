import React from 'react';
import { values } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useAppStore } from '../../models';

export const Debilities = observer(() => {
  const { currentCharacter } = useAppStore();

  return (
    <div className="flex flex-shrink-0 w-full h-48 bg-black text-white">
      <ul className="flex-1 mx-4 my-2">
        {values(currentCharacter.conditions).map(({ name }) => (
          <li key={name} className="my-2">
            {name}
          </li>
        ))}
      </ul>
      <ul className="flex-1 mx-4 my-2">
        {values(currentCharacter.banes).map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <ul className="flex-1 mx-4 my-2">
        {values(currentCharacter.burdens).map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
});
