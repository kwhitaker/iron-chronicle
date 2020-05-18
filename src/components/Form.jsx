import clsx from 'clsx';
import React, { forwardRef } from 'react';

export const Form = forwardRef(({ className, ...props }, ref) => (
  <form className={clsx(['py-4', 'px-2'], className)} {...props} ref={ref} />
));

Form.displayName = 'Form';
