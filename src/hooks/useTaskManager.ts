// Custom hook for managing task state and localStorage persistence
'use client';

import { useState, useEffect } from 'react';
import { Task, FilterOptions, SortOptions } from '@/types/task';
import { filterTasks, sortTasks } from '@/lib/taskUtils';

const STORAGE_KEY = 'dsa-tasks';

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'All',
    status: 'All',
    searchQuery: '',
  });
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    sortBy: 'dueDate',
    order: 'asc',
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Failed to load tasks from localStorage:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  // Add new task
  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...task,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
    return newTask;
  };

  // Update existing task
  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  // Delete task
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Get filtered and sorted tasks
  const getFilteredAndSortedTasks = () => {
    const filtered = filterTasks(tasks, filters);
    return sortTasks(filtered, sortOptions);
  };

  const processedTasks = getFilteredAndSortedTasks();

  return {
    tasks,
    processedTasks,
    filters,
    setFilters,
    sortOptions,
    setSortOptions,
    addTask,
    updateTask,
    deleteTask,
    isLoaded,
  };
};
