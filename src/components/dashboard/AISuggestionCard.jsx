import React from 'react';
import { Sparkles, AlertTriangle, Clock, Calendar, Trophy, Lightbulb } from 'lucide-react';

const AISuggestionCard = ({ suggestions, title = "AI Smart Insights" }) => {
  if (!suggestions || !suggestions.suggestions || suggestions.suggestions.length === 0) {
    return null;
  }

  const icons = {
    warning: <AlertTriangle size={18} className="text-amber-500" />,
    optimal_time: <Clock size={18} className="text-blue-500" />,
    difficult_day: <Calendar size={18} className="text-red-500" />,
    streak: <Trophy size={18} className="text-yellow-500" />,
    tip: <Lightbulb size={18} className="text-purple-500" />
  };

  const bgColors = {
    warning: 'bg-amber-50 border-amber-200',
    optimal_time: 'bg-blue-50 border-blue-200',
    difficult_day: 'bg-red-50 border-red-200',
    streak: 'bg-yellow-50 border-yellow-200',
    tip: 'bg-purple-50 border-purple-200'
  };

  const priorityColors = {
    high: 'border-l-4 border-l-red-500',
    medium: 'border-l-4 border-l-amber-500',
    low: 'border-l-4 border-l-blue-500'
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center gap-2">
          <Sparkles className="text-purple-500" size={20} />
          <h3 className="card-title">{title}</h3>
        </div>
        {suggestions.summary && (
          <span className="text-xs text-gray-500">{suggestions.summary}</span>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        {suggestions.suggestions.map((suggestion, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg border ${bgColors[suggestion.type] || bgColors.tip} ${priorityColors[suggestion.priority] || ''}`}
          >
            <div className="flex items-start gap-2">
              <span className="flex-shrink-0 mt-0.5">
                {icons[suggestion.type] || icons.tip}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">{suggestion.title}</h4>
                  {suggestion.priority && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      suggestion.priority === 'high' ? 'bg-red-100 text-red-600' :
                      suggestion.priority === 'medium' ? 'bg-amber-100 text-amber-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {suggestion.priority}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{suggestion.message}</p>
                {suggestion.action && (
                  <p className="text-sm text-primary font-medium mt-2">
                    💡 {suggestion.action}
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
