import React from 'react';
import ReactModal from 'react-modal';
import classnames from 'classnames';

const overlayClasses = classnames([
  'fixed',
  'flex',
  'flex-column',
  'justify-center',
  'items-center',
  'h-screen',
  'w-screen',
  'bg-gray-200',
  'bg-opacity-75',
  'top-0',
  'left-0',
]);

const contentClasses = classnames([
  'bg-white',
  'p-4',
  'm-4',
  'max-w-4xl',
  'max-h-full',
  'text-center',
  'overflow-y-scroll',
  'transition-all',
  'duration-200',
  'shadow-md',
  'border',
  'border-gray-400',
  'rounded-sm',
]);

export const Modal = ({ className = '', ...props }) => (
  <ReactModal
    className={classnames(contentClasses, className)}
    overlayClassName={overlayClasses}
    {...props}
  />
);

ReactModal.setAppElement('#root');
