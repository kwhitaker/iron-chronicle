import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import { Input, TextArea } from '../Inputs';
import { Label } from '../Label';
import { ResultHit } from '../ResultHit';

export const RollResult = observer(({ result, onRequestClose }) => {
  const {
    rolls,
    title,
    outcome,
    description,
    setOutcome,
    setTitle,
    setDescription,
  } = result;

  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  const handleTitleUpdated = (e) => {
    e.preventDefault();
    setTitle(e.currentTarget.value);
  };

  const handleOutcomeUpdated = (e) => {
    e.preventDefault();
    setOutcome(e.currentTarget.value);
  };

  const handleDescriptionUpdated = (e) => {
    e.preventDefault();
    setDescription(e.currentTarget.value);
  };

  return (
    <div className="py-4 px-2 text-left">
      <div className="flex items-bottom">
        <Label htmlFor="title" className="flex-auto mr-2">
          <Label.Text>Title</Label.Text>
          <Input
            id="title"
            value={title}
            onChange={handleTitleUpdated}
            placeholder="Title"
            ref={titleRef}
          />
        </Label>
        <ResultHit rolls={rolls} hitType={result.hitType} />
      </div>
      <div className="mt-4">
        <Label htmlFor="outcome">
          <Label.Text>Outcome</Label.Text>
          <Input
            id="outcome"
            value={outcome || ''}
            onChange={handleOutcomeUpdated}
            placeholder="Mark 1 progress, -1 health, etc."
          />
        </Label>
      </div>
      <div className="mt-4">
        <Label htmlFor="description">
          <Label.Text>Description</Label.Text>
          <TextArea
            id="description"
            value={description || ''}
            onChange={handleDescriptionUpdated}
            placeholder="Narrative description..."
            noresize
          >
            {description}
          </TextArea>
        </Label>
      </div>
      <div className="mt-4 pt-3 flex justify-end border-t border-gray-600">
        <button
          className="bg-gray-300 p-2 uppercase"
          type="button"
          onClick={onRequestClose}
        >
          Done
        </button>
      </div>
    </div>
  );
});
