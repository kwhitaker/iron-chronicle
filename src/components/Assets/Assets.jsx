import PlusIcon from 'mdi-react/PlusIcon';
import { observer } from 'mobx-react-lite';
import { applySnapshot, getSnapshot } from 'mobx-state-tree';
import React, { useState } from 'react';
import shortid from 'shortid';
import { Asset as AssetModel, assetTypes, useAppStore } from '../../models';
import { TabActionButton, TabContent, TabHeader } from '../CharacterTab';
import { IronText } from '../IronText';
import { AddOrUpdateAsset } from './AddOrUpdateAsset';
import { Asset } from './Asset';

export const Assets = observer(() => {
  const { currentCharacter } = useAppStore();
  const [showModalFor, setShowModalFor] = useState(null);

  const isExisting =
    !!showModalFor &&
    !!currentCharacter.assets.find((a) => a.id === showModalFor.id);

  const toggleCreate = (e) => {
    e.preventDefault();

    const nextAsset = AssetModel.create({
      id: shortid(),
      name: '',
      type: assetTypes.companion,
      description: '',
      health: null,
      maxHealth: null,
      abilities: [{ id: shortid(), description: '', available: false }],
    });

    setShowModalFor(nextAsset);
  };

  const toggleEdit = (asset) => (e) => {
    e.preventDefault();
    setShowModalFor(asset);
  };

  const hideModal = () => setShowModalFor(null);

  const handleDeleteAsset = (e) => {
    e.preventDefault();
    currentCharacter.removeAsset(showModalFor);
    setShowModalFor(null);
  };

  const handleSaveAsset = (values) => {
    const existing = getSnapshot(showModalFor);
    const { maxHealth } = values;
    const healthNum =
      maxHealth && !Number.isNaN(Number(maxHealth)) ? Number(maxHealth) : null;

    try {
      applySnapshot(showModalFor, {
        ...existing,
        ...values,
        maxHealth: healthNum,
      });

      if (!isExisting) {
        currentCharacter.addAsset(showModalFor);
      }

      hideModal();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  return (
    <TabContent>
      <TabHeader>
        <IronText>Assets</IronText>
        <TabActionButton onClick={toggleCreate} title="Add New Asset">
          <PlusIcon size={16} />
        </TabActionButton>
      </TabHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-64">
        {currentCharacter.assets.map((a) => (
          <Asset asset={a} key={a.id} onEdit={toggleEdit(a)} />
        ))}
      </div>
      {!!showModalFor && (
        <AddOrUpdateAsset
          asset={showModalFor}
          onRequestClose={hideModal}
          onSubmit={handleSaveAsset}
          onDelete={isExisting ? handleDeleteAsset : undefined}
        />
      )}
    </TabContent>
  );
});
