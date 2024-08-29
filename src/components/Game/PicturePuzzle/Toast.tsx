import React from 'react';

interface ToastProps {
  message: string;
  // onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded shadow-lg">
      {message}
      {/* <button onClick={onClose} className="ml-2 text-red-500">X</button> */}
      <button className="ml-2 text-red-500">X</button>
    </div>
  );
};

export default Toast;
