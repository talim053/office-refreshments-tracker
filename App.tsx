
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ExpenseEntry, ItemName, ItemToLog, TimeSlot, ITEM_OPTIONS, TIME_SLOT_OPTIONS } from './types';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import SummaryDisplay from './components/SummaryDisplay';
import Toast from './components/Toast'; // New component for notifications

const LOCAL_STORAGE_KEY = 'officeExpensesApp.entries.batchLogsWithTimeSlots.v2'; // Updated key for potential new structure

const generateId = (): string => `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

type ToastMessage = {
  id: string;
  message: string;
  type: 'success' | 'error';
};

const App: React.FC = () => {
  const [entries, setEntries] = useState<ExpenseEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Filter states
  const [filterItemName, setFilterItemName] = useState<ItemName | 'All'>('All');
  const [filterTimeSlot, setFilterTimeSlot] = useState<TimeSlot | 'All'>('All');

  useEffect(() => {
    try {
      const storedEntries = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedEntries) {
        setEntries(JSON.parse(storedEntries));
      }
    } catch (error) {
      console.error("Failed to load entries from localStorage:", error);
      setToast({ id: generateId(), message: 'Error loading records.', type: 'error' });
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
      } catch (error) {
        console.error("Failed to save entries to localStorage:", error);
        setToast({ id: generateId(), message: 'Error saving records.', type: 'error' });
      }
    }
  }, [entries, isLoading]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ id: generateId(), message, type });
  };

  const handleSaveRecords = useCallback((itemsToLog: ItemToLog[], timeSlot: TimeSlot) => {
    const currentDateTime = new Date().toISOString();
    const newEntriesToSave: ExpenseEntry[] = itemsToLog
      .filter(item => item.quantity > 0)
      .map(item => ({
        id: generateId(),
        itemName: item.itemName,
        quantity: item.quantity,
        dateTime: currentDateTime,
        timeSlot: timeSlot,
      }));

    if (newEntriesToSave.length > 0) {
      setEntries(prevEntries => [...newEntriesToSave, ...prevEntries].sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()));
      showToast(`${newEntriesToSave.length} record(s) saved successfully!`, 'success');
    } else {
      showToast('No quantity entered for any item.', 'error');
    }
  }, []);

  const handleDeleteEntry = useCallback((id: string) => {
    setEntries(prevEntries => {
      const entryToDelete = prevEntries.find(entry => entry.id === id);
      const updatedEntries = prevEntries.filter(entry => entry.id !== id);
      if (entryToDelete) {
         showToast(`Record for ${entryToDelete.itemName} (Qty: ${entryToDelete.quantity}) deleted.`, 'success');
      }
      return updatedEntries;
    });
  }, []);

  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      const itemNameMatch = filterItemName === 'All' || entry.itemName === filterItemName;
      const timeSlotMatch = filterTimeSlot === 'All' || entry.timeSlot === filterTimeSlot;
      return itemNameMatch && timeSlotMatch;
    });
  }, [entries, filterItemName, filterTimeSlot]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300 animate-pulse">Loading records...</p>
      </div>
    );
  }

  return (
    <>
      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-6 sm:py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <header className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary-600 dark:text-primary-400 tracking-tight">
              Office Refreshments Record
            </h1>
          </header>

          <section className="mb-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-700 dark:text-gray-300 border-b pb-3 border-gray-200 dark:border-gray-700">
              Add New Record
            </h2>
            <ExpenseForm onSaveRecords={handleSaveRecords} />
          </section>

          {entries.length > 0 && (
            <section className="mb-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-700 dark:text-gray-300 border-b pb-3 border-gray-200 dark:border-gray-700">
                Summary
              </h2>
              <SummaryDisplay entries={entries} />
            </section>
          )}

          <section className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl">
            <div className="sm:flex sm:items-center sm:justify-between mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-300">
                Records
                </h2>
                {entries.length > 0 && (
                    <div className="mt-4 sm:mt-0 sm:ml-4 flex flex-col sm:flex-row gap-4">
                        {/* Item Name Filter */}
                        <div>
                            <label htmlFor="filterItem" className="sr-only">Filter by Item</label>
                            <select
                                id="filterItem"
                                value={filterItemName}
                                onChange={(e) => setFilterItemName(e.target.value as ItemName | 'All')}
                                className="block w-full sm:w-auto py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 dark:text-gray-100"
                            >
                                <option value="All">All Items</option>
                                {ITEM_OPTIONS.map(item => <option key={item} value={item}>{item}</option>)}
                            </select>
                        </div>
                        {/* Time Slot Filter */}
                        <div>
                            <label htmlFor="filterTimeSlot" className="sr-only">Filter by Time Slot</label>
                            <select
                                id="filterTimeSlot"
                                value={filterTimeSlot}
                                onChange={(e) => setFilterTimeSlot(e.target.value as TimeSlot | 'All')}
                                className="block w-full sm:w-auto py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 dark:text-gray-100"
                            >
                                <option value="All">All Time Slots</option>
                                {TIME_SLOT_OPTIONS.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {filteredEntries.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-6 text-lg">
                {entries.length === 0 ? "No records yet. Use the form above to add your first record!" : "No records match your current filters."}
              </p>
            ) : (
              <ExpenseList entries={filteredEntries} onDeleteEntry={handleDeleteEntry} />
            )}
          </section>

          <footer className="text-center mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Keeping track of office refreshments.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default App;
