import React from 'react';
import clsx from 'clsx';

const classes = clsx([
  'flex',
  'mt-4',
  'pt-3',
  'justify-end',
  'items-center',
  'border-t',
  'border-gray-600',
]);

export const ModalFooter = ({ className, ...props }) => (
  <div className={clsx(classes, className)} {...props} />
);
