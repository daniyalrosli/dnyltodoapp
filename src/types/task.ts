// Task types and enums for the To-Do application

export type TaskCategory = 'SMS' | 'Outlook' | 'JIRA' | 'Agile' | 'BOPS' | 'DSA Process';
export type TaskPriority = 'High' | 'Medium' | 'Low';
export type TaskStatus = 'To Do' | 'In Progress' | 'Completed';

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface FilterOptions {
  category?: TaskCategory | 'All';
  status?: TaskStatus | 'All';
  searchQuery?: string;
}

export interface SortOptions {
  sortBy: 'dueDate' | 'priority' | 'created';
  order: 'asc' | 'desc';
}
