import React, { useMemo } from 'react';
import { CheckCircle, ListTodo, Clock } from 'lucide-react';
import { useHabits } from '../../store/habitStore';
import { useTasks } from '../../store/taskStore';
import '../../styles/cards.css';

const RecentActivity = () => {
  const { habits } = useHabits();
  const { tasks } = useTasks();

  // Build real activity data from habits and tasks
  const activities = useMemo(() => {
    const activityList = [];

    // Add completed habits
    habits.forEach(habit => {
      if (habit.last_completed) {
        activityList.push({
          id: `habit-${habit.id}`,
          type: 'habit',
          title: habit.name,
          time: formatTimeAgo(habit.last_completed),
          status: 'completed'
        });
      }
    });

    // Add completed tasks
    tasks.filter(t => t.completed).forEach(task => {
      if (task.completedAt) {
        activityList.push({
          id: `task-${task.id}`,
          type: 'task',
          title: task.title,
          time: formatTimeAgo(task.completedAt),
          status: 'completed'
        });
      }
    });

    // Add recent pending tasks (if no activities yet)
    if (activityList.length === 0) {
      tasks.filter(t => !t.completed).slice(0, 3).forEach(task => {
        activityList.push({
          id: `task-pending-${task.id}`,
          type: 'task',
          title: task.title,
          time: 'Pending',
          status: 'pending'
        });
      });
    }

    // Sort by recency (most recent first) and limit to 5
    return activityList
      .sort((a, b) => {
        if (a.status === 'completed' && b.status === 'completed') return 0;
        if (a.status === 'completed') return -1;
        if (b.status === 'completed') return 1;
        return 0;
      })
      .slice(0, 5);
  }, [habits, tasks]);

  function formatTimeAgo(dateString) {
    if (!dateString) return 'Unknown';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  }

  return (
    <div className="card h-full">
      <div className="card-header">
        <h3 className="card-title">Recent Activity</h3>
      </div>
      {activities.length === 0 ? (
        <div className="text-center py-8 text-zinc-400">
          <Clock size={32} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">No activity yet</p>
          <p className="text-xs text-zinc-500">Complete habits or tasks to see them here</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
            >
              <div 
                className={`p-1.5 rounded-full ${
                  activity.type === 'habit' 
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                }`}
              >
                {activity.type === 'habit' ? <CheckCircle size={14} /> : <ListTodo size={14} />}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-normal text-sm truncate text-zinc-700 dark:text-zinc-300">{activity.title}</h4>
                <p className="text-xs text-zinc-400 flex items-center gap-1">
                  <Clock size={10} />
                  {activity.time}
                </p>
              </div>
              {activity.status === 'completed' ? (
                <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded">
                  Done
                </span>
              ) : (
                <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded">
                  Pending
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
