
import React from 'react';
import { ExpenseListItemProps } from '../types';
import TrashIcon from './icons/TrashIcon';

const ExpenseListItem: React.FC<ExpenseListItemProps> = ({ entry, onDeleteEntry }) => {
  const formattedDate = new Date(entry.dateTime).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  return (
    <li className="flex items-center justify-between py-4 space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-md px-2 -mx-2 transition-colors duration-100">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
          <span className="font-semibold text-primary-600 dark:text-primary-400">{entry.itemName}</span> - Qty: {entry.quantity}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {formattedDate}, {entry.timeSlot}
        </p>
      </div>
      <div className="flex-shrink-0">
        <button
          onClick={() => onDeleteEntry(entry.id)}
          className="p-1.5 rounded-full text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-700/30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800 transition-all duration-150 ease-in-out"
          aria-label={`Delete record for ${entry.itemName} (Qty: ${entry.quantity}) on ${formattedDate} during ${entry.timeSlot}`}
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </li>
  );
};

export default ExpenseListItem;
