import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useAuth } from '../../store/authStore';
import '../../styles/layout.css';

const Topbar = () => {
  const { user } = useAuth();

  return (
    <header className="topbar">
      <div className="flex items-center gap-4 w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search tasks, or AI insights..." 
            className="form-input"
            style={{ paddingLeft: '2.5rem', borderRadius: '2rem', border: 'none', backgroundColor: '#f3f4f6' }}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="btn-icon relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary font-bold bg-blue-100 text-blue-600">
            {user?.name?.[0] || 'A'}
          </div>
          <span className="font-medium hidden md:block">{user?.name || 'User'}</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
