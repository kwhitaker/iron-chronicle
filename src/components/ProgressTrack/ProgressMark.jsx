import PlusIcon from 'mdi-react/PlusIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import MinusIcon from 'mdi-react/MinusIcon';
import SlashIcon from 'mdi-react/SlashForwardIcon';
import React from 'react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';

const IconWrapper = ({ children }) => (
  <div className="flex justify-center items-center h-full w-full">
    {children}
  </div>
);

const OneIcon = () => (
  <IconWrapper>
    <SlashIcon size={32} />
  </IconWrapper>
);

const TwoIcon = () => (
  <IconWrapper>
    <CloseIcon size={32} />
  </IconWrapper>
);

const ThreeIcon = () => (
  <IconWrapper>
    <CloseIcon size={32} className="absolute" />
    <MinusIcon size={32} className="absolute z-10" />
  </IconWrapper>
);

const FourIcon = () => (
  <IconWrapper>
    <CloseIcon size={32} className="absolute" />
    <PlusIcon size={32} className="absolute z-10" />
  </IconWrapper>
);

const Icons = {
  1: OneIcon,
  2: TwoIcon,
  3: ThreeIcon,
  4: FourIcon,
};

export const ProgressMark = observer(
  ({ mark: { value }, disabled = false }) => {
    const Icon = Icons[value] || null;

    return (
      <div className={clsx(['flex-auto', 'p-3'])}>
        <div
          className={clsx(
            ['w-10', 'h-10', 'border', 'border-black', 'bg-white'],
            {
              'cursor-pointer': !disabled,
              'cursor-not-allowed': disabled,
            },
          )}
        >
          {Icon !== null && <Icon />}
        </div>
      </div>
    );
  },
);
