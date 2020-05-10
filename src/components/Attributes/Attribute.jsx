import React from 'react';
import { observer } from 'mobx-react-lite';
import DiceMultipleIcon from 'mdi-react/DiceMultipleIcon';

export const Attribute = observer(
  ({ attribute: { value = 1, name = 'Unknown', setValue } }) => {
    const handleValueUpdated = (e) => {
      setValue(e.currentTarget.value);
    };

    const handleAttrRolled = (e) => {
      e.preventDefault();
      // eslint-disable-next-line no-console
      console.log({ name, value });
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
            <span className="flex justify-center items-center uppercase text-lg font-black">
              {name}
              <button
                className="block ml-2 p-1 rounded-sm transition-colors duration-200 bg-transparent hover:bg-black hover:text-white"
                type="button"
                title={`Roll ${name}`}
                onClick={handleAttrRolled}
              >
                <DiceMultipleIcon size={18} />
              </button>
            </span>
          </label>
        </div>
      </div>
    );
  },
);
