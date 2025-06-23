
import React, { useEffect } from 'react';
import TrashIcon from './icons/TrashIcon'; // Using TrashIcon as a generic close icon for now

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-close after 5 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const baseClasses = "fixed top-5 right-5 z-50 p-4 rounded-md shadow-lg flex items-center space-x-3 max-w-sm text-sm font-medium";
  const typeClasses = type === 'success' 
    ? "bg-green-500 text-white" 
    : "bg-red-500 text-white";

  // Simple "X" icon for closing
  const CloseIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );


  return (
    <div className={`${baseClasses} ${typeClasses}`} role="alert">
      <span>{message}</span>
      <button 
        onClick={onClose} 
        className="p-1 -m-1 rounded-full hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Close notification"
      >
        <CloseIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
