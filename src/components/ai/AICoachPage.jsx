import React, { useState, useEffect } from 'react';
import { Sparkles, Send, Bot, User, BarChart2, RefreshCw, Brain, Lightbulb, AlertTriangle, Clock, Calendar, Trophy } from 'lucide-react';
import Button from '../common/Button';
import '../../styles/cards.css';
import { useHabits } from '../../store/habitStore';
import habitApi from '../../api/habitApi';

const AICoachPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [welcomeData, setWelcomeData] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const { habits } = useHabits();

  // Fetch welcome message on initial load
  useEffect(() => {
    fetchWelcomeMessage();
  }, []);

  const fetchWelcomeMessage = async () => {
    try {
      const data = await habitApi.getAIWelcome();
      setWelcomeData(data);
      
      // Set initial message
      setMessages([{
        id: 1,
        sender: 'ai',
        text: data.message,
        title: data.title,
        features: data.features,
        tip: data.tip
      }]);
    } catch (e) {
      console.error('Failed to fetch welcome message:', e);
      // Fallback message
      setMessages([{
        id: 1,
        sender: 'ai',
        text: "Hi! I'm your AI coach. I'll share insights from your habits and help you stay on track."
      }]);
    }
  };

  // Fetch AI suggestions for selected habit
  const fetchAISuggestions = async (habitId) => {
    if (!habitId) return;
    
    setLoadingAI(true);
    try {
      const data = await habitApi.getAISuggestions(habitId);
      setSuggestions(data);
      
      const habit = habits.find(h => h.id === habitId);
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'ai',
        text: data.summary || `I've analyzed "${habit?.name}" for you!`
      }]);
    } catch (e) {
      console.error('Failed to fetch AI suggestions:', e);
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'ai',
        text: "I couldn't fetch AI suggestions. Make sure the backend is running with ML models installed."
      }]);
    } finally {
      setLoadingAI(false);
    }
  };

  // Initial fetch when habits load
  useEffect(() => {
    if (habits.length > 0 && !selectedHabit) {
      setSelectedHabit(habits[0].id);
      fetchAISuggestions(habits[0].id);
    }
  }, [habits]);

  const handleSelectHabit = (habitId) => {
    setSelectedHabit(habitId);
    const habit = habits.find(h => h.id === habitId);
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'ai',
      text: `Let me analyze "${habit?.name}" for you...`
    }]);
    fetchAISuggestions(habitId);
  };

  const handleRefresh = () => {
    if (selectedHabit) {
      fetchAISuggestions(selectedHabit);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = { id: Date.now(), sender: 'user', text: inputText };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 800));
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: "Thanks for sharing! Keep logging your habits to get better AI predictions over time."
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: "Sorry, I'm having trouble connecting to the server right now."
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Render suggestion card based on type
  const renderSuggestion = (suggestion) => {
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

    return (
      <div key={suggestion.title} className={`p-3 rounded-lg border ${bgColors[suggestion.type] || bgColors.tip} mb-2`}>
        <div className="flex items-start gap-2">
          <span className="flex-shrink-0 mt-0.5">{icons[suggestion.type] || icons.tip}</span>
          <div className="flex-1">
            <h4 className="font-medium text-sm">{suggestion.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{suggestion.message}</p>
            {suggestion.action && (
              <p className="text-sm text-primary font-medium mt-2">💡 {suggestion.action}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const selectedHabitData = habits.find(h => h.id === selectedHabit);

  return (
    <div className="h-full flex flex-col max-h-[calc(100vh-120px)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="text-purple-500" />
          AI Coach
        </h1>
        <p className="text-gray">Your personal productivity assistant with ML-powered predictions.</p>
      </div>

      {/* Welcome Message Display */}
      {welcomeData && messages.length === 1 && (
        <div className="card mb-4 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <div className="p-4">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-2">
              <Sparkles className="text-purple-500" size={20} />
              {welcomeData.title}
            </h2>
            <p className="text-gray-700 mb-3">{welcomeData.message}</p>
            {welcomeData.features && (
              <div className="flex flex-wrap gap-2 mb-3">
                {welcomeData.features.map((feature, idx) => (
                  <span key={idx} className="px-2 py-1 bg-white rounded-full text-xs font-medium text-gray-600">
                    {feature}
                  </span>
                ))}
              </div>
            )}
            {welcomeData.tip && (
              <p className="text-sm text-purple-600 font-medium">💡 {welcomeData.tip}</p>
            )}
          </div>
        </div>
      )}

      {/* AI Suggestions Panel */}
      {suggestions && suggestions.suggestions && suggestions.suggestions.length > 0 && (
        <div className="card mb-4">
          <div className="card-header">
            <div className="flex items-center gap-2">
              <Brain className="text-purple-500" size={20} />
              <h3 className="card-title">Smart Insights: {selectedHabitData?.name}</h3>
            </div>
          </div>
          <div className="p-4">
            {suggestions.suggestions.map(renderSuggestion)}
            {suggestions.summary && (
              <p className="text-sm text-gray-500 mt-3 text-center">{suggestions.summary}</p>
            )}
          </div>
        </div>
      )}

      {/* Habit Selector */}
      {habits.length > 0 && (
        <div className="mt-4 p-4 card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-2">
              <BarChart2 size={18} />
              Select Habit to Analyze
            </h3>
            <button 
              onClick={handleRefresh}
              className="text-purple-500 hover:text-purple-700 flex items-center gap-1"
              disabled={loadingAI}
            >
              <RefreshCw size={16} className={loadingAI ? 'animate-spin' : ''} />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {habits.map(habit => (
              <button
                key={habit.id}
                onClick={() => handleSelectHabit(habit.id)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedHabit === habit.id 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {habit.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Interface */}
      <div className="flex-1 card flex flex-col overflow-hidden mt-4">
        <div className="flex items-center justify-between px-4 py-2 bg-purple-50 border-b border-purple-100">
          <div className="flex items-center gap-2">
            <Brain size={16} className="text-purple-500" />
            <span className="text-sm font-medium text-purple-700">AI Chat</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 
                ${msg.sender === 'ai' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                {msg.sender === 'ai' ? <Bot size={18} /> : <User size={18} />}
              </div>
              <div className={`p-3 rounded-2xl ${
                msg.sender === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
              }`}>
                {msg.title && <p className="font-bold mb-1">{msg.title}</p>}
                <p className="text-sm">{msg.text}</p>
                {msg.features && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {msg.features.map((f, i) => (
                      <span key={i} className="text-xs">{f}</span>
                    ))}
                  </div>
                )}
                {msg.tip && <p className="text-sm mt-2 text-purple-600 font-medium">💡 {msg.tip}</p>}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
               <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                <Bot size={18} />
              </div>
              <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 bg-white">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              placeholder="Ask for advice..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <Button type="submit" disabled={!inputText.trim() || loading} icon={Send}>
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AICoachPage;
