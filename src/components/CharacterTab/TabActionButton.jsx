import React, { forwardRef } from 'react';
import { Button } from '../Buttons';

export const TabActionButton = forwardRef((props, ref) => (
  <Button ref={ref} {...props} />
));
