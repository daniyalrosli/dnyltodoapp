'use client';

import { Task, TaskCategory, TaskPriority, TaskStatus } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { useState, useEffect } from 'react';

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialTask?: Task;
  title: string;
}

const categories: TaskCategory[] = ['SMS', 'Outlook', 'JIRA', 'Agile', 'BOPS', 'DSA Process'];
const priorities: TaskPriority[] = ['High', 'Medium', 'Low'];
const statuses: TaskStatus[] = ['To Do', 'In Progress', 'Completed'];

export const TaskDialog: React.FC<TaskDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  initialTask,
  title,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'SMS' as TaskCategory,
    priority: 'Medium' as TaskPriority,
    status: 'To Do' as TaskStatus,
    dueDate: '',
    notes: '',
  });

  // Populate form with initial data when editing
  useEffect(() => {
    if (initialTask) {
      setFormData({
        title: initialTask.title,
        category: initialTask.category,
        priority: initialTask.priority,
        status: initialTask.status,
        dueDate: initialTask.dueDate,
        notes: initialTask.notes,
      });
    } else {
      // Reset form for new task
      setFormData({
        title: '',
        category: 'SMS',
        priority: 'Medium',
        status: 'To Do',
        dueDate: '',
        notes: '',
      });
    }
  }, [initialTask, open]);

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.dueDate) {
      return;
    }
    onSubmit(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Task Title */}
          <div>
            <label className="text-sm font-medium text-gray-700">Task Title *</label>
            <Input
              placeholder="Enter task title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-gray-700">Category *</label>
            <Select value={formData.category} onValueChange={(value) =>
              setFormData({ ...formData, category: value as TaskCategory })
            }>
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

          {/* Priority */}
          <div>
            <label className="text-sm font-medium text-gray-700">Priority</label>
            <Select value={formData.priority} onValueChange={(value) =>
              setFormData({ ...formData, priority: value as TaskPriority })
            }>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <Select value={formData.status} onValueChange={(value) =>
              setFormData({ ...formData, status: value as TaskStatus })
            }>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Due Date */}
          <div>
            <label className="text-sm font-medium text-gray-700">Due Date *</label>
            <Input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="mt-1"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium text-gray-700">Notes / Description</label>
            <textarea
              placeholder="Add any notes or description..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!formData.title.trim() || !formData.dueDate}>
            {initialTask ? 'Update Task' : 'Add Task'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
