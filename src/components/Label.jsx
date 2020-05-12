import React from 'react';
import classnames from 'classnames';

const textClasses = classnames(['uppercase', 'cursor-pointer', 'font-bold']);

const LabelText = ({ className, inline, ...props }) => (
  <span
    className={classnames(textClasses, className, {
      'mb-2': !inline,
      'mr-2': inline,
    })}
    {...props}
  />
);

const labelClasses = classnames(['flex']);

export const LabelWrapper = ({ className, inline, ...props }) => (
  <label
    {...props}
    className={classnames(labelClasses, className, {
      'flex-col': !inline,
      'items-center': inline,
    })}
  />
);

export const Label = Object.assign(LabelWrapper, {
  Text: LabelText,
});
