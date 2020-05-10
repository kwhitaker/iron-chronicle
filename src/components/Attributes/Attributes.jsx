import React from 'react';
import { observer } from 'mobx-react-lite';
import { Attribute } from './Attribute';

export const Attributes = observer(({ attributes = [] }) => {
  return (
    <div className="flex justify-center h-32 items-center w-full">
      {attributes.map((attr) => (
        <Attribute key={attr.name} attribute={attr} />
      ))}
    </div>
  );
});
