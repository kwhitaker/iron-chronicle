import React from 'react';
import ReactModal from 'react-modal';
import clsx from 'clsx';
import { ModalHeader } from './ModalHeader';
import { ModalFooter } from './ModalFooter';

const overlayClasses = clsx([
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

const contentClasses = clsx([
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

const ModalWrapper = ({ className = '', ...props }) => (
  <ReactModal
    className={clsx(contentClasses, className)}
    overlayClassName={overlayClasses}
    {...props}
  />
);

export const Modal = Object.assign(ModalWrapper, {
  Header: ModalHeader,
  Footer: ModalFooter,
});

ReactModal.setAppElement('#root');
