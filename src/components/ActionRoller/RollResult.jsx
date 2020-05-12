import React, { useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Input, TextArea } from '../Inputs';
import { Label } from '../Label';

const colors = {
  weak: 'bg-gray-500',
  strong: 'bg-green-500',
  miss: 'bg-red-500',
};

const borders = {
  weak: 'border-gray-700',
  strong: 'border-green-700',
  miss: 'border-red-700',
};

const ChallengeResult = ({ value = 1 }) => (
  <div className="bg-black h-10 w-10 p-2 mx-2 text-white text-center rounded-sm">
    {value}
  </div>
);

const ActionResult = ({ value = 1 }) => (
  <div className="bg-white text-black h-10 mx-2 w-10 p-2 border border-black text-center rounded-sm">
    {value}
  </div>
);

export const ResultHit = ({ rolls = [1, 1, 1], hitType = 'weak' }) => {
  return (
    <div
      className={`flex flex-grow-0 justify-center items-center p-2 text-white ${colors[hitType]} border ${borders[hitType]}`}
    >
      <strong className="uppercase mr-3">
        {hitType === 'miss' ? 'Miss' : `${hitType} Hit`}
      </strong>
      <div className="flex">
        <ChallengeResult value={rolls[0]} />
        <ChallengeResult value={rolls[1]} />
        <ActionResult value={rolls[2]} />
      </div>
    </div>
  );
};

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
