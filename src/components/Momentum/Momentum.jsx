import React from 'react';
import range from 'lodash/fp/range';
import { observer } from 'mobx-react-lite';
import { MomentumValue } from './MomentumValue';

export const Momentum = observer(
  ({
    momentum: {
      min = -6,
      max = 10,
      resetValue = 2,
      currentMax = 10,
      value = 2,
      setValue,
      setResetValue,
      setCurrentMax,
      // reset,
    },
  }) => {
    const handleValueClicked = (nextVal) => (e) => {
      e.preventDefault();
      setValue(nextVal);
    };

    // const handeleMomentumReset = (e) => {
    //   e.preventDefault();
    //   reset();
    // };

    const handleResetUpdated = (e) => {
      e.preventDefault();
      const next = e.currentTarget.value;
      setResetValue(next);
    };

    const handleMaxUpdated = (e) => {
      e.preventDefault();
      const next = e.currentTarget.value;
      setCurrentMax(next);
    };

    return (
      <div className="w-2/12 h-full flex flex-col overflow-y-hidden border border-black">
        <div className="flex-shrink-0 p-2 bg-black uppercase text-white text-center">
          Momentum
        </div>
        <div className="h-full flex flex-col h-auto overflow-y-auto scrollbar-w-2 scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray scrolling-touch">
          {range(min, max + 1)
            .reverse()
            .map((v) => (
              <MomentumValue
                value={v}
                key={v}
                active={value === v}
                onClick={handleValueClicked(v)}
              />
            ))}
          <div className="border-b border-black font-bold flex-auto min-h-16 bg-gray-400">
            <label
              className="flex flex-col text-base justify-center items-center cursor-pointer uppercase"
              htmlFor="currentMax"
            >
              Max
              <input
                value={currentMax}
                onChange={handleMaxUpdated}
                id="currentMax"
                className="text-2xl p-1 text-center font-black bg-transparent"
              />
            </label>
          </div>
          <div className="font-bold flex-auto min-h-16 bg-gray-400">
            <label
              className="flex flex-col text-base justify-center items-center cursor-pointer uppercase"
              htmlFor="resetValue"
            >
              Reset
              <input
                value={resetValue}
                onChange={handleResetUpdated}
                id="resetValue"
                className="text-2xl p-1 text-center font-black bg-transparent"
              />
            </label>
          </div>
        </div>
      </div>
    );
  },
);
