// Example task data for testing and seeding the application
import { Task } from '@/types/task';

const generateFutureDate = (daysFromNow: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
};

export const EXAMPLE_TASKS: Task[] = [
  {
    id: '1',
    title: 'Complete DSA Training Module 1',
    category: 'DSA Process',
    priority: 'High',
    status: 'In Progress',
    dueDate: generateFutureDate(3),
    notes: 'Complete the fundamentals module covering demand and supply analysis basics',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Prepare JIRA tickets for sprint planning',
    category: 'JIRA',
    priority: 'High',
    status: 'To Do',
    dueDate: generateFutureDate(1),
    notes: 'Create 5 JIRA tickets for the upcoming sprint and add them to the backlog',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Review SMS requirements document',
    category: 'SMS',
    priority: 'Medium',
    status: 'Completed',
    dueDate: generateFutureDate(-1),
    notes: 'Review the SMS requirements from the product team and provide feedback',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    title: 'Send Outlook summary to stakeholders',
    category: 'Outlook',
    priority: 'High',
    status: 'To Do',
    dueDate: generateFutureDate(0),
    notes: 'Send weekly summary report to stakeholders with Q3 demand forecast updates',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    title: 'Update BOPS dashboard metrics',
    category: 'BOPS',
    priority: 'Medium',
    status: 'In Progress',
    dueDate: generateFutureDate(2),
    notes: 'Update the BOPS dashboard with latest inventory and fulfillment metrics',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '6',
    title: 'Agile retrospective meeting prep',
    category: 'Agile',
    priority: 'Low',
    status: 'To Do',
    dueDate: generateFutureDate(5),
    notes: 'Prepare slides and talking points for the team retrospective meeting',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '7',
    title: 'Analyze supply chain bottlenecks',
    category: 'DSA Process',
    priority: 'High',
    status: 'To Do',
    dueDate: generateFutureDate(4),
    notes: 'Investigate and document current supply chain bottlenecks affecting Q4 targets',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '8',
    title: 'Weekly status update email',
    category: 'Outlook',
    priority: 'Medium',
    status: 'Completed',
    dueDate: generateFutureDate(-2),
    notes: 'Send weekly status update to management with key metrics and blockers',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

/**
 * Load example tasks into localStorage
 * This is useful for testing and development
 */
export const loadExampleTasks = () => {
  const STORAGE_KEY = 'dsa-tasks';
  localStorage.setItem(STORAGE_KEY, JSON.stringify(EXAMPLE_TASKS));
  console.log('Example tasks loaded into localStorage');
};
