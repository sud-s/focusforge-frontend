import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import '../../styles/cards.css';

const StatsCard = ({ title, value, subtext, trend, icon: Icon, trendDirection = 'neutral' }) => {
  const getTrendColor = () => {
    if (trendDirection === 'up') return 'text-green-500';
    if (trendDirection === 'down') return 'text-red-500';
    return 'text-gray-500';
  };

  const TrendIcon = trendDirection === 'up' ? ArrowUp : trendDirection === 'down' ? ArrowDown : Minus;

  return (
    <div className="card stat-card">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray text-sm font-medium">{title}</h3>
          <div className="stat-value mt-2">{value}</div>
        </div>
        {Icon && <div className="p-2 bg-blue-50 rounded-lg text-blue-500"><Icon size={24} /></div>}
      </div>
      
      {(subtext || trend) && (
        <div className="flex items-center gap-2 mt-2 text-sm">
          {trend && (
            <span className={`flex items-center font-medium ${getTrendColor()}`}>
              <TrendIcon size={14} className="mr-1" />
              {trend}
            </span>
          )}
          {subtext && <span className="text-gray">{subtext}</span>}
        </div>
      )}
    </div>
  );
};

export default StatsCard;
