'use client';

import { TaskCategory, TaskStatus, FilterOptions, SortOptions } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, SortAsc } from 'lucide-react';

interface FilterBarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  sortOptions: SortOptions;
  onSortChange: (sortOptions: SortOptions) => void;
}

const categories: (TaskCategory | 'All')[] = ['All', 'SMS', 'Outlook', 'JIRA', 'Agile', 'BOPS', 'DSA Process'];
const statuses: (TaskStatus | 'All')[] = ['All', 'To Do', 'In Progress', 'Completed'];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFiltersChange,
  sortOptions,
  onSortChange,
}) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {/* Search bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search tasks by title, notes, or category..."
            value={filters.searchQuery || ''}
            onChange={(e) =>
              onFiltersChange({ ...filters, searchQuery: e.target.value })
            }
            className="pl-10"
          />
        </div>
      </div>

      {/* Filters and sort row */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        {/* Category filter */}
        <div>
          <label className="text-xs font-medium text-gray-700">Category</label>
          <Select
            value={filters.category || 'All'}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                category: value as TaskCategory | 'All',
              })
            }
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status filter */}
        <div>
          <label className="text-xs font-medium text-gray-700">Status</label>
          <Select
            value={filters.status || 'All'}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                status: value as TaskStatus | 'All',
              })
            }
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort by */}
        <div>
          <label className="text-xs font-medium text-gray-700">Sort By</label>
          <Select
            value={sortOptions.sortBy}
            onValueChange={(value) =>
              onSortChange({
                ...sortOptions,
                sortBy: value as 'dueDate' | 'priority' | 'created',
              })
            }
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="created">Created Date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort order */}
        <div>
          <label className="text-xs font-medium text-gray-700">Order</label>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              onSortChange({
                ...sortOptions,
                order: sortOptions.order === 'asc' ? 'desc' : 'asc',
              })
            }
            className="mt-1 w-full justify-center gap-2"
          >
            <SortAsc className="h-4 w-4" />
            {sortOptions.order === 'asc' ? 'Ascending' : 'Descending'}
          </Button>
        </div>
      </div>
    </div>
  );
};
