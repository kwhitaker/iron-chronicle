import { observer } from 'mobx-react-lite';
import React from 'react';
import { ActionRoller } from '../ActionRoller';
import { IronText } from '../IronText';

export const Attribute = observer(({ attribute }) => {
  const { value = 1, name = 'Unknown', setValue } = attribute;

  const handleValueUpdated = (e) => {
    setValue(e.currentTarget.value);
  };

  return (
    <div className="w-1/5 h-full px-2 flex flex-col justify-center items-center">
      <div className="bg-white h-full w-full border border-black border-r-4 border-b-4 transition-all duration-200 hover:bg-blue-200">
        <label
          htmlFor={name}
          className="h-full w-auto mx-2 flex flex-col justify-center items-center cursor-pointer"
        >
          <input
            id={name}
            value={value}
            className="w-full mb-2 p-3 text-4xl text-center bg-transparent focus:bg-blue-200"
            onChange={handleValueUpdated}
          />
          <span className="flex justify-center items-center pb-2 uppercase text-lg font-black">
            <IronText>{name}</IronText>
            <ActionRoller stat={attribute} />
          </span>
        </label>
      </div>
    </div>
  );
});
