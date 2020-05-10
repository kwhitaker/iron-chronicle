import React from 'react';
import { Character } from './Character';
import { AppStoreProvider, appStore } from './models';

const App = () => {
  return (
    <AppStoreProvider value={appStore}>
      <Character />
    </AppStoreProvider>
  );
};

export default App;
