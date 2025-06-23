import React from 'react';

interface TrashIconProps {
  className?: string;
}

// Using a standard and simple trash icon:
const TrashIcon: React.FC<TrashIconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className={className || "w-5 h-5"} // Default size
  >
    {/* Corrected path for a simple trash can */}
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M6 18L6 8.25C6 7.56087 6.27678 6.90054 6.75736 6.4201C7.23793 5.93965 7.89837 5.66288 8.58838 5.66288H15.4116C16.1016 5.66288 16.7621 5.93965 17.2426 6.4201C17.7232 6.90054 18 7.56087 18 8.25V18M4.5 18H19.5M9.75 9.75V15M14.25 9.75V15M8.25 5.625V4.125C8.25 3.50365 8.75365 3 9.375 3H14.625C15.2463 3 15.75 3.50365 15.75 4.125V5.625" 
    />
  </svg>
);

export default TrashIcon;
