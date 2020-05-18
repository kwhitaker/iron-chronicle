import React from 'react';
import clsx from 'clsx';
import CircleIcon from 'mdi-react/CircleIcon';
import CircleOutlineIcon from 'mdi-react/CircleOutlineIcon';

const labelClasses = clsx([
  'flex',
  'items-center',
  'p-1',
  'cursor-pointer',
  'uppercase',
  'transition-all',
]);

const CheckLabel = ({ className, ...props }) => (
  <label className={clsx(labelClasses, className)} {...props} />
);

export const Checkbox = ({
  checked,
  defaultChecked,
  className,
  size = 12,
  ...props
}) => (
  <>
    <input
      type="checkbox"
      checked={checked}
      defaultChecked={defaultChecked}
      {...props}
      className="hidden"
    />
    {checked || defaultChecked ? (
      <CircleIcon size={size} className={className} />
    ) : (
      <CircleOutlineIcon size={size} className={className} />
    )}
  </>
);

export const LabelledCheckbox = Object.assign(CheckLabel, {
  Checkbox,
});
