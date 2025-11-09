# DSA Training To-Do App

A professional, responsive React-based task management application designed for demand supply analysts (DSA) at AMD to manage training and daily tasks.

## 🎯 Features

### Core Functionality

- ✅ **Full CRUD Operations** - Create, read, update, and delete tasks
- 📋 **Task Properties**
  - Title and comprehensive notes/description
  - Category: SMS, Outlook, JIRA, Agile, BOPS, DSA Process
  - Priority: High, Medium, Low (with color indicators)
  - Status: To Do, In Progress, Completed
  - Due dates for deadline tracking

### Smart Filtering & Search

- 🔍 **Real-time Search** - Filter tasks by title, notes, or category
- 🏷️ **Category Filtering** - Quickly view tasks by department/system
- 📊 **Status Filtering** - Focus on specific task states
- 🔄 **Smart Sorting** - Sort by due date, priority, or creation date

### Progress Tracking

- 📈 **Dashboard Summary Bar** - Visual progress indicator showing completion percentage
- 📊 **Statistics Cards** - Real-time task counts (Total, Completed, In Progress, To Do)
- 🎯 **Task Statistics** - Track overall productivity at a glance

### User Experience

- 💾 **Auto-Save with localStorage** - Tasks persist across browser sessions
- 🔔 **Toast Notifications** - Instant feedback for all actions (add/edit/delete)
- ✨ **Smooth Animations** - Framer Motion for polished transitions
- 📱 **Responsive Design** - Perfect on desktop, tablet, and mobile
- 🎨 **Professional Styling** - Shadcn/ui components with Tailwind CSS

### Visual Design

- 🌈 **Color-Coded Indicators**
  - Red badges for high-priority tasks
  - Green for completed tasks
  - Blue for low-priority, Purple for SMS, Orange for Agile, etc.
- ⚠️ **Overdue Highlighting** - Tasks past due date are clearly marked
- 🎭 **Soft Gradients** - Modern dashboard-style aesthetic
- ⚡ **Smooth Interactions** - Hover effects and transitions

## 🛠️ Tech Stack

- **Frontend Framework**: [Next.js 14+](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Language**: TypeScript
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: Browser localStorage API

## 📦 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout wrapper
│   ├── page.tsx            # Main app entry point
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── dialog.tsx
│   │   ├── checkbox.tsx
│   │   ├── badge.tsx
│   │   └── dropdown-menu.tsx
│   ├── TodoApp.tsx         # Main app component
│   ├── TaskCard.tsx        # Individual task card
│   ├── TaskDialog.tsx      # Add/Edit task modal
│   ├── FilterBar.tsx       # Filter and search controls
│   └── ProgressBar.tsx     # Progress summary dashboard
├── hooks/
│   └── useTaskManager.ts   # Custom hook for task state & localStorage
├── lib/
│   ├── taskUtils.ts        # Utility functions (filter, sort, formatting)
│   ├── exampleData.ts      # Sample tasks for testing
│   └── utils.ts            # shadcn/ui utilities
├── types/
│   └── task.ts             # TypeScript type definitions
└── components.json         # shadcn/ui configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17+
- npm 9+

### Installation

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Add shadcn Components** (if not already installed)

   ```bash
   npx shadcn@latest add button input select dialog checkbox badge dropdown-menu
   ```

3. **Install Additional Dependencies**
   ```bash
   npm install lucide-react framer-motion sonner clsx
   ```

### Development

**Start Development Server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Production Build

```bash
npm run build
npm start
```

## 💾 Data Persistence

All tasks are automatically saved to browser **localStorage** under the key `dsa-tasks`. This means:

- Tasks persist across browser sessions
- No backend server required
- Data is stored locally on the user's device
- Clearing browser data will delete tasks

### Load Example Data (for testing)

In browser console:

```javascript
import { loadExampleTasks } from "@/lib/exampleData";
loadExampleTasks();
window.location.reload();
```

Or edit `src/app/page.tsx` and add:

```typescript
import { loadExampleTasks } from "@/lib/exampleData";

useEffect(() => {
  // Uncomment to load example data
  // loadExampleTasks();
}, []);
```

## 🎨 Component Overview

### `TodoApp` - Main Component

The orchestrator component that:

- Manages modal state for add/edit dialogs
- Handles CRUD operations and toast notifications
- Renders the complete app layout

### `TaskCard` - Task Display

Individual task card featuring:

- Status toggle (click circle to mark complete)
- Edit/Delete actions
- Category, priority, status badges with color coding
- Due date and overdue indication
- Notes preview
- Smooth animations on add/remove

### `TaskDialog` - Add/Edit Form

Modal dialog for task management:

- Form validation (title and due date required)
- All task properties configurable
- Edit mode loads existing task data
- Cancel/Submit buttons with proper states

### `FilterBar` - Search & Filter Controls

Search and filter interface with:

- Real-time search input
- Category dropdown filter
- Status dropdown filter
- Sort by dropdown (due date, priority, created date)
- Sort order toggle (ascending/descending)

### `ProgressBar` - Statistics Dashboard

Progress tracking component showing:

- Overall completion percentage with animated bar
- Total task count
- Completed task count
- In Progress count
- To Do count
- Smooth animations on load and updates

### `useTaskManager` - Custom Hook

State management hook handling:

- Task data loading from localStorage
- localStorage persistence
- CRUD operations (add, update, delete tasks)
- Filtering logic
- Sorting logic
- Statistics calculation

## 🎯 Usage Examples

### Add a New Task

1. Click **"Add Task"** button in header
2. Fill in required fields (Title, Due Date)
3. Select Category, Priority, Status
4. Add optional notes
5. Click **"Add Task"**
6. See green toast notification

### Edit a Task

1. Click the **three-dot menu** on any task card
2. Select **"Edit"**
3. Modify task details in the dialog
4. Click **"Update Task"**
5. See blue toast notification

### Mark Task as Complete

1. Click the **circle icon** on a task card
2. Task status toggles to "Completed"
3. Task becomes semi-transparent with strikethrough title
4. See purple toast notification

### Delete a Task

1. Click the **three-dot menu** on a task card
2. Select **"Delete"**
3. Task is removed
4. See red toast notification

### Filter Tasks

1. Use the **Category dropdown** to view tasks from specific system
2. Use the **Status dropdown** to focus on specific task state
3. Use **Sort dropdown** to reorganize by different criteria
4. Click **sort order button** to toggle ascending/descending

### Search Tasks

1. Type in the **search bar** at top of filter section
2. Results update in real-time
3. Searches across title, notes, and category
4. All other filters apply simultaneously

## 🎨 Customization

### Change Colors

Edit color mappings in `src/lib/taskUtils.ts`:

```typescript
export const getPriorityColor = (priority: TaskPriority): string => {
  // Modify color classes here
};
```

### Add New Categories

1. Update `TaskCategory` type in `src/types/task.ts`
2. Add to categories array in `src/components/TaskDialog.tsx`
3. Add color mapping in `src/lib/taskUtils.ts`

### Modify Toast Styling

Edit toast options in `src/components/TodoApp.tsx`:

```typescript
toast.success("...", {
  duration: 2000,
  style: { background: "#your-color" },
});
```

### Adjust Animations

Framer Motion animation configs can be tweaked in component files.

## 🧪 Testing

### Manual Testing Checklist

- [ ] Add task with all fields
- [ ] Edit existing task
- [ ] Delete task
- [ ] Mark task as complete
- [ ] Search functionality
- [ ] Filter by category
- [ ] Filter by status
- [ ] Sort by due date, priority, created
- [ ] Toggle sort order
- [ ] Verify localStorage persistence (refresh page)
- [ ] Check responsive design on mobile
- [ ] Verify toast notifications appear

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Environment Variables

No environment variables required for local development. For deployment:

```env
# Optional: Next.js specific configs
NEXT_PUBLIC_APP_NAME=DSA Training Tasks
```

## 📈 Future Enhancements

Potential features for future versions:

- ☁️ Cloud sync with backend API
- 📅 Calendar view
- 📊 Advanced analytics & reporting
- 🏷️ Tags system
- ⏰ Recurring tasks
- 🔔 Browser notifications
- 📧 Email summaries
- 👥 Team collaboration
- 🎨 Dark mode theme
- ⌨️ Keyboard shortcuts

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is part of AMD DSA training materials.

## 👤 Author

Created for AMD Demand Supply Analyst Training Program

## 📞 Support

For issues or questions:

1. Check the component documentation inline
2. Review TypeScript types for expected data structures
3. Check browser console for error messages
4. Verify localStorage is enabled in browser settings

---

**Happy task tracking! 🚀**
