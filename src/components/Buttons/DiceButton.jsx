import clsx from 'clsx';
import DiceMultipleIcon from 'mdi-react/DiceMultipleIcon';
import React from 'react';
import { Button } from './Button';

const classes = clsx(['block', 'ml-2', 'p-1']);

export const DiceButton = ({
  className,
  inverted = false,
  transparent = false,
  ...props
}) => {
  return (
    <Button
      className={clsx(classes, className, {
        'hover:bg-white hover:text-black': inverted && !transparent,
        'hover:bg-black hover:text-white': !inverted && !transparent,
      })}
      {...props}
    >
      <DiceMultipleIcon size={18} />
    </Button>
  );
};
