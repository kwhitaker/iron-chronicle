import React, { forwardRef } from 'react';
import classnames from 'classnames';

const classes = classnames([
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
  <textarea
    rows={6}
    {...props}
    ref={ref}
    className={classnames(classes, className)}
  >
    {children}
  </textarea>
));
