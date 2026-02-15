import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import '../../styles/cards.css';

const StatsCard = ({ title, value, subtext, trend, icon: Icon, trendDirection = 'neutral' }) => {
  const getTrendColor = () => {
    if (trendDirection === 'up') return 'text-emerald-500 dark:text-emerald-400';
    if (trendDirection === 'down') return 'text-red-500 dark:text-red-400';
    return 'text-zinc-500 dark:text-zinc-400';
  };

  const TrendIcon = trendDirection === 'up' ? ArrowUp : trendDirection === 'down' ? ArrowDown : Minus;

  return (
    <div className="card stat-card">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-zinc-500 dark:text-zinc-400 text-xs font-normal">{title}</h3>
          <div className="stat-value mt-1">{value}</div>
        </div>
        {Icon && (
          <div className="text-zinc-500 dark:text-zinc-400">
            <Icon size={16} strokeWidth={1.5} />
          </div>
        )}
      </div>
      
      {(subtext || trend) && (
        <div className="flex items-center gap-1.5 mt-2">
          {trend && (
            <span className={`flex items-center text-xs ${getTrendColor()}`}>
              <TrendIcon size={10} className="mr-0.5" />
              {trend}
            </span>
          )}
          {subtext && <span className="text-zinc-500 dark:text-zinc-400 text-xs">{subtext}</span>}
        </div>
      )}
    </div>
  );
};

export default StatsCard;
