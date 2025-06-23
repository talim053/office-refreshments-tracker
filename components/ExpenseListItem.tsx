
import React from 'react';
import { ExpenseListItemProps } from '../types';
import TrashIcon from './icons/TrashIcon';

const ExpenseListItem: React.FC<ExpenseListItemProps> = ({ entry, onDeleteEntry }) => {
  const formattedDate = new Date(entry.date).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  return (
    <li className="flex items-center justify-between py-4 space-x-3">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 truncate">
          {entry.itemName} ({entry.quantity}) - by {entry.personName}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {formattedDate} @ ₹{entry.pricePerItem.toFixed(2)} each
        </p>
      </div>
      <div className="flex-shrink-0 flex flex-col items-end">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            ₹{entry.totalCost.toFixed(2)}
        </p>
        <button
            onClick={() => onDeleteEntry(entry.id)}
            className="mt-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-150"
            aria-label={`Delete entry for ${entry.itemName} by ${entry.personName}`}
        >
            <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </li>
  );
};

export default ExpenseListItem;
