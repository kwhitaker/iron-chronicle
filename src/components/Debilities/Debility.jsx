import { observer } from 'mobx-react-lite';
import React from 'react';
import { LabelledCheckbox } from '../Inputs';

export const Debility = observer(({ name, active, toggle }) => {
  return (
    <li className="mb-1">
      <LabelledCheckbox htmlFor={name} className="text-sm">
        <LabelledCheckbox.Checkbox
          type="checkbox"
          defaultChecked={active}
          onChange={toggle}
          id={name}
          name={name}
        />
        &nbsp;
        {name}
      </LabelledCheckbox>
    </li>
  );
});
