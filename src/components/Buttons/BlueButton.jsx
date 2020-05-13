import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { Button } from './Button';

const classes = clsx(['bg-blue-500', 'text-white', 'hover:bg-blue-700']);

export const BlueButton = forwardRef(({ className, ...props }, ref) => (
  <Button ref={ref} className={clsx(classes, className)} {...props} />
));
