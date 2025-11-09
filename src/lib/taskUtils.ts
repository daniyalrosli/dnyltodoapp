// Utility functions for task management and data handling
import { Task, TaskPriority, FilterOptions, SortOptions } from '@/types/task';

/**
 * Get priority numeric value for sorting
 */
export const getPriorityValue = (priority: TaskPriority): number => {
  const priorityMap: Record<TaskPriority, number> = {
    High: 3,
    Medium: 2,
    Low: 1,
  };
  return priorityMap[priority];
};

/**
 * Get priority color for UI display
 */
export const getPriorityColor = (priority: TaskPriority): string => {
  const colorMap: Record<TaskPriority, string> = {
    High: 'bg-red-100 text-red-800 border-red-300',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    Low: 'bg-blue-100 text-blue-800 border-blue-300',
  };
  return colorMap[priority];
};

/**
 * Get status color for UI display
 */
export const getStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    'To Do': 'bg-gray-100 text-gray-800 border-gray-300',
    'In Progress': 'bg-blue-100 text-blue-800 border-blue-300',
    Completed: 'bg-green-100 text-green-800 border-green-300',
  };
  return statusMap[status] || 'bg-gray-100 text-gray-800 border-gray-300';
};

/**
 * Get category color for UI display
 */
export const getCategoryColor = (category: string): string => {
  const categoryMap: Record<string, string> = {
    SMS: 'bg-purple-100 text-purple-800 border-purple-300',
    Outlook: 'bg-blue-100 text-blue-800 border-blue-300',
    JIRA: 'bg-green-100 text-green-800 border-green-300',
    Agile: 'bg-orange-100 text-orange-800 border-orange-300',
    BOPS: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    'DSA Process': 'bg-pink-100 text-pink-800 border-pink-300',
  };
  return categoryMap[category] || 'bg-gray-100 text-gray-800 border-gray-300';
};

/**
 * Filter tasks based on category, status, and search query
 */
export const filterTasks = (tasks: Task[], filters: FilterOptions): Task[] => {
  return tasks.filter((task) => {
    // Category filter
    if (filters.category && filters.category !== 'All' && task.category !== filters.category) {
      return false;
    }

    // Status filter
    if (filters.status && filters.status !== 'All' && task.status !== filters.status) {
      return false;
    }

    // Search query filter
    if (filters.searchQuery && filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        task.notes.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query)
      );
    }

    return true;
  });
};

/**
 * Sort tasks based on sort options
 */
export const sortTasks = (tasks: Task[], sortOptions: SortOptions): Task[] => {
  const sorted = [...tasks].sort((a, b) => {
    let comparison = 0;

    switch (sortOptions.sortBy) {
      case 'dueDate':
        comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        break;
      case 'priority':
        comparison = getPriorityValue(b.priority) - getPriorityValue(a.priority);
        break;
      case 'created':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      default:
        comparison = 0;
    }

    return sortOptions.order === 'asc' ? comparison : -comparison;
  });

  return sorted;
};

/**
 * Calculate task completion statistics
 */
export const calculateTaskStats = (tasks: Task[]) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
  const todo = tasks.filter((t) => t.status === 'To Do').length;
  const completionPercentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return {
    total,
    completed,
    inProgress,
    todo,
    completionPercentage,
  };
};

/**
 * Format date for display
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Check if date is overdue
 */
export const isOverdue = (dueDate: string, status: string): boolean => {
  if (status === 'Completed') return false;
  return new Date(dueDate) < new Date();
};

/**
 * Generate unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
