import React from 'react';

const SuccessMeter = ({ probability, confidence }) => {
  const percentage = Math.round(probability * 100);
  
  // Confidence color
  const getColor = () => {
    if (confidence === 'high') return '#22c55e'; // green
    if (confidence === 'medium') return '#eab308'; // yellow
    return '#ef4444'; // red
  };
  
  const color = getColor();
  
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Success Probability</span>
        <span className="text-lg font-bold" style={{ color }}>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="h-3 rounded-full transition-all duration-500"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color 
          }}
        />
      </div>
      <div className="mt-2 text-xs text-gray-500 capitalize">Confidence: {confidence}</div>
    </div>
  );
};

export default SuccessMeter;
