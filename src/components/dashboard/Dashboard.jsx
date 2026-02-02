import React, { useEffect, useState } from 'react';
import { Activity, CheckSquare, TrendingUp, RefreshCw } from 'lucide-react';
import StatsCard from './StatsCard';
import HabitChart from './HabitChart';
import TaskChart from './TaskChart';
import AISuggestionCard from './AISuggestionCard';
import RecentActivity from './RecentActivity';
import { useHabits } from '../../store/habitStore';
import { useTasks } from '../../store/taskStore';
import habitApi from '../../api/habitApi';

const Dashboard = () => {
  const { habits } = useHabits();
  const { tasks } = useTasks();
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const fetchAISuggestions = async () => {
    setLoadingAI(true);
    try {
      const targetHabitId = habits[0]?.id;
      if (!targetHabitId) {
        setAiSuggestions(null);
      } else {
        const data = await habitApi.getAISuggestions(targetHabitId);
        setAiSuggestions(data);
      }
    } catch (err) {
      console.error('Failed to fetch AI suggestions:', err);
      // Fallback if API fails
      setAiSuggestions({
        suggestions: [
          {
            type: 'tip',
            title: '💡 Daily Tip',
            message: 'Focus on consistency today. Small steps lead to big results!',
            priority: 'medium',
            action: 'Try to complete at least one habit today.'
          }
        ],
        summary: '1 insight to review'
      });
    } finally {
      setLoadingAI(false);
    }
  };

  useEffect(() => {
    if (habits.length > 0) {
      fetchAISuggestions();
    }
  }, [habits]);

  const totalHabits = habits.length;
  const completedHabitsToday = habits.filter(h => h.completedToday).length;
  const pendingTasks = tasks.filter(t => !t.completed).length;
  
  // Calculate simple productivity score
  const productivityScore = Math.round(((completedHabitsToday / (totalHabits || 1)) * 0.5 + (tasks.filter(t => t.completed).length / (tasks.length || 1)) * 0.5) * 100);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray">Welcome back, here's your daily overview.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          title="Habit Streak" 
          value="12 Days" 
          subtext="+2 from yesterday" 
          trend="+12%" 
          trendDirection="up"
          icon={Activity} 
        />
        <StatsCard 
          title="Tasks Pending" 
          value={pendingTasks} 
          subtext="High Priority" 
          trend="5" 
          trendDirection="neutral"
          icon={CheckSquare} 
        />
        <StatsCard 
          title="Productivity Score" 
          value={`${productivityScore}%`} 
          subtext="Top 5% this week" 
          trend="+4%" 
          trendDirection="up"
          icon={TrendingUp} 
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols wide) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* AI Suggestion */}
          {habits.length > 0 && (
            <div className="relative">
              <button 
                onClick={fetchAISuggestions}
                className="absolute top-0 right-0 text-purple-500 hover:text-purple-700 flex items-center gap-1 z-10"
                disabled={loadingAI}
              >
                <RefreshCw size={14} className={loadingAI ? 'animate-spin' : ''} />
                <span className="text-xs">Refresh</span>
              </button>
              <AISuggestionCard 
                suggestions={aiSuggestions} 
                title="AI Smart Insights"
              />
            </div>
          )}
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HabitChart />
            <TaskChart />
          </div>
        </div>

        {/* Right Column (1 col wide) */}
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
