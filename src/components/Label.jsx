import React from 'react';
import clsx from 'clsx';

const textClasses = clsx([
  'uppercase',
  'cursor-pointer',
  'font-bold',
  'flex',
  'items-center',
]);

const LabelText = ({ className, inline, ...props }) => (
  <span
    className={clsx(textClasses, className, {
      'mb-2': !inline,
      'mr-2': inline,
    })}
    {...props}
  />
);

const labelClasses = clsx(['flex']);

export const LabelWrapper = ({ className, inline, ...props }) => (
  <label
    {...props}
    className={clsx(labelClasses, className, {
      'flex-col': !inline,
      'items-center': inline,
      'mt-3': !inline,
    })}
  />
);

export const Label = Object.assign(LabelWrapper, {
  Text: LabelText,
});
