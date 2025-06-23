
import React, { useState } from 'react';
import { ExpenseFormProps, ItemName, ITEM_OPTIONS } from '../types';

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddEntry }) => {
  const [date, setDate] = useState<string>(new Date().toLocaleDateString('en-CA')); // YYYY-MM-DD
  const [itemName, setItemName] = useState<ItemName>(ITEM_OPTIONS[0]);
  const [quantity, setQuantity] = useState<string>('1');
  const [pricePerItem, setPricePerItem] = useState<string>('');
  const [personName, setPersonName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const numQuantity = parseInt(quantity, 10);
    const numPrice = parseFloat(pricePerItem);

    if (!date || !itemName || !personName.trim()) {
        setError('Date, Item, and Person Name are required.');
        return;
    }
    if (isNaN(numQuantity) || numQuantity <= 0) {
      setError('Quantity must be a positive number.');
      return;
    }
    if (isNaN(numPrice) || numPrice <= 0) {
      setError('Price per item must be a positive number.');
      return;
    }

    onAddEntry({
      date,
      itemName,
      quantity: numQuantity,
      pricePerItem: numPrice,
      personName: personName.trim(),
    });

    // Reset form
    // setDate(new Date().toLocaleDateString('en-CA')); // Keep date or reset as preferred
    setItemName(ITEM_OPTIONS[0]);
    setQuantity('1');
    setPricePerItem('');
    setPersonName('');
  };

  const commonInputClass = "mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-500 dark:text-red-400 text-sm bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 p-3 rounded-md">{error}</p>}
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={commonInputClass}
            required
          />
        </div>
        <div>
          <label htmlFor="personName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Person Name
          </label>
          <input
            type="text"
            id="personName"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
            className={commonInputClass}
            placeholder="e.g., John Doe"
            required
          />
        </div>
        <div>
          <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Item
          </label>
          <select
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value as ItemName)}
            className={commonInputClass}
          >
            {ITEM_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
         <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className={commonInputClass}
            min="1"
            placeholder="e.g., 2"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="pricePerItem" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Price Per Item (₹)
          </label>
          <input
            type="number"
            id="pricePerItem"
            value={pricePerItem}
            onChange={(e) => setPricePerItem(e.target.value)}
            className={commonInputClass}
            step="0.01"
            min="0.01"
            placeholder="e.g., 10.50"
            required
          />
        </div>
      </div>
      
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800 transition-colors duration-150"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
