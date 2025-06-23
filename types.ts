
export const ITEM_OPTIONS = ["Tea", "Samosa", "Namkeen"] as const;
export type ItemName = typeof ITEM_OPTIONS[number];

export const TIME_SLOT_OPTIONS = ["Morning", "Afternoon", "Evening"] as const;
export type TimeSlot = typeof TIME_SLOT_OPTIONS[number];

export interface ExpenseEntry {
  id: string;
  itemName: ItemName;
  quantity: number;
  dateTime: string; // ISO string for the timestamp
  timeSlot: TimeSlot;
}

export interface ItemToLog {
  itemName: ItemName;
  quantity: number;
}

export interface ExpenseFormProps {
  onSaveRecords: (itemsToLog: ItemToLog[], timeSlot: TimeSlot) => void;
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
