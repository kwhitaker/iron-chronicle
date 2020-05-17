import React from 'react';
import clsx from 'clsx';

const classes = ['font-iron', 'tracking-wider', 'uppercase'];

export const IronText = ({ className, ...props }) => (
  <span className={clsx(classes, className)} {...props} />
);
