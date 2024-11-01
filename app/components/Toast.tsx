import React from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  
  const toastStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
  };

  return (
    <div className={` w-full p-4 rounded shadow-lg transition-all duration-300 ${toastStyles[type]}`}>
      <div className="flex items-center">
        <span className="flex-1">{message}</span>
        <button onClick={onClose} className="ml-4 text-lg">✖</button>
      </div>
    </div>
  );
};

export default Toast;
