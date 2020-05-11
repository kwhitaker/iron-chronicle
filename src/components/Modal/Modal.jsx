import React from 'react';
import ReactModal from 'react-modal';

export const Modal = ({ className = '', ...props }) => (
  <ReactModal
    className={`bg-white p-4 m-4 max-w-4xl max-h-full text-center overflow-y-scroll transition-all duration-200 ${className}`}
    overlayClassName="fixed flex flex-column justify-center items-center h-screen w-screen bg-black bg-opacity-75 top-0 left-0"
    {...props}
  />
);

ReactModal.setAppElement('#root');
