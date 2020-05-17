import React from 'react';
import clsx from 'clsx';

const classes = (active, disabled) =>
  clsx(
    [
      'border-b',
      'border-black',
      'font-bold',
      'flex',
      'flex-auto',
      'text-2xl',
      'h-16',
      'justify-center',
      'items-center',
      'cursor-pointer',
    ],
    {
      'bg-gray-200': active,
      'hover:bg-gray-200': active,
      'hover:bg-blue-200': !active,
      'cursor-not-allowed': disabled,
      'bg-gray-400': disabled,
      'hover:bg-gray-400': disabled,
      'text-gray-700': disabled,
    },
  );

export const MomentumValue = ({ value, active, onClick, disabled }) => {
  const text = value >= 0 ? `+${value}` : `-${Math.abs(value)}`;

  return (
    <button
      className={classes(active, disabled)}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      {text}
    </button>
  );
};
