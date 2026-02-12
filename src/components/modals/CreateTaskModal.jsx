import React, { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { useTasks } from '../../store/taskStore';
import { useUI } from '../../store/uiStore';

const CreateTaskModal = () => {
  const { addTask } = useTasks();
  const { activeModal, closeModal } = useUI();
  const isOpen = activeModal === 'createTask';
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [loading, setLoading] = useState(false);

  // Set default date/time to today/current time when modal opens
  React.useEffect(() => {
    if (isOpen) {
      const now = new Date();
      setDueDate(now.toISOString().split('T')[0]);
      setDueTime(now.toTimeString().slice(0, 5));
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !dueDate) {
      alert('Please fill in title and due date');
      return;
    }
    
    setLoading(true);
    try {
      // Send date and time as ISO strings
      const dueDateTime = dueTime 
        ? `${dueDate}T${dueTime}:00` 
        : `${dueDate}T23:59:59`;
      
      const payload = {
        title,
        due_date: dueDate,  // "2026-02-08"
        due_time: dueTime || undefined,  // "14:30"
      };
      console.log('Creating task:', payload);
      await addTask(payload);
      closeModal();
      // Reset form
      setTitle('');
      setDueDate('');
      setDueTime('');
    } catch (err) {
      console.error('Failed to create task:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} title="Create New Task" onClose={closeModal}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input 
          label="Task Title" 
          placeholder="e.g. Submit Report" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        
        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Due Date" 
            type="date"
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)} 
          />
          <Input 
            label="Due Time (optional)" 
            type="time"
            value={dueTime} 
            onChange={(e) => setDueTime(e.target.value)} 
          />
        </div>
        
        {/* Preview */}
        {dueDate && (
          <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
            <strong>Due:</strong> {new Date(dueDate).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}{dueTime && ` at ${dueTime}`}
          </div>
        )}
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="secondary" onClick={closeModal} type="button">Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;
