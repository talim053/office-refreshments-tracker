
import React, { useState, useEffect, useCallback } from 'react';
import { ExpenseEntry, ItemName } from './types';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import SummaryDisplay from './components/SummaryDisplay';

const LOCAL_STORAGE_KEY = 'officeExpensesApp.entries';

// Simple ID generator
const generateId = (): string => `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const App: React.FC = () => {
  const [entries, setEntries] = useState<ExpenseEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedEntries = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedEntries) {
        setEntries(JSON.parse(storedEntries));
      }
    } catch (error) {
      console.error("Failed to load entries from localStorage:", error);
      // Optionally, clear corrupted data or notify user
      // localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) { // Only save after initial load
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
        } catch (error) {
            console.error("Failed to save entries to localStorage:", error);
        }
    }
  }, [entries, isLoading]);

  const handleAddEntry = useCallback((entryData: Omit<ExpenseEntry, 'id' | 'totalCost'>) => {
    const newEntry: ExpenseEntry = {
      ...entryData,
      id: generateId(),
      totalCost: entryData.quantity * entryData.pricePerItem,
    };
    setEntries(prevEntries => [newEntry, ...prevEntries]);
  }, []);

  const handleDeleteEntry = useCallback((id: string) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">Loading expenses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-6 sm:py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-600 dark:text-primary-400">
            Office Refreshments Tracker
          </h1>
        </header>

        <section className="mb-8 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-5 text-gray-700 dark:text-gray-300">
            Add New Expense
          </h2>
          <ExpenseForm onAddEntry={handleAddEntry} />
        </section>

        {entries.length > 0 && (
          <section className="mb-8 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-5 text-gray-700 dark:text-gray-300">
              Expense Summary
            </h2>
            <SummaryDisplay entries={entries} />
          </section>
        )}

        <section className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-5 text-gray-700 dark:text-gray-300">
            Expense Log
          </h2>
          {entries.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No expenses recorded yet. Add one above!</p>
          ) : (
            <ExpenseList entries={entries} onDeleteEntry={handleDeleteEntry} />
          )}
        </section>

        <footer className="text-center mt-10 py-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
                A simple tracker for your office snacks.
            </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
