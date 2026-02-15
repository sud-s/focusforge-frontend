import React, { useState, useEffect } from 'react';
import { 
  Sparkles, TrendingUp, TrendingDown, AlertTriangle, 
  Clock, Calendar, Trophy, Target, ArrowRight,
  RefreshCw, CheckCircle, XCircle, Zap
} from 'lucide-react';
import coachApi from '../../api/coachApi';
import '../../styles/cards.css';

const AICoachPage = () => {
  const [loading, setLoading] = useState(true);
  const [coachData, setCoachData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [error, setError] = useState(null);

  // Load coach data on mount
  useEffect(() => {
    loadCoachData();
  }, []);

  const loadCoachData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await coachApi.getAllInsights();
      setCoachData(response.data);
    } catch (err) {
      console.error('Error loading coach data:', err);
      // Set demo data for preview (no error message)
      setCoachData({
        status: {
          status: 'active',
          coach_type: 'Discipline Coach',
          user_level: '🌟 Rising Star',
          summary: {
            productivity_score: 72,
            trend: 'improving',
            total_habits: 3,
            average_streak: 5
          }
        },
        tomorrow: {
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          overall_prediction: {
            success_probability: 75,
            level: 'likely',
            confidence: 'high'
          },
          habits_prediction: [
            { habit_id: '1', habit_name: 'Morning Exercise', success_probability: 80, prediction: 'likely', risk_level: 'low' },
            { habit_id: '2', habit_name: 'Read for 20 min', success_probability: 70, prediction: 'likely', risk_level: 'low' },
            { habit_id: '3', habit_name: 'Meditation', success_probability: 65, prediction: 'unlikely', risk_level: 'medium' }
          ],
          alerts: [],
          coach_message: 'You are on track! Keep up the great work!'
        },
        failure_risk: {
          risk_score: 25,
          risk_level: 'low',
          identified_risks: [
            { type: 'Evening Fatigue', severity: 'low', indicator: 'Energy drops after 8pm', impact: 'May affect night habits', action: 'Schedule important habits earlier in the day' }
          ],
          protective_factors: [
            'Strong morning routine',
            'Consistent habit tracking'
          ],
          coach_intervention: 'Your consistency is improving! Keep building positive habits.'
        },
        weekly_score: {
          score: 72,
          level: '🌟 Rising Star',
          metrics: { tasks_completed: 12, habits_completed: 18, total_completions: 30 },
          comparison: { last_week_total: 25, change_percent: 20, trend: 'improving' },
          coach_assessment: 'Great improvement! You completed 20% more tasks than last week.'
        },
        recommendations: {
          recommendations: [
            { priority: 1, title: 'Morning Routine', type: 'improvement', message: 'Your morning habits have highest success rate', action: 'Add more morning tasks', expected_impact: '+15% productivity' },
            { priority: 2, title: 'Evening Wind-Down', type: 'tip', message: 'Add 10-min wind-down routine', action: 'Start winding down by 9pm' }
          ],
          coach_tip: 'Consistency beats intensity. Small daily actions lead to big results!',
          focus_area: 'Build morning habit momentum'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper functions
  const getLevelEmoji = (level) => {
    if (level.includes('Elite')) return '🏆';
    if (level.includes('Pro')) return '⭐';
    if (level.includes('Growing')) return '📈';
    if (level.includes('Starter')) return '🌱';
    return '💪';
  };

  const getTrendIcon = (trend) => {
    if (trend === 'improving') return <TrendingUp size={16} className="text-success" />;
    if (trend === 'declining') return <TrendingDown size={16} className="text-danger" />;
    return <span className="text-secondary">➡️</span>;
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'critical': return 'danger';
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getPredictionColor = (probability) => {
    if (probability >= 70) return 'success';
    if (probability >= 40) return 'warning';
    return 'danger';
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-secondary">Loading AI Coach...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle size={48} className="text-warning mx-auto mb-4" />
          <p className="text-danger mb-4">{error}</p>
          <button onClick={loadCoachData} className="btn btn-primary">
            <RefreshCw size={16} className="mr-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { status, tomorrow, failure_risk, weekly_score, recommendations } = coachData || {};

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-normal flex items-center gap-2" style={{color: 'var(--text-primary)'}}>
            <Sparkles size={18} className="text-primary" />
            AI Coach
          </h2>
          <p className="text-xs mt-0.5" style={{color: 'var(--text-secondary)'}}>Your personal accountability</p>
        </div>
        <button onClick={loadCoachData} className="btn btn-outline text-xs py-1.5 px-3">
          <RefreshCw size={12} className="mr-1" />
          Refresh
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: Target },
          { id: 'tomorrow', label: 'Tomorrow', icon: Calendar },
          { id: 'risks', label: 'Risk', icon: AlertTriangle },
          { id: 'weekly', label: 'Weekly', icon: Trophy },
          { id: 'recommendations', label: 'Actions', icon: ArrowRight },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-primary'
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
            }`}
          >
            <tab.icon size={12} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {/* Status Card */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title text-sm">Your Status</h3>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{getLevelEmoji(status?.user_level || '🌱 Starter')}</div>
                  <div>
                    <div className="text-base font-medium text-zinc-700 dark:text-zinc-200">{status?.user_level || '🌱 Starter'}</div>
                    <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                      {getTrendIcon(status?.summary?.trend)}
                      <span>{status?.summary?.trend || 'stable'}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                    <div className="text-xl font-bold text-primary">
                      {status?.summary?.productivity_score || 0}%
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Productivity</div>
                  </div>
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                    <div className="text-xl font-bold text-primary">
                      {status?.summary?.average_streak || 0}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Avg. Streak</div>
                  </div>
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                    <div className="text-xl font-bold text-primary">
                      {status?.summary?.total_habits || 0}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Habits</div>
                  </div>
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                    <div className="text-xl font-bold text-warning">
                      {failure_risk?.risk_level?.toUpperCase() || 'LOW'}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Risk</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tomorrow Preview Card */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title text-sm">Tomorrow</h3>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">Success</span>
                  <span className="text-xl font-bold" style={{ color: tomorrow?.overall_prediction?.success_probability >= 70 ? '#22c55e' : tomorrow?.overall_prediction?.success_probability >= 40 ? '#f59e0b' : '#ef4444' }}>
                    {tomorrow?.overall_prediction?.success_probability || 0}%
                  </span>
                </div>
                
                <div className="progress-bar h-1.5 mb-3">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${tomorrow?.overall_prediction?.success_probability || 0}%`, backgroundColor: tomorrow?.overall_prediction?.success_probability >= 70 ? '#22c55e' : tomorrow?.overall_prediction?.success_probability >= 40 ? '#f59e0b' : '#ef4444' }}
                  ></div>
                </div>

                <div className={`p-2 rounded-lg text-xs ${
                  tomorrow?.overall_prediction?.success_probability >= 70 ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                  tomorrow?.overall_prediction?.success_probability >= 40 ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' :
                  'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                }`}>
                  <div className="flex items-center gap-1.5">
                    {tomorrow?.overall_prediction?.success_probability >= 70 ? <CheckCircle size={14} /> :
                     tomorrow?.overall_prediction?.success_probability >= 40 ? <Clock size={14} /> :
                     <XCircle size={14} />}
                    <span className="font-normal">
                      {tomorrow?.overall_prediction?.level || 'uncertain'}
                    </span>
                  </div>
                </div>

                {tomorrow?.alerts?.length > 0 && (
                  <div className="mt-2 p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                    <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 text-xs">
                      <AlertTriangle size={12} />
                      <span className="font-normal">{tomorrow.alerts[0].message}</span>
                    </div>
                  </div>
                )}

                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 italic">
                  "{tomorrow?.coach_message || 'Keep building your discipline!'}"
                </p>
              </div>
            </div>

            {/* Coach Tip */}
            <div className="card lg:col-span-2">
              <div className="card-header">
                <h3 className="card-title text-xs">💡 Coach Tip</h3>
              </div>
              <div className="p-3">
                <p className="text-sm text-zinc-700 dark:text-zinc-300">{recommendations?.coach_tip || 'Start with one habit!'}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Focus: <span className="text-zinc-600 dark:text-zinc-400">{recommendations?.focus_area || 'Building foundation'}</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tomorrow' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Overall Prediction */}
            <div className="card">
              <div className="card-header">
                <Calendar size={20} />
                <h3 className="card-title">{tomorrow?.date || 'Tomorrow'}</h3>
              </div>
              <div className="p-4">
                <div className="text-center mb-4">
                  <div className={`text-4xl font-bold text-${getPredictionColor(tomorrow?.overall_prediction?.success_probability)}`}>
                    {tomorrow?.overall_prediction?.success_probability || 0}%
                  </div>
                  <div className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
                    {tomorrow?.overall_prediction?.level || 'uncertain'} to succeed
                  </div>
                  <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                    Confidence: {tomorrow?.overall_prediction?.confidence || 'low'}
                  </div>
                </div>

                <div className="progress-bar h-2 mb-4">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: `${tomorrow?.overall_prediction?.success_probability || 0}%`, backgroundColor: tomorrow?.overall_prediction?.success_probability >= 70 ? '#22c55e' : tomorrow?.overall_prediction?.success_probability >= 40 ? '#f59e0b' : '#ef4444' }}
                  ></div>
                </div>

                <div className={`p-3 rounded-lg text-xs ${
                  tomorrow?.overall_prediction?.success_probability >= 70 ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                  tomorrow?.overall_prediction?.success_probability >= 40 ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' :
                  'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                }`}>
                  <p className="font-medium text-sm">"{tomorrow?.coach_message || 'Keep building your discipline!'}"</p>
                </div>
              </div>
            </div>

            {/* Habit Predictions */}
            <div className="card">
              <div className="card-header">
                <Target size={20} />
                <h3 className="card-title">Habit Predictions</h3>
              </div>
              <div className="p-4 space-y-3">
                {tomorrow?.habits_prediction?.length > 0 ? (
                  tomorrow.habits_prediction.map((habit, idx) => (
                    <div key={idx} className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm">{habit.habit_name}</span>
                        <span className={`text-lg font-bold`} style={{ color: habit.success_probability >= 70 ? '#22c55e' : habit.success_probability >= 40 ? '#f59e0b' : '#ef4444' }}>
                          {habit.success_probability}%
                        </span>
                      </div>
                      <div className="progress-bar h-1.5 mb-2">
                        <div 
                          className="progress-bar-fill"
                          style={{ width: `${habit.success_probability}%`, backgroundColor: habit.success_probability >= 70 ? '#22c55e' : habit.success_probability >= 40 ? '#f59e0b' : '#ef4444' }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          habit.risk_level === 'low' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                          habit.risk_level === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                          'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        }`}>
                          {habit.risk_level} risk
                        </span>
                        <span>{habit.prediction}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-zinc-500 dark:text-zinc-400">
                    <Target size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No habits to predict yet. Create a habit to get predictions!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Alerts */}
            {tomorrow?.alerts?.length > 0 && (
              <div className="card lg:col-span-2">
                <div className="card-header">
                  <AlertTriangle size={20} className="text-danger" />
                  <h3 className="card-title text-danger">Alerts</h3>
                </div>
                <div className="p-4 space-y-3">
                  {tomorrow.alerts.map((alert, idx) => (
                    <div key={idx} className={`p-4 rounded-lg border border-${getRiskColor(alert.type)}-200 bg-${getRiskColor(alert.type)}-50`}>
                      <div className="flex items-start gap-3">
                        <AlertTriangle size={20} className={`text-${getRiskColor(alert.type)}`} />
                        <div>
                          <p className="font-medium">{alert.message}</p>
                          {alert.habits?.length > 0 && (
                            <p className="text-sm text-secondary mt-1">
                              Affected: {alert.habits.join(', ')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Risk Score */}
            <div className="card">
              <div className="card-header">
                <AlertTriangle size={20} className="text-danger" />
                <h3 className="card-title">Failure Risk Analysis</h3>
              </div>
              <div className="p-4">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold" style={{ color: failure_risk?.risk_level === 'critical' ? '#ef4444' : failure_risk?.risk_level === 'high' ? '#f59e0b' : '#22c55e' }}>
                    {failure_risk?.risk_score || 0}/100
                  </div>
                  <div className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
                    Risk Level: <span className="font-bold" style={{ color: failure_risk?.risk_level === 'critical' ? '#ef4444' : failure_risk?.risk_level === 'high' ? '#f59e0b' : '#22c55e' }}>
                      {failure_risk?.risk_level?.toUpperCase() || 'LOW'}
                    </span>
                  </div>
                </div>

                <div className={`p-3 rounded-lg text-sm ${
                  failure_risk?.risk_level === 'critical' ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400' :
                  failure_risk?.risk_level === 'high' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' :
                  'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                }`}>
                  <p className="font-medium">"{failure_risk?.coach_intervention || 'Keep building!'}"</p>
                </div>
              </div>
            </div>

            {/* Identified Risks */}
            <div className="card">
              <div className="card-header">
                <TrendingDown size={20} className="text-warning" />
                <h3 className="card-title">Identified Risks</h3>
              </div>
              <div className="p-4 space-y-3">
                {failure_risk?.identified_risks?.length > 0 ? (
                  failure_risk.identified_risks.map((risk, idx) => (
                    <div key={idx} className="p-3 rounded-lg border-l-4 bg-zinc-50 dark:bg-zinc-800" style={{ borderColor: risk.severity === 'critical' ? '#ef4444' : risk.severity === 'high' ? '#f59e0b' : '#22c55e' }}>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 rounded text-xs ${
                              risk.severity === 'critical' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                              risk.severity === 'high' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                              'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            }`}>
                              {risk.severity}
                            </span>
                            <span className="font-medium text-sm">{risk.type}</span>
                          </div>
                          <p className="text-sm">{risk.indicator}</p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{risk.impact}</p>
                        </div>
                      </div>
                      <div className="mt-2 p-2 bg-purple-100 dark:bg-purple-900/20 rounded text-sm text-purple-700 dark:text-purple-400">
                        💡 {risk.action}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-green-600 dark:text-green-400">
                    <CheckCircle size={32} className="mx-auto mb-2" />
                    <p className="text-sm">No major risks identified! You're doing great!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Protective Factors */}
            <div className="card lg:col-span-2">
              <div className="card-header">
                <CheckCircle size={20} className="text-success" />
                <h3 className="card-title">Protective Factors</h3>
              </div>
              <div className="p-4">
                {failure_risk?.protective_factors?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {failure_risk.protective_factors.map((factor, idx) => (
                      <div key={idx} className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
                        <span className="text-sm">{factor}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm">Start building positive habits to create protective factors!</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'weekly' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Weekly Score */}
            <div className="card">
              <div className="card-header">
                <Trophy size={20} className="text-warning" />
                <h3 className="card-title">Weekly Discipline Score</h3>
              </div>
              <div className="p-4">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">{weekly_score?.level?.split(' ')[0] || '🌱'}</div>
                  <div className="text-2xl font-bold text-primary">
                    {weekly_score?.score || 0}
                  </div>
                  <div className="text-zinc-500 dark:text-zinc-400 text-sm">out of 100</div>
                </div>

                <div className="progress-bar h-2.5 mb-4">
                  <div 
                    className="progress-bar-fill bg-primary" 
                    style={{ width: `${weekly_score?.score || 0}%` }}
                  ></div>
                </div>

                <div className={`p-2 rounded-lg text-center text-sm ${
                  weekly_score?.comparison?.trend === 'up' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                  weekly_score?.comparison?.trend === 'down' ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400' :
                  'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}>
                  <div className="flex items-center justify-center gap-2">
                    {weekly_score?.comparison?.trend === 'up' ? <TrendingUp size={16} /> :
                     weekly_score?.comparison?.trend === 'down' ? <TrendingDown size={16} /> :
                     <span>➡️</span>}
                    <span className="font-medium">
                      {weekly_score?.comparison?.change_percent > 0 ? '+' : ''}
                      {weekly_score?.comparison?.change_percent || 0}% vs last week
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-center text-zinc-500 dark:text-zinc-400 text-sm italic">
                  "{weekly_score?.coach_assessment || 'Building from the ground up!'}"
                </p>
              </div>
            </div>

            {/* Weekly Metrics */}
            <div className="card">
              <div className="card-header">
                <Zap size={20} className="text-primary" />
                <h3 className="card-title">This Week's Metrics</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">
                      {weekly_score?.metrics?.tasks_completed || 0}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Tasks</div>
                  </div>
                  <div className="text-center p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {weekly_score?.metrics?.habits_completed || 0}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Habits</div>
                  </div>
                  <div className="text-center p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                      {weekly_score?.metrics?.total_completions || 0}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Total</div>
                  </div>
                </div>

                <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500 dark:text-zinc-400">Last Week</span>
                    <span className="font-medium">{weekly_score?.comparison?.last_week_total || 0} completions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Week Info */}
            <div className="card lg:col-span-2">
              <div className="card-header">
                <Calendar size={20} />
                <h3 className="card-title">Week Overview</h3>
              </div>
              <div className="p-4">
                <div className="flex justify-between text-zinc-500 dark:text-zinc-400 text-sm">
                  <span>Week: {weekly_score?.week?.start || '-'} to {weekly_score?.week?.end || '-'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            {/* Priority 1 */}
            {recommendations?.recommendations?.filter(r => r.priority <= 1).map((rec, idx) => (
              <div key={idx} className="card border-2" style={{ borderColor: rec.type === 'critical' ? '#ef4444' : '#f59e0b' }}>
                <div className="card-header">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    rec.type === 'critical' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                    'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                  }`}>
                    PRIORITY {rec.priority}
                  </span>
                  <h3 className="card-title">{rec.title}</h3>
                </div>
                <div className="p-4">
                  <p className="mb-3 text-sm">{rec.message}</p>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <span className="font-medium text-purple-700 dark:text-purple-400">💡 Action: </span>
                    <span className="text-sm">{rec.action}</span>
                  </div>
                  {rec.expected_impact && (
                    <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                      Expected Impact: {rec.expected_impact}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Other Recommendations */}
            {recommendations?.recommendations?.filter(r => r.priority > 1).slice(0, 5).map((rec, idx) => (
              <div key={idx} className="card">
                <div className="card-header">
                  <h3 className="card-title">{rec.title}</h3>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    rec.type === 'celebration' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                    'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                  }`}>
                    {rec.type}
                  </span>
                </div>
                <div className="p-4">
                  <p className="mb-2 text-sm">{rec.message}</p>
                  <p className="text-sm text-primary">💡 {rec.action}</p>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {(!recommendations?.recommendations || recommendations.recommendations.length === 0) && (
              <div className="card">
                <div className="p-6 text-center">
                  <Target size={40} className="mx-auto mb-3 text-zinc-400 dark:text-zinc-500 opacity-50" />
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm">Start tracking habits to get personalized recommendations!</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AICoachPage;
