import React from 'react';
import { observer } from 'mobx-react-lite';
import { TabContent, TabHeader } from './CharacterTab';

export const Journal = observer(({ journal = '' }) => {
  return (
    <TabContent>
      <TabHeader>Journal</TabHeader>
      <div className="w-full h-auto max-h-full p-2 overflow-y-auto border border-gray-600">
        {journal}
      </div>
    </TabContent>
  );
});
