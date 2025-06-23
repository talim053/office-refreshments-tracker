
import React, { useState } from 'react';
import { ExpenseFormProps, ITEM_OPTIONS, ItemName, ItemToLog, TimeSlot, TIME_SLOT_OPTIONS } from '../types';

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSaveRecords }) => {
  const initialQuantities = ITEM_OPTIONS.reduce((acc, itemName) => {
    acc[itemName] = '';
    return acc;
  }, {} as Record<ItemName, string>);

  const [quantities, setQuantities] = useState<Record<ItemName, string>>(initialQuantities);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot>(TIME_SLOT_OPTIONS[0]);

  const handleQuantityChange = (itemName: ItemName, value: string) => {
    if (value === '' || (/^\d+$/.test(value) && parseInt(value, 10) >= 0)) {
      setQuantities(prev => ({
        ...prev,
        [itemName]: value,
      }));
    }
  };

  const handleTimeSlotChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeSlot(event.target.value as TimeSlot);
  };

  const handleSaveClick = () => {
    const itemsToLog: ItemToLog[] = ITEM_OPTIONS.map(itemName => ({
      itemName,
      quantity: parseInt(quantities[itemName], 10) || 0,
    })).filter(item => item.quantity > 0);

    onSaveRecords(itemsToLog, selectedTimeSlot);
    // Reset quantities after saving, keep time slot for potential subsequent entries
    setQuantities(initialQuantities);
  };
  
  const canSave = ITEM_OPTIONS.some(itemName => (parseInt(quantities[itemName], 10) || 0) > 0);

  return (
    <div className="space-y-8">
      <div>
        <label htmlFor="time-slot" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Select Time Slot
        </label>
        <select
          id="time-slot"
          name="time-slot"
          value={selectedTimeSlot}
          onChange={handleTimeSlotChange}
          className="mt-1 block w-full py-2.5 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 dark:text-gray-100"
          aria-label="Select Time Slot"
        >
          {TIME_SLOT_OPTIONS.map(slot => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
      </div>

      <div className="space-y-6">
        {ITEM_OPTIONS.map(itemName => (
          <div key={itemName}>
            <label htmlFor={`quantity-${itemName}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Quantity for {itemName}
            </label>
            <input
              type="number"
              id={`quantity-${itemName}`}
              name={`quantity-${itemName}`}
              value={quantities[itemName]}
              onChange={e => handleQuantityChange(itemName, e.target.value)}
              min="0"
              placeholder="0"
              className="mt-1 block w-full py-2.5 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              aria-label={`Quantity for ${itemName}`}
            />
          </div>
        ))}
      </div>
      
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={handleSaveClick}
          disabled={!canSave}
          className={`py-2.5 px-8 border border-transparent rounded-lg shadow-sm text-base font-medium text-white 
            ${canSave ? 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500' : 'bg-gray-400 dark:bg-gray-500 cursor-not-allowed'}
            focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-150 ease-in-out`}
        >
          Save Records
        </button>
      </div>
    </div>
  );
};

export default ExpenseForm;
