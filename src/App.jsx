import React from 'react';
import { ModalProvider } from 'react-modal-hook';
import 'typeface-anton';
import { Character } from './Character';
import { appStore, AppStoreProvider } from './models';

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
