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
      setError('Failed to load AI Coach data. Please try again.');
      // Set fallback data
      setCoachData({
        status: {
          status: 'active',
          coach_type: 'Discipline Coach',
          user_level: '🌱 Starter',
          summary: {
            productivity_score: 0,
            trend: 'stable',
            total_habits: 0,
            average_streak: 0
          }
        },
        tomorrow: {
          date: new Date().toISOString().split('T')[0],
          overall_prediction: {
            success_probability: 0,
            level: 'uncertain',
            confidence: 'low'
          },
          habits_prediction: [],
          alerts: [],
          coach_message: 'Start tracking habits to get predictions!'
        },
        failure_risk: {
          risk_score: 0,
          risk_level: 'low',
          identified_risks: [],
          protective_factors: [],
          coach_intervention: 'Start building your discipline foundation!'
        },
        weekly_score: {
          score: 0,
          level: '🌱 Starter',
          metrics: { tasks_completed: 0, habits_completed: 0, total_completions: 0 },
          comparison: { last_week_total: 0, change_percent: 0, trend: 'stable' },
          coach_assessment: 'Building from the ground up!'
        },
        recommendations: {
          recommendations: [],
          coach_tip: 'Start with one habit and be consistent!',
          focus_area: 'Create your first habit'
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="text-primary" />
            AI Discipline Coach
          </h2>
          <p className="text-secondary">Your personal accountability system</p>
        </div>
        <button onClick={loadCoachData} className="btn btn-outline">
          <RefreshCw size={16} className="mr-2" />
          Refresh
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b border-color pb-2">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: Target },
          { id: 'tomorrow', label: 'Tomorrow', icon: Calendar },
          { id: 'risks', label: 'Risk Analysis', icon: AlertTriangle },
          { id: 'weekly', label: 'Weekly Score', icon: Trophy },
          { id: 'recommendations', label: 'Actions', icon: ArrowRight },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Status Card */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Your Discipline Status</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl">{getLevelEmoji(status?.user_level || '🌱 Starter')}</div>
                  <div>
                    <div className="text-2xl font-bold">{status?.user_level || '🌱 Starter'}</div>
                    <div className="flex items-center gap-2 text-secondary">
                      {getTrendIcon(status?.summary?.trend)}
                      <span>{status?.summary?.trend || 'stable'}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-3xl font-bold text-primary">
                      {status?.summary?.productivity_score || 0}%
                    </div>
                    <div className="text-sm text-secondary">Productivity Score</div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-3xl font-bold text-primary">
                      {status?.summary?.average_streak || 0}
                    </div>
                    <div className="text-sm text-secondary">Avg. Streak</div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-3xl font-bold text-primary">
                      {status?.summary?.total_habits || 0}
                    </div>
                    <div className="text-sm text-secondary">Active Habits</div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-3xl font-bold text-warning">
                      {failure_risk?.risk_level?.toUpperCase() || 'LOW'}
                    </div>
                    <div className="text-sm text-secondary">Risk Level</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tomorrow Preview Card */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Tomorrow's Preview</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-secondary">Success Probability</span>
                  <span className={`text-4xl font-bold text-${getPredictionColor(tomorrow?.overall_prediction?.success_probability)}`}>
                    {tomorrow?.overall_prediction?.success_probability || 0}%
                  </span>
                </div>
                
                <div className="progress-bar h-4 mb-4">
                  <div 
                    className={`progress-bar-fill bg-${getPredictionColor(tomorrow?.overall_prediction?.success_probability)}`} 
                    style={{ width: `${tomorrow?.overall_prediction?.success_probability || 0}%` }}
                  ></div>
                </div>

                <div className={`p-3 rounded-lg ${
                  tomorrow?.overall_prediction?.success_probability >= 70 ? 'bg-success/10 text-success' :
                  tomorrow?.overall_prediction?.success_probability >= 40 ? 'bg-warning/10 text-warning' :
                  'bg-danger/10 text-danger'
                }`}>
                  <div className="flex items-center gap-2">
                    {tomorrow?.overall_prediction?.success_probability >= 70 ? <CheckCircle size={18} /> :
                     tomorrow?.overall_prediction?.success_probability >= 40 ? <Clock size={18} /> :
                     <XCircle size={18} />}
                    <span className="font-medium">
                      {tomorrow?.overall_prediction?.level || 'uncertain'} to succeed
                    </span>
                  </div>
                </div>

                {tomorrow?.alerts?.length > 0 && (
                  <div className="mt-4 p-3 bg-danger/10 rounded-lg">
                    <div className="flex items-center gap-2 text-danger">
                      <AlertTriangle size={16} />
                      <span className="font-medium">{tomorrow.alerts[0].message}</span>
                    </div>
                  </div>
                )}

                <p className="mt-4 text-sm text-secondary italic">
                  "{tomorrow?.coach_message || 'Keep building your discipline!'}"
                </p>
              </div>
            </div>

            {/* Coach Tip */}
            <div className="card lg:col-span-2">
              <div className="card-header">
                <h3 className="card-title">💡 Your Coach's Tip</h3>
              </div>
              <div className="p-6">
                <p className="text-lg">{recommendations?.coach_tip || 'Start with one habit and be consistent!'}</p>
                <p className="text-secondary mt-2">
                  Focus Area: <strong>{recommendations?.focus_area || 'Building foundation'}</strong>
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tomorrow' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Overall Prediction */}
            <div className="card">
              <div className="card-header">
                <Calendar size={20} />
                <h3 className="card-title">{tomorrow?.date || 'Tomorrow'}</h3>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className={`text-6xl font-bold text-${getPredictionColor(tomorrow?.overall_prediction?.success_probability)}`}>
                    {tomorrow?.overall_prediction?.success_probability || 0}%
                  </div>
                  <div className="text-secondary mt-2">
                    {tomorrow?.overall_prediction?.level || 'uncertain'} to succeed
                  </div>
                  <div className="text-xs text-secondary mt-1">
                    Confidence: {tomorrow?.overall_prediction?.confidence || 'low'}
                  </div>
                </div>

                <div className="progress-bar h-6 mb-4">
                  <div 
                    className={`progress-bar-fill bg-${getPredictionColor(tomorrow?.overall_prediction?.success_probability)}`}
                    style={{ width: `${tomorrow?.overall_prediction?.success_probability || 0}%` }}
                  ></div>
                </div>

                <div className={`p-4 rounded-lg ${
                  tomorrow?.overall_prediction?.success_probability >= 70 ? 'bg-success/10' :
                  tomorrow?.overall_prediction?.success_probability >= 40 ? 'bg-warning/10' :
                  'bg-danger/10'
                }`}>
                  <p className="font-medium">"{tomorrow?.coach_message || 'Keep building your discipline!'}"</p>
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
                    <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{habit.habit_name}</span>
                        <span className={`text-xl font-bold text-${getPredictionColor(habit.success_probability)}`}>
                          {habit.success_probability}%
                        </span>
                      </div>
                      <div className="progress-bar h-2 mb-2">
                        <div 
                          className={`progress-bar-fill bg-${getPredictionColor(habit.success_probability)}`}
                          style={{ width: `${habit.success_probability}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-secondary">
                        <span className={`badge badge-${getRiskColor(habit.risk_level)}`}>
                          {habit.risk_level} risk
                        </span>
                        <span>{habit.prediction}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-secondary">
                    <Target size={40} className="mx-auto mb-2 opacity-50" />
                    <p>No habits to predict yet. Create a habit to get predictions!</p>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Score */}
            <div className="card">
              <div className="card-header">
                <AlertTriangle size={20} className="text-danger" />
                <h3 className="card-title">Failure Risk Analysis</h3>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className={`text-6xl font-bold text-${getRiskColor(failure_risk?.risk_level)}`}>
                    {failure_risk?.risk_score || 0}/100
                  </div>
                  <div className="text-secondary mt-2">
                    Risk Level: <span className={`font-bold text-${getRiskColor(failure_risk?.risk_level)}`}>
                      {failure_risk?.risk_level?.toUpperCase() || 'LOW'}
                    </span>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${
                  failure_risk?.risk_level === 'critical' ? 'bg-danger/10' :
                  failure_risk?.risk_level === 'high' ? 'bg-warning/10' :
                  'bg-success/10'
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
                    <div key={idx} className={`p-4 rounded-lg border-l-4 border-${getRiskColor(risk.severity)} bg-gray-50 dark:bg-gray-800`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`badge badge-${getRiskColor(risk.severity)}`}>
                              {risk.severity}
                            </span>
                            <span className="font-medium">{risk.type}</span>
                          </div>
                          <p className="text-sm mt-1">{risk.indicator}</p>
                          <p className="text-xs text-secondary mt-1">{risk.impact}</p>
                        </div>
                      </div>
                      <div className="mt-3 p-2 bg-primary/10 rounded text-sm text-primary">
                        💡 {risk.action}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-success">
                    <CheckCircle size={40} className="mx-auto mb-2" />
                    <p>No major risks identified! You're doing great!</p>
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
                      <div key={idx} className="p-3 bg-success/10 rounded-lg flex items-center gap-2">
                        <CheckCircle size={16} className="text-success" />
                        <span>{factor}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-secondary">Start building positive habits to create protective factors!</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'weekly' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Score */}
            <div className="card">
              <div className="card-header">
                <Trophy size={20} className="text-warning" />
                <h3 className="card-title">Weekly Discipline Score</h3>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-2">{weekly_score?.level?.split(' ')[0] || '🌱'}</div>
                  <div className="text-4xl font-bold text-primary">
                    {weekly_score?.score || 0}
                  </div>
                  <div className="text-secondary">out of 100</div>
                </div>

                <div className="progress-bar h-4 mb-4">
                  <div 
                    className="progress-bar-fill bg-primary" 
                    style={{ width: `${weekly_score?.score || 0}%` }}
                  ></div>
                </div>

                <div className={`p-3 rounded-lg text-center ${
                  weekly_score?.comparison?.trend === 'up' ? 'bg-success/10 text-success' :
                  weekly_score?.comparison?.trend === 'down' ? 'bg-danger/10 text-danger' :
                  'bg-gray-100 dark:bg-gray-800 text-secondary'
                }`}>
                  <div className="flex items-center justify-center gap-2">
                    {weekly_score?.comparison?.trend === 'up' ? <TrendingUp size={18} /> :
                     weekly_score?.comparison?.trend === 'down' ? <TrendingDown size={18} /> :
                     <span>➡️</span>}
                    <span className="font-medium">
                      {weekly_score?.comparison?.change_percent > 0 ? '+' : ''}
                      {weekly_score?.comparison?.change_percent || 0}% vs last week
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-center text-secondary italic">
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
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-success/10 rounded-lg">
                    <div className="text-3xl font-bold text-success">
                      {weekly_score?.metrics?.tasks_completed || 0}
                    </div>
                    <div className="text-xs text-secondary">Tasks Done</div>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-3xl font-bold text-primary">
                      {weekly_score?.metrics?.habits_completed || 0}
                    </div>
                    <div className="text-xs text-secondary">Habits Done</div>
                  </div>
                  <div className="text-center p-4 bg-warning/10 rounded-lg">
                    <div className="text-3xl font-bold text-warning">
                      {weekly_score?.metrics?.total_completions || 0}
                    </div>
                    <div className="text-xs text-secondary">Total</div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary">Last Week</span>
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
                <div className="flex justify-between text-secondary">
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
              <div key={idx} className={`card border-2 border-${getRiskColor(rec.type === 'critical' ? 'danger' : 'warning')}`}>
                <div className="card-header">
                  <span className={`badge badge-${getRiskColor(rec.type === 'critical' ? 'danger' : 'warning')}`}>
                    PRIORITY {rec.priority}
                  </span>
                  <h3 className="card-title">{rec.title}</h3>
                </div>
                <div className="p-4">
                  <p className="mb-4">{rec.message}</p>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <span className="font-medium text-primary">💡 Action: </span>
                    <span>{rec.action}</span>
                  </div>
                  {rec.expected_impact && (
                    <p className="mt-3 text-sm text-secondary">
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
                  <span className={`badge badge-${getRiskColor(rec.type === 'celebration' ? 'success' : 'secondary')}`}>
                    {rec.type}
                  </span>
                </div>
                <div className="p-4">
                  <p className="mb-2">{rec.message}</p>
                  <p className="text-sm text-primary">💡 {rec.action}</p>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {(!recommendations?.recommendations || recommendations.recommendations.length === 0) && (
              <div className="card">
                <div className="p-8 text-center">
                  <Target size={48} className="mx-auto mb-4 text-secondary opacity-50" />
                  <p className="text-secondary">Start tracking habits to get personalized recommendations!</p>
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
