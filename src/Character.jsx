import clsx from 'clsx';
import isNaN from 'lodash/fp/isNaN';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import {
  Assets,
  Attributes,
  Bonds,
  Input,
  Journal,
  Label,
  MiscProgress,
  Momentum,
  Stats,
  Vows,
  Debilities,
  IronText,
} from './components';
import { useAppStore } from './models';
import {
  tabClasses,
  tabContentClasses,
  tabListClasses,
  tabsClasses,
} from './utils';

export const Character = observer(() => {
  const { currentCharacter: character } = useAppStore();
  const [tabIndex, setTabIndex] = useState(0);

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

  if (!character) {
    return null;
  }

  return (
    <div className="container mx-auto h-screen pt-4 pb-4 flex flex-col">
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
              className={clsx(tabsClasses, 'flex-auto', 'overflow-y-auto')}
              selectedIndex={tabIndex}
              onSelect={(nextIdx) => setTabIndex(nextIdx)}
            >
              <TabList className={tabListClasses}>
                <Tab className={tabClasses(false)}>
                  <div className={tabContentClasses(tabIndex === 0)}>
                    <IronText>Bonds</IronText>
                  </div>
                </Tab>
                <Tab className={tabClasses(false)}>
                  <div className={tabContentClasses(tabIndex === 1)}>
                    <IronText>Vows</IronText>
                  </div>
                </Tab>
                <Tab className={tabClasses(false)}>
                  <div className={tabContentClasses(tabIndex === 2)}>
                    <IronText>Progress Tracks</IronText>
                  </div>
                </Tab>
                <Tab className={tabClasses(false)}>
                  <div className={tabContentClasses(tabIndex === 3)}>
                    <IronText>Assets</IronText>
                  </div>
                </Tab>
                <Tab className={tabClasses(false)}>
                  <div className={tabContentClasses(tabIndex === 4)}>
                    <IronText>Journal</IronText>
                  </div>
                </Tab>
              </TabList>
              <TabPanel>
                <Bonds />
              </TabPanel>
              <TabPanel>
                <Vows />
              </TabPanel>
              <TabPanel>
                <MiscProgress />
              </TabPanel>
              <TabPanel>
                <Assets />
              </TabPanel>
              <TabPanel>
                <Journal />
              </TabPanel>
            </Tabs>
            <Debilities />
          </div>
        </div>
        <Stats stats={character.stats} />
      </div>
    </div>
  );
});
