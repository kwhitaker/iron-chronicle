import isNaN from 'lodash/fp/isNaN';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import {
  Attributes,
  Bonds,
  Input,
  Label,
  MiscProgress,
  Momentum,
  Stats,
  Vows,
  Assets,
  Journal,
} from './components';
import { useAppStore } from './models';
import {
  tabClasses,
  tabContentClasses,
  tabListClasses,
  tabsClasses,
} from './utils';

export const Character = observer(() => {
  const { characters, currentGame } = useAppStore();
  const [tabIndex, setTabIndex] = useState(0);
  const { journal } = currentGame;
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
            <Tabs
              className={tabsClasses}
              selectedIndex={tabIndex}
              onSelect={(nextIdx) => setTabIndex(nextIdx)}
            >
              <TabList className={tabListClasses}>
                <Tab className={tabClasses(false)}>
                  <div className={tabContentClasses(tabIndex === 0)}>Bonds</div>
                </Tab>
                <Tab className={tabClasses(false)}>
                  <div className={tabContentClasses(tabIndex === 1)}>Vows</div>
                </Tab>
                <Tab className={tabClasses(false)}>
                  <div className={tabContentClasses(tabIndex === 2)}>Other</div>
                </Tab>
                <Tab className={tabClasses(false)}>
                  <div className={tabContentClasses(tabIndex === 4)}>
                    Assets
                  </div>
                </Tab>
                <Tab className={tabClasses(false)}>
                  <div className={tabContentClasses(tabIndex === 5)}>
                    Journal
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
              <TabPanel>
                <Assets assets={character.assets} />
              </TabPanel>
              <TabPanel>
                <Journal journal={journal} />
              </TabPanel>
            </Tabs>
          </div>
        </div>
        <Stats stats={character.stats} />
      </div>
    </form>
  );
});
