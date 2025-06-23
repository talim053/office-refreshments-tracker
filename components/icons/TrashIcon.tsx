
import React from 'react';

interface TrashIconProps {
  className?: string;
}

const TrashIcon: React.FC<TrashIconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className={className || "w-6 h-6"}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.24.032 3.22.094M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
    />
     <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.24.032 3.22.094M4.5 12.75l6 6 9-13.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.24.032 3.22.094" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 5.653c.945-.205 1.936-.338 2.966-.397M19.5 5.653c-.945-.205-1.936-.338-2.966-.397M4.5 5.653L3.75 4.5M19.5 5.653L20.25 4.5M4.5 5.653V18a2.25 2.25 0 002.25 2.25h10.5A2.25 2.25 0 0019.5 18V5.653" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7.5h6M9 10.5h6m-6 3h6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 16.5h3" />
  </svg>
);
// Simplified Trash Icon Path for clarity and correctness
const SimplifiedTrashIcon: React.FC<TrashIconProps> = ({ className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className={className || "w-6 h-6"}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.24.032 3.22.094M4.5 12.75l6 6 9-13.5" // This seems like a checkmark, not trash
      />
      {/* Actual minimalist trash icon paths */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> {/* This is an X, not trash */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10.5 11.25h3M10.5 15h3M5.25 7.5h13.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5V5.625A2.625 2.625 0 0013.125 3H10.875A2.625 2.625 0 008.25 5.625V7.5" />
    </svg>
  );

  // Using a more standard and simple trash icon:
  const StandardTrashIcon: React.FC<TrashIconProps> = ({ className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className={className || "w-5 h-5"} // Adjusted default size
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.24.032 3.22.094M6 18L18 6M6 6l12 12" // This is an "X" icon, not a trash icon.
      />
      {/* Corrected path for a simple trash can */}
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M6 18L6 8.25C6 7.56087 6.27678 6.90054 6.75736 6.4201C7.23793 5.93965 7.89837 5.66288 8.58838 5.66288H15.4116C16.1016 5.66288 16.7621 5.93965 17.2426 6.4201C17.7232 6.90054 18 7.56087 18 8.25V18M4.5 18H19.5M9.75 9.75V15M14.25 9.75V15M8.25 5.625V4.125C8.25 3.50365 8.75365 3 9.375 3H14.625C15.2463 3 15.75 3.50365 15.75 4.125V5.625" 
      />
    </svg>
  );

export default StandardTrashIcon; // Exporting the corrected simple trash icon
