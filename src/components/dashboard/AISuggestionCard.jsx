import React from 'react';
import { Sparkles, AlertTriangle, Clock, Calendar, Trophy, Lightbulb } from 'lucide-react';

const AISuggestionCard = ({ suggestions, title = "AI Insights" }) => {
  if (!suggestions || !suggestions.suggestions || suggestions.suggestions.length === 0) {
    return null;
  }

  const icons = {
    warning: <AlertTriangle size={14} className="text-amber-500 dark:text-amber-400" />,
    optimal_time: <Clock size={14} className="text-blue-500 dark:text-blue-400" />,
    difficult_day: <Calendar size={14} className="text-red-500 dark:text-red-400" />,
    streak: <Trophy size={14} className="text-yellow-500 dark:text-yellow-400" />,
    tip: <Lightbulb size={14} className="text-purple-500 dark:text-purple-400" />
  };

  const priorityColors = {
    high: 'border-l-2 border-l-red-500',
    medium: 'border-l-2 border-l-amber-500',
    low: 'border-l-2 border-l-blue-500'
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center gap-2">
          <Sparkles className="text-zinc-400" size={16} />
          <h3 className="card-title">{title}</h3>
        </div>
        {suggestions.summary && (
          <span className="text-xs text-zinc-400">{suggestions.summary}</span>
        )}
      </div>
      
      <div className="space-y-2">
        {suggestions.suggestions.map((suggestion, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg border border-zinc-200/50 dark:border-zinc-800/50 ${priorityColors[suggestion.priority] || ''}`}
          >
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 mt-0.5">
                {icons[suggestion.type] || icons.tip}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-normal text-sm text-zinc-700 dark:text-zinc-300">{suggestion.title}</h4>
                  {suggestion.priority && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      suggestion.priority === 'high' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                      suggestion.priority === 'medium' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {suggestion.priority}
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{suggestion.message}</p>
                {suggestion.action && (
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2">
                    → {suggestion.action}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AISuggestionCard;
