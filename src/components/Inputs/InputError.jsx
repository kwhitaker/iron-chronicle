import React from 'react';
import clsx from 'clsx';

const classes = [
  'my-2',
  'p-2',
  'bg-red-200',
  'border',
  'border-red-500',
  'text-red-500',
  'text-sm',
  'uppercase',
  'font-bold',
];

export const InputError = ({ className, ...props }) => (
  <div className={clsx(classes, className)} {...props} />
);
