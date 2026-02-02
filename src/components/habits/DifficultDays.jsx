import React from 'react';
import { AlertTriangle } from 'lucide-react';

const DifficultDays = ({ difficultDays }) => {
  if (!difficultDays || difficultDays.length === 0) return null;
  
  return (
    <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle size={18} className="text-amber-600" />
        <span className="text-sm font-medium text-amber-700">Challenging Days</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {difficultDays.map((day, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
          >
            {day}
          </span>
        ))}
      </div>
      <div className="mt-2 text-xs text-amber-600">These days may need extra motivation</div>
    </div>
  );
};

export default DifficultDays;
