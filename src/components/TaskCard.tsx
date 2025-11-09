'use client';

import { Task, TaskCategory, TaskStatus } from '@/types/task';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  getPriorityColor,
  getStatusColor,
  getCategoryColor,
  formatDate,
  isOverdue,
} from '@/lib/taskUtils';
import { MoreVertical, Edit2, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const isDue = isOverdue(task.dueDate, task.status);
  const isCompleted = task.status === 'Completed';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`rounded-lg border-2 border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md ${
        isCompleted ? 'bg-gray-50 opacity-75' : ''
      } ${isDue && !isCompleted ? 'border-red-300 bg-red-50' : ''}`}
    >
      {/* Header with status and actions */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={() =>
              onStatusChange(
                task.id,
                isCompleted ? 'To Do' : 'Completed'
              )
            }
            className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {isCompleted ? (
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            ) : (
              <Circle className="h-6 w-6" />
            )}
          </button>
          <div className="flex-1">
            <h3
              className={`font-semibold text-gray-800 ${
                isCompleted ? 'line-through text-gray-500' : ''
              }`}
            >
              {task.title}
            </h3>
          </div>
        </div>

        {/* More menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(task)}>
              <Edit2 className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Badges */}
      <div className="mb-3 flex flex-wrap gap-2">
        <Badge variant="outline" className={getCategoryColor(task.category)}>
          {task.category}
        </Badge>
        <Badge variant="outline" className={`${getPriorityColor(task.priority)} font-semibold`}>
          {task.priority}
        </Badge>
        <Badge variant="outline" className={getStatusColor(task.status)}>
          {task.status}
        </Badge>
        {isDue && !isCompleted && (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
            Overdue
          </Badge>
        )}
      </div>

      {/* Notes preview */}
      {task.notes && (
        <p className="mb-3 text-sm text-gray-600 line-clamp-2">{task.notes}</p>
      )}

      {/* Footer with due date */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Due: {formatDate(task.dueDate)}</span>
        <span>Added: {formatDate(task.createdAt)}</span>
      </div>
    </motion.div>
  );
};
