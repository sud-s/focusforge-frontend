import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTasks } from '../../store/taskStore';
import '../../styles/cards.css';

const TaskChart = () => {
  const { tasks } = useTasks();
  
  // Calculate completion stats
  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.filter(t => !t.completed).length;
  
  const data = [
    { name: 'Completed', tasks: completedCount },
    { name: 'Pending', tasks: pendingCount },
  ];

  return (
    <div className="card h-full">
      <div className="card-header">
        <h3 className="card-title">Task Completion Rates</h3>
      </div>
      <div style={{ height: '200px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
            <Tooltip cursor={{fill: 'transparent'}} />
            <Bar dataKey="tasks" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TaskChart;
