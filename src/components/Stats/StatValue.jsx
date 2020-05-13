import React from 'react';
import clsx from 'clsx';

const defaultClasses = clsx([
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
]);

export const StatValue = ({ value, active, onClick }) => (
  <button
    className={clsx(defaultClasses, {
      'bg-gray-200': active,
    })}
    onClick={onClick}
    type="button"
  >
    +{value}
  </button>
);
