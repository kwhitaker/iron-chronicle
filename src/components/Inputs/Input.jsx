import React, { forwardRef } from 'react';
import classnames from 'classnames';

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
  <input {...props} className={classnames(classes, className)} ref={ref} />
));

Input.displayName = 'Input';
