import { observer } from 'mobx-react-lite';
import React from 'react';
import { Debility } from './Debility';
import { IronText } from '../IronText';

export const DebilityList = observer(({ type, debilities = [] }) => {
  return (
    <div className="mx-16 my-2">
      <h5 className="text-xl uppercase font-bold">
        <IronText>{type}</IronText>
      </h5>
      <ul>
        {debilities.map(({ name, active, toggle }) => (
          <Debility key={name} name={name} active={active} toggle={toggle} />
        ))}
      </ul>
    </div>
  );
});
