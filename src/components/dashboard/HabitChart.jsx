import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useHabits } from '../../store/habitStore';
import { useUI } from '../../store/uiStore';
import '../../styles/cards.css';

const HabitChart = () => {
  const { habits } = useHabits();
  const { theme } = useUI();
  const isDark = theme === 'dark';
  
  // Generate weekly data from habits
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = days.map(day => ({
    name: day,
    completed: habits.filter(h => 
      h.completedToday && 
      h.frequency === 'daily'
    ).length
  }));

  const gridColor = isDark ? '#3f3f46' : '#e5e7eb';
  const textColor = isDark ? '#a1a1aa' : '#6b7280';

  return (
    <div className="card h-full">
      <div className="card-header">
        <h3 className="card-title">Weekly Habit Completion</h3>
      </div>
      <div style={{ height: '200px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: textColor, fontSize: 12}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: textColor, fontSize: 12}} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? '#18181b' : '#fff', 
                border: `1px solid ${isDark ? '#3f3f46' : '#e5e7eb'}`,
                borderRadius: '8px',
                color: isDark ? '#e4e4e7' : '#18181b'
              }} 
            />
            <Area type="monotone" dataKey="completed" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorCompleted)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HabitChart;
