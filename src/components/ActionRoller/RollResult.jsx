import React, { useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

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
      <div className="flex items-center">
        <input
          id="title"
          value={title}
          onChange={handleTitleUpdated}
          className="flex-auto mr-2 h-10 p-2 text-lg bg-gray-200 border border-black"
          placeholder="Title"
          ref={titleRef}
        />
        <ResultHit rolls={rolls} hitType={result.hitType} />
      </div>
      <div className="mt-4">
        <input
          id="outcome"
          value={outcome || ''}
          onChange={handleOutcomeUpdated}
          className="block p-2 w-full h-full text-lg bg-gray-200 border border-black"
          placeholder="Outcome"
        />
      </div>
      <div className="mt-4">
        <input
          id="description"
          value={description || ''}
          onChange={handleDescriptionUpdated}
          className="block p-2 w-full h-full text-lg bg-gray-200 border border-black"
          placeholder="Description"
        />
      </div>
      <div className="mt-4 pt-3 flex justify-end border-t border-gray-600">
        <button
          className="bg-gray-500 p-2 uppercase"
          type="button"
          onClick={onRequestClose}
        >
          Done
        </button>
      </div>
    </div>
  );
});
