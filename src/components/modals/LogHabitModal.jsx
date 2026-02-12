import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { useHabits } from '../../store/habitStore';
import { useUI } from '../../store/uiStore';

const LogHabitModal = () => {
  const { modalData, activeModal, closeModal } = useUI();
  const isOpen = activeModal === 'logHabit';
  const { logHabit } = useHabits();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Use name from backend, fallback to title for compatibility
  const habitName = modalData?.name || modalData?.title || 'this habit';
  const habitId = modalData?.id || modalData?._id;

  // Set default date/time to now
  React.useEffect(() => {
    if (isOpen) {
      const now = new Date();
      setSelectedDate(now.toISOString().split('T')[0]);
      setSelectedTime(now.toTimeString().slice(0, 5));
    }
  }, [isOpen]);

  const handleConfirm = async () => {
    if (!modalData || !habitId) return;
    setLoading(true);
    try {
      await logHabit(habitId, selectedDate || null, selectedTime || null);
      closeModal();
    } catch (err) {
      console.error('Failed to log habit:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} title="Log Habit" onClose={closeModal}>
      <div className="flex flex-col gap-4">
        <p>Are you sure you want to log <strong>{habitName}</strong>?</p>
        
        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">Date (leave empty for today)</label>
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 border rounded-lg"
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        {/* Time Selection */}
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
          <Button variant="secondary" onClick={closeModal}>Cancel</Button>
          <Button onClick={handleConfirm} disabled={loading}>
            {loading ? 'Logging...' : 'Confirm Log'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LogHabitModal;
