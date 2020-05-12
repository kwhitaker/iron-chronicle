import React from 'react';
import CloseIcon from 'mdi-react/CloseIcon';
import classnames from 'classnames';

export const ModalHeader = ({ children, onRequestClose, ...props }) => (
  <div
    className={classnames(
      'flex justify-between items-center pb-2 border-b border-gray-600',
    )}
    {...props}
  >
    {children}
    {onRequestClose && (
      <button onClick={onRequestClose} type="button" className="block ml-4">
        <CloseIcon size={24} />
      </button>
    )}
  </div>
);
