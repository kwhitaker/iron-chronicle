import clsx from 'clsx';
import React from 'react';
import { IronText } from '../IronText';

const classes = ['text-xl'];

export const ModalTitle = ({ className, ...props }) => (
  <h3>
    <IronText className={clsx(classes)} {...props} />
  </h3>
);
