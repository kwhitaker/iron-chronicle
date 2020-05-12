import isNaN from 'lodash/fp/isNaN';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {
  Momentum,
  Stats,
  Attributes,
  Vows,
  Bonds,
  MiscProgress,
  Input,
  Label,
} from './components';
import { useAppStore } from './models';

export const Character = observer(() => {
  const { characters } = useAppStore();
  const character = characters[0];

  const handleNameUpdated = (e) => {
    character.setName(e.currentTarget.value);
  };

  const handleXPUpdated = (e) => {
    const next = Number(e.currentTarget.value);

    if (isNaN(next)) {
      // eslint-disable-next-line no-console
      console.error('XP must be a number');
      return;
    }

    character.setXP(next);
  };

  return (
    <form className="container mx-auto h-screen pt-4 pb-4 flex flex-col">
      <div className="flex flex-initial mb-4">
        <div className="w-2/3 px-2">
          <Label htmlFor="name">
            <Label.Text>Character</Label.Text>
            <Input
              id="name"
              value={character.name}
              onChange={handleNameUpdated}
              required
            />
          </Label>
        </div>
        <div className="w-1/3 px-2">
          <Label htmlFor="xp">
            <Label.Text>Experience</Label.Text>
            <Input
              id="xp"
              value={character.xp}
              onChange={handleXPUpdated}
              required
            />
          </Label>
        </div>
      </div>
      <div className="flex flex-1 overflow-y-hidden">
        <Momentum momentum={character.momentum} />
        <div className="w-10/12 px-2 h-full overflow-y-auto">
          <div className="h-full flex flex-col">
            <Attributes attributes={character.attributes} />
            <Tabs className="mx-2 my-4">
              <TabList className="flex">
                <Tab className="flex-1 mr-2">
                  <button
                    type="button"
                    role="tab"
                    className="text-center block border border-gray-200 rounded-sm py-2 px-4 bg-gray-200 hover:bg-blue-200 hover:text-blue"
                  >
                    Bonds
                  </button>
                </Tab>
                <Tab className="flex-1 mr-2">
                  <button
                    type="button"
                    role="tab"
                    className="text-center block border border-gray-200 rounded-sm py-2 px-4 bg-gray-200 hover:bg-blue-200 hover:text-blue"
                  >
                    Vows
                  </button>
                </Tab>
                <Tab className="flex-1 mr-2">
                  <button
                    type="button"
                    role="tab"
                    className="text-center block border border-gray-200 rounded-sm py-2 px-4 bg-gray-200 hover:bg-blue-200 hover:text-blue"
                  >
                    Other
                  </button>
                </Tab>
                <Tab className="flex-1">
                  <div
                    role="tab"
                    className="text-center block border border-gray-200 rounded-sm py-2 px-4 bg-gray-200 hover:bg-blue-200 hover:text-blue"
                  >
                    Assets
                  </div>
                </Tab>
              </TabList>
              <TabPanel>
                <Bonds bonds={character.bonds} />
              </TabPanel>
              <TabPanel>
                <Vows vows={character.vows} />
              </TabPanel>
              <TabPanel>
                <MiscProgress tracks={character.miscProgress} />
              </TabPanel>
              <TabPanel>Assets</TabPanel>
            </Tabs>
          </div>
        </div>
        <Stats stats={character.stats} />
      </div>
    </form>
  );
});
