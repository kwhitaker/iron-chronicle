import React from 'react';
import range from 'lodash/fp/range';

const MomentumVal = ({ val }) => (
  <div className="border border-black font-bold flex flex-auto text-3xl min-h-16 justify-center items-center">
    {val}
  </div>
);

export const Character = () => {
  return (
    <form className="container mx-auto h-screen pt-4 pb-4 flex flex-col">
      <div className="flex flex-initial mb-4">
        <div className="w-2/3 px-2">
          <div>
            <label htmlFor="name" className="flex flex-col">
              <span className="uppercase cursor-pointer mb-2 font-bold">
                Character
              </span>
              <input
                id="name"
                className="bg-gray-200 px-2 pt-2 pb-2 text-lg border border-black"
                defaultValue="Yo Mama"
                required
              />
            </label>
          </div>
        </div>
        <div className="w-1/3 px-2">
          <div>
            <label htmlFor="xp" className="flex flex-col">
              <span className="uppercase cursor-pointer mb-2 font-bold">
                Experience
              </span>
              <input
                id="xp"
                className="bg-gray-200 px-2 pt-2 pb-2 text-lg border border-black"
                defaultValue="0"
                required
              />
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-1 overflow-y-hidden">
        <div className="w-2/12 px-2 h-full">
          <div className="h-full flex flex-col">
            {range(-6, 11)
              .reverse()
              .map((v) => (
                <MomentumVal val={v} key={v} />
              ))}
            <div className="border border-black font-bold flex flex-col flex-auto text-3xl min-h-16 justify-center items-center bg-gray-400">
              <span className="text-base">Max</span>
              10
            </div>
            <div className="border border-black font-bold flex flex-col flex-auto text-3xl min-h-16 justify-center items-center bg-gray-400">
              <span className="text-base">Reset</span>2
            </div>
          </div>
        </div>
        <div className="w-10/12 px-2 h-full overflow-y-auto">
          <div className="bg-gray-400 h-full" style={{ height: '10000px' }}>
            Info
          </div>
        </div>
        <div className="w-2/12 px-2 h-full flex flex-col">
          <div className="bg-gray-400 h-full">Stats</div>
        </div>
      </div>
    </form>
  );
};
