import React from 'react';

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

export const ResultHit = ({
  rolls: [challenge1 = 1, challenge2 = 1, action = 0],
  hitType = 'weak',
}) => {
  return (
    <div
      className={`flex flex-grow-0 justify-center items-center p-2 text-white ${colors[hitType]} border ${borders[hitType]}`}
    >
      <strong className="uppercase mr-3">
        {hitType === 'miss' ? 'Miss' : `${hitType} Hit`}
      </strong>
      <div className="flex">
        <ChallengeResult value={challenge1} />
        <ChallengeResult value={challenge2} />
        {!!action && <ActionResult value={action} />}
      </div>
    </div>
  );
};
