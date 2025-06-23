
import React from 'react';
import { ExpenseListProps } from '../types';
import ExpenseListItem from './ExpenseListItem';

const ExpenseList: React.FC<ExpenseListProps> = ({ entries, onDeleteEntry }) => {
  if (entries.length === 0) {
    return null; // Message handled in App.tsx
  }

  return (
    <div className="flow-root">
        <ul role="list" className="-my-4 divide-y divide-gray-200 dark:divide-gray-700">
            {entries.map((entry) => (
            <ExpenseListItem key={entry.id} entry={entry} onDeleteEntry={onDeleteEntry} />
            ))}
        </ul>
    </div>
  );
};

export default ExpenseList;
