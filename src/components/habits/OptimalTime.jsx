import React from 'react';
import { Clock } from 'lucide-react';

const OptimalTime = ({ optimalTime }) => {
  if (!optimalTime) return null;
  
  return (
    <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
      <div className="flex items-center gap-2 mb-1">
        <Clock size={18} className="text-purple-600" />
        <span className="text-sm font-medium text-purple-700">Optimal Time</span>
      </div>
      <div className="text-xl font-bold text-gray-800">{optimalTime}</div>
      <div className="text-xs text-gray-500 mt-1">Best time to complete this habit</div>
    </div>
  );
};

export default OptimalTime;
