import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import HabitList from './HabitList';
import Button from '../common/Button';
import { useHabits } from '../../store/habitStore';
import { useUI } from '../../store/uiStore';
import Loader from '../common/Loader';
import Modal from '../common/Modal';

const HabitsPage = () => {
  const { habits, loading, deleteHabit, missHabit, logHabit, logHabitForDate } = useHabits();
  const { openModal, closeModal, modalData, activeModal } = useUI();
  const [logDateModal, setLogDateModal] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleLogHabit = (habit) => {
    openModal('logHabit', habit);
  };

  const handleMissHabit = (habit) => {
    if (window.confirm(`Mark "${habit.name || habit.title}" as missed today? This will reset your streak.`)) {
      missHabit(habit.id);
    }
  };

  const handleLogDateClick = (habit) => {
    // Open date/time picker modal
    const now = new Date();
    setSelectedDate(now.toISOString().split('T')[0]);
    setSelectedTime(now.toTimeString().slice(0, 5));
    setLogDateModal(habit);
  };

  const handleLogForDate = () => {
    if (!logDateModal || !selectedDate) return;
    const habitName = logDateModal.name || logDateModal.title;
    
    if (window.confirm(`Log "${habitName}" for ${selectedDate}${selectedTime ? ' at ' + selectedTime : ''}?`)) {
      console.log('Log date:', logDateModal.id, selectedDate, selectedTime);
      logHabit(logDateModal.id, selectedDate, selectedTime || undefined)
        .then(() => {
          setLogDateModal(null);
        })
        .catch(err => {
          console.error('Failed to log habit for date:', err);
        });
    }
  };

  const handleAddHabit = () => {
    openModal('createHabit');
  };

  const handleDeleteHabit = (id) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      deleteHabit(id);
    }
  };

  const handleViewAnalytics = (habit) => {
    console.log('View analytics for', habit.name || habit.title);
  };

  // Get today's date formatted
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Habits</h1>
          <p className="text-gray">{todayFormatted}</p>
        </div>
        <Button onClick={handleAddHabit} icon={Plus}>Add Habit</Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <HabitList 
          habits={habits} 
          onLog={handleLogHabit} 
          onMiss={handleMissHabit}
          onLogDate={handleLogDateClick}
          onDelete={handleDeleteHabit} 
          onViewAnalytics={handleViewAnalytics}
        />
      )}

      {/* Date/Time Picker Modal */}
      <Modal 
        isOpen={!!logDateModal} 
        title="Log Habit for Date" 
        onClose={() => setLogDateModal(null)}
      >
        <div className="flex flex-col gap-4">
          <p className="text-gray-600">
            Logging: <strong>{logDateModal?.name || logDateModal?.title}</strong>
          </p>
          
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 border rounded-lg"
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Time (optional)</label>
            <input 
              type="time" 
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" onClick={() => setLogDateModal(null)}>Cancel</Button>
            <Button onClick={handleLogForDate}>Log</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HabitsPage;
