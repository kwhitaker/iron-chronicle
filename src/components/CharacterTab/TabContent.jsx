import React, { forwardRef } from 'react';
import clsx from 'clsx';

const classes = clsx(['mt-4', 'pt-2']);

export const TabContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={clsx(classes, className)} {...props} />
));
