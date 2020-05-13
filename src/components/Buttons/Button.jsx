import React, { forwardRef } from 'react';
import clsx from 'clsx';

const classes = clsx([
  'p-2',
  'uppercase',
  'rounded-sm',
  'transition-all',
  'duration-200',
]);

export const Button = forwardRef(
  ({ className, type = 'button', ...props }, ref) => (
    // eslint-disable-next-line react/button-has-type
    <button
      ref={ref}
      className={clsx(classes, className)}
      type={type}
      {...props}
    />
  ),
);
