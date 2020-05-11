import React from 'react';

export const MomentumValue = ({ value, active, onClick }) => {
  const text = value >= 0 ? `+${value}` : `-${Math.abs(value)}`;

  return (
    <button
      className={`
    border-b border-black font-bold flex flex-auto text-2xl h-16 justify-center items-center cursor-pointer ${
      active ? 'bg-gray-200 hover:bg-gray-200' : 'hover:bg-blue-200'
    }`}
      onClick={onClick}
      type="button"
    >
      {text}
    </button>
  );
};
