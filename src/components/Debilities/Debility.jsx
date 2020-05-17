import React from 'react';
import { observer } from 'mobx-react-lite';
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
  'text-sm',
]);

export const Debility = observer(({ name, active, toggle }) => {
  return (
    <li className="mb-1">
      <label htmlFor={name} className={labelClasses}>
        <input
          type="checkbox"
          defaultChecked={active}
          onChange={toggle}
          id={name}
          name={name}
          className="hidden"
        />
        {active ? <CircleIcon size={12} /> : <CircleOutlineIcon size={12} />}
        &nbsp;
        {name}
      </label>
    </li>
  );
});
