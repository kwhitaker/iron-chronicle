/* eslint-disable react/button-has-type */
import clsx from 'clsx';
import React, { forwardRef } from 'react';
import ReactTooltip from 'react-tooltip';

const classes = clsx([
  'p-2',
  'uppercase',
  'rounded-sm',
  'transition-all',
  'duration-200',
]);

export const Button = forwardRef(
  ({ className, type = 'button', title, ...props }, ref) => (
    <>
      <button
        ref={ref}
        className={clsx(classes, className)}
        type={type}
        data-tip={title || null}
        {...props}
      />
      {!!title && <ReactTooltip className="font-body" />}
    </>
  ),
);
