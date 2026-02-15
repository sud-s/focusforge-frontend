import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTasks } from '../../store/taskStore';
import { useUI } from '../../store/uiStore';
import '../../styles/cards.css';

const TaskChart = () => {
  const { tasks } = useTasks();
  const { theme } = useUI();
  const isDark = theme === 'dark';
  
  // Calculate completion stats
  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.filter(t => !t.completed).length;
  
  const data = [
    { name: 'Completed', tasks: completedCount },
    { name: 'Pending', tasks: pendingCount },
  ];

  const gridColor = isDark ? '#3f3f46' : '#e5e7eb';
  const textColor = isDark ? '#a1a1aa' : '#6b7280';

  return (
    <div className="card h-full">
      <div className="card-header">
        <h3 className="card-title">Task Completion Rates</h3>
      </div>
      <div style={{ height: '200px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: textColor, fontSize: 12}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: textColor, fontSize: 12}} />
            <Tooltip 
              cursor={{fill: 'transparent'}}
              contentStyle={{ 
                backgroundColor: isDark ? '#18181b' : '#fff', 
                border: `1px solid ${isDark ? '#3f3f46' : '#e5e7eb'}`,
                borderRadius: '8px',
                color: isDark ? '#e4e4e7' : '#18181b'
              }} 
            />
            <Bar dataKey="tasks" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TaskChart;
