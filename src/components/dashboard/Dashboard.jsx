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
        // Show demo suggestions when no habits
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
      } else {
        const data = await habitApi.getAISuggestions(targetHabitId);
        setAiSuggestions(data);
      }
    } catch (err) {
      console.error('Failed to fetch AI suggestions:', err);
      // Demo suggestions when API fails
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
    // Always fetch suggestions (will show demo data if no habits)
    fetchAISuggestions();
  }, [habits]);

  const totalHabits = habits.length;
  const completedHabitsToday = habits.filter(h => h.completedToday).length;
  const pendingTasks = tasks.filter(t => !t.completed).length;
  
  const habitStreak = habits.reduce((max, habit) => {
    return Math.max(max, habit.current_streak || 0);
  }, 0);
  
  const productivityScore = Math.round(((completedHabitsToday / (totalHabits || 1)) * 0.5 + (tasks.filter(t => t.completed).length / (tasks.length || 1)) * 0.5) * 100);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-lg font-normal text-zinc-700 dark:text-zinc-200">Dashboard</h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Welcome back</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <StatsCard 
          title="Streak" 
          value={`${habitStreak}`} 
          subtext={habitStreak > 0 ? 'days' : 'start today'}
          trend={habitStreak > 0 ? '+1' : '0'}
          trendDirection={habitStreak > 0 ? 'up' : 'neutral'}
          icon={Activity} 
        />
        <StatsCard 
          title="Tasks" 
          value={pendingTasks} 
          subtext="pending" 
          trend="5" 
          trendDirection="neutral"
          icon={CheckSquare} 
        />
        <StatsCard 
          title="Score" 
          value={`${productivityScore}%`} 
          subtext="this week" 
          trend="+4%"
          trendDirection="up"
          icon={TrendingUp} 
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {/* AI Suggestion */}
          {habits.length > 0 && (
            <div className="relative">
              <button 
                onClick={fetchAISuggestions}
                className="absolute top-3 right-3 text-zinc-600 hover:text-zinc-400 flex items-center gap-1.5 z-10"
                disabled={loadingAI}
              >
                <RefreshCw size={12} className={loadingAI ? 'animate-spin' : ''} />
                <span className="text-xs">Refresh</span>
              </button>
              <AISuggestionCard 
                suggestions={aiSuggestions} 
                title="AI Insights"
              />
            </div>
          )}
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <HabitChart />
            <TaskChart />
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
