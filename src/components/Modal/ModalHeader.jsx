import React from 'react';
import CloseIcon from 'mdi-react/CloseIcon';
import clsx from 'clsx';
import { Button } from '../Buttons';

const classes = clsx([
  'flex',
  'justify-between',
  'items-center',
  'pb-2',
  'border-b',
  'border-gray-600',
]);

export const ModalHeader = ({
  children,
  className,
  onRequestClose,
  ...props
}) => (
  <div className={clsx(classes, className)} {...props}>
    {children}
    {onRequestClose && (
      <Button onClick={onRequestClose} className="block ml-4" title="Close">
        <CloseIcon size={24} />
      </Button>
    )}
  </div>
);
