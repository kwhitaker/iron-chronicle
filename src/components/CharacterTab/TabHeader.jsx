import React from 'react';
import clsx from 'clsx';

const classes = clsx([
  'flex',
  'justify-center',
  'items-center',
  'uppercase',
  'mb-4',
  'pb-2',
  'text-2xl',
  'border-b-2',
  'border-black',
  'text-center',
]);

export const TabHeader = ({ className, children, ...props }) => (
  <h3 className={clsx(classes, className)} {...props}>
    {children}
  </h3>
);
