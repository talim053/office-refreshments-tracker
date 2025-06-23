
import React from 'react';
import { SummaryDisplayProps, ItemName, ITEM_OPTIONS } from '../types';

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ entries }) => {
  const totalQuantityRecorded = entries.reduce((sum, entry) => sum + entry.quantity, 0);

  const itemSummaries = ITEM_OPTIONS.reduce((acc, itemName) => {
    acc[itemName] = { count: 0, totalQuantity: 0 };
    return acc;
  }, {} as Record<ItemName, { count: number; totalQuantity: number }>);

  entries.forEach(entry => {
    if (itemSummaries[entry.itemName]) { // Ensure item name is valid
      itemSummaries[entry.itemName].count++;
      itemSummaries[entry.itemName].totalQuantity += entry.quantity;
    }
  });

  const activeItems = ITEM_OPTIONS.filter(itemName => itemSummaries[itemName]?.totalQuantity > 0);

  if (entries.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400">No records available to summarize.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
        <h3 className="text-sm font-medium text-primary-700 dark:text-primary-300">Total Quantity</h3>
        <p className="mt-1 text-3xl font-semibold text-primary-600 dark:text-primary-400">
          {totalQuantityRecorded}
        </p>
      </div>

      {activeItems.length > 0 && (
        <div>
          <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Item Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeItems.map(itemName => (
              <div key={itemName} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg shadow-sm">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{itemName}</dt>
                <dd className="mt-1 text-xl font-bold text-gray-900 dark:text-gray-100">
                  {itemSummaries[itemName].totalQuantity} <span className="text-xs font-normal text-gray-500 dark:text-gray-400">total qty</span>
                </dd>
                <dd className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  ({itemSummaries[itemName].count} {itemSummaries[itemName].count === 1 ? 'entry' : 'entries'})
                </dd>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryDisplay;
