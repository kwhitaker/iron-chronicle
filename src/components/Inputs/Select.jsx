import React, { forwardRef } from 'react';
import clsx from 'clsx';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';

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
  'cursor-pointer',
  'uppercase',
];

const errorStyles = ['border-red-500'];
const disabledStyles = ['bg-gray-400', 'cursor-not-allowed', 'text-gray-600'];

const iconStyles = [
  'pointer-events-none',
  'absolute',
  'inset-y-0',
  'right-0',
  'flex',
  'items-center',
  'px-2',
  'text-gray-700',
];

export const Select = forwardRef(
  ({ className, error = false, disabled, ...props }, ref) => (
    <div className="relative">
      <select
        {...props}
        disabled={disabled}
        className={clsx(
          classes,
          className,
          error && errorStyles,
          disabled && disabledStyles,
        )}
        ref={ref}
      />
      <div className={clsx(iconStyles)}>
        <ChevronDownIcon size={20} />
      </div>
    </div>
  ),
);

Select.displayName = 'Select';
