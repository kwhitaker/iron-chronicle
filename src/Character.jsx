import React from 'react';
import { observer } from 'mobx-react-lite';
import { useAppStore } from './models';
import { Momentum, Stats } from './components';

export const Character = observer(() => {
  const { characters } = useAppStore();
  const character = characters[0];

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
        <Momentum momentum={character.momentum} />
        <div className="w-10/12 px-2 h-full overflow-y-auto">
          <div className="bg-gray-400 h-full" style={{ height: '10000px' }}>
            Info
          </div>
        </div>
        <Stats stats={character.stats} />
      </div>
    </form>
  );
});
