
export const ITEM_OPTIONS = ["Tea", "Samosa", "Namkeen", "Coffee", "Biscuits", "Other"] as const;
export type ItemName = typeof ITEM_OPTIONS[number];

export interface ExpenseEntry {
  id: string;
  date: string; // YYYY-MM-DD
  itemName: ItemName;
  quantity: number;
  pricePerItem: number;
  personName: string;
  totalCost: number;
}

export interface ExpenseFormProps {
  onAddEntry: (entryData: Omit<ExpenseEntry, 'id' | 'totalCost'>) => void;
}

export interface ExpenseListItemProps {
  entry: ExpenseEntry;
  onDeleteEntry: (id: string) => void;
}

export interface ExpenseListProps {
  entries: ExpenseEntry[];
  onDeleteEntry: (id: string) => void;
}

export interface SummaryDisplayProps {
  entries: ExpenseEntry[];
}
