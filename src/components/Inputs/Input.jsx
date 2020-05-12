import React, { forwardRef } from 'react';
import clsx from 'clsx';

const classes = [
  'bg-gray-200',
  'px-2',
  'pt-2',
  'pb-2',
  'text-lg',
  'border',
  'border-black,',
  'focus:bg-blue-200',
];

export const Input = forwardRef(({ className, ...props }, ref) => (
  <input {...props} className={clsx(classes, className)} ref={ref} />
));

Input.displayName = 'Input';
