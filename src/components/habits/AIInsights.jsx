import React from 'react';
import { Brain, TrendingUp, TrendingDown, Clock, Calendar, Trophy } from 'lucide-react';
import SuccessMeter from './SuccessMeter';
import OptimalTime from './OptimalTime';
import DifficultDays from './DifficultDays';

const AIInsights = ({ prediction, stats, habitName, suggestions }) => {
  // Check if we have new format suggestions
  if (suggestions && suggestions.suggestions && suggestions.suggestions.length > 0) {
    return (
      <div className="card">
        <div className="card-header">
          <div className="flex items-center gap-2">
            <Brain className="text-purple-500" size={20} />
            <h3 className="card-title">AI Insights: {habitName}</h3>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          {suggestions.suggestions.map((suggestion, idx) => (
            <div 
              key={idx}
              className={`p-3 rounded-lg border ${
                suggestion.type === 'warning' ? 'bg-amber-50 border-amber-200' :
                suggestion.type === 'optimal_time' ? 'bg-blue-50 border-blue-200' :
                suggestion.type === 'difficult_day' ? 'bg-red-50 border-red-200' :
                suggestion.type === 'streak' ? 'bg-yellow-50 border-yellow-200' :
                'bg-purple-50 border-purple-200'
              }`}
            >
              <div className="flex items-start gap-2">
                {suggestion.type === 'warning' && <TrendingDown className="text-amber-500 mt-1" size={18} />}
                {suggestion.type === 'optimal_time' && <Clock className="text-blue-500 mt-1" size={18} />}
                {suggestion.type === 'difficult_day' && <Calendar className="text-red-500 mt-1" size={18} />}
                {suggestion.type === 'streak' && <Trophy className="text-yellow-500 mt-1" size={18} />}
                {suggestion.type === 'tip' && <TrendingUp className="text-purple-500 mt-1" size={18} />}
                
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{suggestion.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{suggestion.message}</p>
                  {suggestion.action && (
                    <p className="text-sm text-primary font-medium mt-2">💡 {suggestion.action}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {suggestions.summary && (
            <p className="text-sm text-gray-500 text-center mt-3">{suggestions.summary}</p>
          )}
        </div>
      </div>
    );
  }

  // Fallback to original format
  if (!prediction && !stats) return null;

  const predictedSuccess = prediction?.predicted_success ?? prediction?.success ?? true;
  const probability = prediction?.probability ?? prediction?.success_rate ?? 0.75;
  const confidence = prediction?.confidence ?? stats?.confidence ?? 'medium';
  const optimalTime = stats?.optimal_time ?? stats?.optimalTime;
  const difficultDays = stats?.difficult_days ?? stats?.difficultDays ?? [];

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center gap-2">
          <Brain className="text-purple-500" size={20} />
          <h3 className="card-title">AI Insights: {habitName}</h3>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Success Indicator */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          {predictedSuccess ? (
            <>
              <TrendingUp className="text-green-500" size={24} />
              <span className="text-green-700 font-medium">✅ Likely to succeed</span>
            </>
          ) : (
            <>
              <TrendingDown className="text-red-500" size={24} />
              <span className="text-red-700 font-medium">⚠️ At risk</span>
            </>
          )}
        </div>

        {/* Success Meter */}
        <SuccessMeter probability={probability} confidence={confidence} />

        {/* Optimal Time */}
        <OptimalTime optimalTime={optimalTime} />

        {/* Difficult Days */}
        <DifficultDays difficultDays={difficultDays} />

        {/* Additional Stats */}
        {stats && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            {stats.current_streak !== undefined && (
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">{stats.current_streak}</div>
                <div className="text-xs text-gray-500">Current Streak</div>
              </div>
            )}
            {stats.completion_rate !== undefined && (
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">{Math.round(stats.completion_rate * 100)}%</div>
                <div className="text-xs text-gray-500">Completion Rate</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
