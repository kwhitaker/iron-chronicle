import React from 'react';
import { ModalProvider } from 'react-modal-hook';
import { Character } from './Character';
import { AppStoreProvider, appStore } from './models';

const App = () => {
  return (
    <AppStoreProvider value={appStore}>
      <ModalProvider>
        <Character />
      </ModalProvider>
    </AppStoreProvider>
  );
};

export default App;
