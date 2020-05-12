import React, { forwardRef } from 'react';
import clsx from 'clsx';

const classes = clsx([
  'block',
  'w-full',
  'bg-gray-200',
  'px-2',
  'pt-2',
  'pb-2',
  'text-lg',
  'border',
  'border-black,',
  'focus:bg-blue-200',
  'resize-none',
]);

export const TextArea = forwardRef(({ className, children, ...props }, ref) => (
  <textarea rows={6} {...props} ref={ref} className={clsx(classes, className)}>
    {children}
  </textarea>
));
