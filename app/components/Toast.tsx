import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'primary';
  position?: boolean; 
  classname?: string;
  duration?: number; 
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  position = false,
  classname,
  duration = 3000, 
  onClose,
}) => {
  const toastStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    primary: 'bg-primary text-white',
  };

  useEffect(() => {

    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

   
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={` ${classname}  px-4 py-2 rounded shadow-lg transition-all duration-300 ${toastStyles[type]} ${
        position ? 'absolute' : 'relative'
      }`}
    >
      <div className="flex items-center">
        <span className="flex-1">{message}</span>
        <button onClick={() => onClose && onClose()} className="ml-4 text-lg">
          ✖
        </button>
      </div>
    </div>
  );
};

export default Toast;
