'use client';

import { calculateTaskStats } from '@/lib/taskUtils';
import { Task } from '@/types/task';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Zap } from 'lucide-react';

interface ProgressBarProps {
  tasks: Task[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ tasks }) => {
  const stats = calculateTaskStats(tasks);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="rounded-lg border border-gray-200 bg-linear-to-r from-blue-50 to-indigo-50 p-6 shadow-sm"
    >
      {/* Main progress bar */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">Overall Progress</h3>
          <span className="text-lg font-bold text-blue-600">{stats.completionPercentage}%</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
          <motion.div
            className="h-full bg-linear-to-r from-green-400 to-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${stats.completionPercentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Total tasks */}
        <motion.div variants={itemVariants} className="rounded-lg bg-white p-3 shadow-xs">
          <div className="text-xs text-gray-600 mb-1">Total</div>
          <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
        </motion.div>

        {/* Completed */}
        <motion.div variants={itemVariants} className="rounded-lg bg-white p-3 shadow-xs">
          <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
            <CheckCircle2 className="h-3 w-3 text-green-600" />
            Completed
          </div>
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
        </motion.div>

        {/* In Progress */}
        <motion.div variants={itemVariants} className="rounded-lg bg-white p-3 shadow-xs">
          <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
            <Zap className="h-3 w-3 text-blue-600" />
            In Progress
          </div>
          <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
        </motion.div>

        {/* To Do */}
        <motion.div variants={itemVariants} className="rounded-lg bg-white p-3 shadow-xs">
          <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
            <Circle className="h-3 w-3 text-gray-600" />
            To Do
          </div>
          <div className="text-2xl font-bold text-gray-600">{stats.todo}</div>
        </motion.div>
      </div>
    </motion.div>
  );
};
