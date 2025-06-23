
import React from 'react';
import { SummaryDisplayProps, ItemName, ITEM_OPTIONS, ExpenseEntry } from '../types';

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ entries }) => {
  const totalOverallCost = entries.reduce((sum, entry) => sum + entry.totalCost, 0);
  
  const itemSummary = ITEM_OPTIONS.reduce((acc, itemName) => {
    acc[itemName] = { quantity: 0, totalCost: 0 };
    return acc;
  }, {} as Record<ItemName, { quantity: number; totalCost: number }>);

  entries.forEach(entry => {
    itemSummary[entry.itemName].quantity += entry.quantity;
    itemSummary[entry.itemName].totalCost += entry.totalCost;
  });

  const activeItems = ITEM_OPTIONS.filter(itemName => itemSummary[itemName].quantity > 0);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Overall Summary</h3>
        <p className="mt-1 text-2xl font-semibold text-primary-600 dark:text-primary-400">
          Total Spent: ₹{totalOverallCost.toFixed(2)}
        </p>
      </div>

      {activeItems.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Breakdown by Item</h3>
          <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeItems.map(itemName => (
              <div key={itemName} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{itemName}</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  ₹{itemSummary[itemName].totalCost.toFixed(2)}
                </dd>
                <dd className="text-xs text-gray-500 dark:text-gray-400">
                  ({itemSummary[itemName].quantity} items)
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
};

export default SummaryDisplay;
