import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { Button } from './Button';

const classes = clsx(['bg-red-500', 'hover:bg-red-700', 'text-white']);

export const RedButton = forwardRef(({ className, ...props }, ref) => (
  <Button ref={ref} className={clsx(classes, className)} {...props} />
));
