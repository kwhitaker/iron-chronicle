import React from 'react';

const defaultClasses = [
  'border-b',
  'border-black',
  'font-bold',
  'flex',
  'flex-auto',
  'text-3xl',
  'min-h-16',
  'justify-center',
  'items-center',
  'cursor-pointer',
];

const activeClasses = ['bg-gray-200'];

export const MomentumValue = ({ value, active, onClick }) => {
  let classes = defaultClasses;

  if (active) {
    classes = classes.concat(activeClasses);
  }

  const text = value >= 0 ? `+${value}` : `-${Math.abs(value)}`;

  return (
    <button className={classes.join(' ')} onClick={onClick} type="button">
      {text}
    </button>
  );
};
