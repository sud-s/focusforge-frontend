import React, { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { useHabits } from '../../store/habitStore';
import { useUI } from '../../store/uiStore';

const CreateHabitModal = () => {
  const { addHabit } = useHabits();
  const { activeModal, closeModal } = useUI();
  const isOpen = activeModal === 'createHabit';
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !frequency) return;

    setLoading(true);

    await addHabit({
      name,
      frequency,
    });

    setLoading(false);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} title="Create New Habit" onClose={closeModal}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input 
          label="Habit Name" 
          placeholder="e.g. Exercise" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Frequency</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="secondary" onClick={closeModal} type="button">Cancel</Button>
          <Button type="submit" disabled={loading}>Create Habit</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateHabitModal;
