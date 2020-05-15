import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { Button } from '../Buttons';

const classes = clsx(['ml-2']);

export const TabActionButton = forwardRef(({ className, ...props }, ref) => (
  <Button ref={ref} className={clsx(classes, className)} {...props} />
));
