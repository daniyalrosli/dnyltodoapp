'use client';

import { useState, useEffect } from 'react';
import { Task, TaskStatus } from '@/types/task';
import { Button } from '@/components/ui/button';
import { TaskDialog } from '@/components/TaskDialog';
import { TaskCard } from '@/components/TaskCard';
import { ProgressBar } from '@/components/ProgressBar';
import { FilterBar } from '@/components/FilterBar';
import { useTaskManager } from '@/hooks/useTaskManager';
import { Plus, CheckCircle2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';

export const TodoApp: React.FC = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

    const {
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
    } = useTaskManager();

    // Handle add/edit task submission
    const handleTaskSubmit = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
        if (editingTask) {
            // Update existing task
            updateTask(editingTask.id, taskData);
            toast.success('Task updated successfully! ✓', {
                duration: 2000,
                style: {
                    background: '#10b981',
                    color: '#fff',
                    border: 'none',
                },
            });
            setEditingTask(undefined);
        } else {
            // Add new task
            addTask(taskData);
            toast.success('Task added successfully! ✓', {
                duration: 2000,
                style: {
                    background: '#3b82f6',
                    color: '#fff',
                    border: 'none',
                },
            });
        }
    };

    // Handle edit
    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setDialogOpen(true);
    };

    // Handle delete
    const handleDelete = (id: string) => {
        const task = tasks.find((t) => t.id === id);
        deleteTask(id);
        toast.success(`Task "${task?.title}" deleted`, {
            duration: 2000,
            style: {
                background: '#ef4444',
                color: '#fff',
                border: 'none',
            },
        });
    };

    // Handle status change
    const handleStatusChange = (id: string, status: TaskStatus) => {
        updateTask(id, { status });
        const statusMessage = status === 'Completed' ? '✓ Task completed!' : `Status changed to ${status}`;
        toast.success(statusMessage, {
            duration: 1500,
            style: {
                background: '#8b5cf6',
                color: '#fff',
                border: 'none',
            },
        });
    };

    // Handle dialog close
    const handleDialogClose = (open: boolean) => {
        setDialogOpen(open);
        if (!open) {
            setEditingTask(undefined);
        }
    };

    if (!isLoaded) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-2 inline-flex h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
                    <p className="text-gray-600">Loading your tasks...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="border-b border-gray-200 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Daniyal Todo App</h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Daily todo for my daily tasks
                            </p>
                        </div>
                        <Button
                            onClick={() => {
                                setEditingTask(undefined);
                                setDialogOpen(true);
                            }}
                            className="gap-2 bg-blue-600 hover:bg-blue-700"
                        >
                            <Plus className="h-4 w-4" />
                            Add Task
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Progress bar */}
                <div className="mb-8">
                    <ProgressBar tasks={tasks} />
                </div>

                {/* Filter bar */}
                <div className="mb-6">
                    <FilterBar
                        filters={filters}
                        onFiltersChange={setFilters}
                        sortOptions={sortOptions}
                        onSortChange={setSortOptions}
                    />
                </div>

                {/* Task list or empty state */}
                <div>
                    {processedTasks.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center"
                        >
                            <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                            <p className="text-lg font-medium text-gray-600">
                                {tasks.length === 0
                                    ? 'No tasks yet. Create one to get started!'
                                    : 'No tasks match your filters.'}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                {tasks.length === 0 ? 'Click "Add Task" to create your first task.' : 'Try adjusting your filters.'}
                            </p>
                        </motion.div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <AnimatePresence>
                                {processedTasks.map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                        onStatusChange={handleStatusChange}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                {/* Results counter */}
                {processedTasks.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 text-center text-sm text-gray-600"
                    >
                        Showing {processedTasks.length} of {tasks.length} tasks
                    </motion.div>
                )}
            </div>

            {/* Task dialog */}
            <TaskDialog
                open={dialogOpen}
                onOpenChange={handleDialogClose}
                onSubmit={handleTaskSubmit}
                initialTask={editingTask}
                title={editingTask ? 'Edit Task' : 'Add New Task'}
            />
        </div>
    );
};
