import React, { forwardRef } from 'react';
import clsx from 'clsx';

const classes = [
  'appearance-none',
  'bg-gray-200',
  'px-2',
  'pt-2',
  'pb-2',
  'text-lg',
  'border',
  'border-black,',
  'focus:bg-blue-200',
  'w-full',
];

const errorStyles = ['border-red-500'];

export const Input = forwardRef(
  ({ className, error = false, ...props }, ref) => (
    <input
      {...props}
      className={clsx(classes, className, error && errorStyles)}
      ref={ref}
    />
  ),
);

Input.displayName = 'Input';
