import React from 'react';
import { CheckCircle, ListTodo } from 'lucide-react';
import '../../styles/cards.css';

const activities = [
  { id: 1, type: 'habit', title: 'Deep Work', time: '2 hours ago', status: 'completed' },
  { id: 2, type: 'task', title: 'Call with Jane', time: '4 hours ago', status: 'completed' },
  { id: 3, type: 'habit', title: 'Morning Jog', time: '6 hours ago', status: 'completed' },
  { id: 4, type: 'task', title: 'Project Alpha', time: 'Yesterday', status: 'pending' },
];

const RecentActivity = () => {
  return (
    <div className="card h-full">
      <div className="card-header">
        <h3 className="card-title">Recent Activity</h3>
      </div>
      <div className="flex flex-col gap-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <div className={`p-2 rounded-full ${activity.type === 'habit' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>
              {activity.type === 'habit' ? <CheckCircle size={16} /> : <ListTodo size={16} />}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">{activity.title}</h4>
              <p className="text-xs text-gray">{activity.time}</p>
            </div>
            {activity.status === 'completed' && (
              <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded">Done</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
