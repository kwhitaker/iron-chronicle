import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { Button } from './Button';

const classes = clsx([
  'bg-gray-200',
  'hover:bg-gray-700',
  'text-black',
  'hover:text-white',
]);

export const GrayButton = forwardRef(({ className, ...props }, ref) => (
  <Button ref={ref} className={clsx(classes, className)} {...props} />
));
