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
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    
    setLoading(true);
    const payload = {
      title,
      priority,
      ...(dueDate ? { due_date: new Date(dueDate).toISOString() } : {}),
    };
    await addTask(payload);
    setLoading(false);
    closeModal();
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
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Priority</label>
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <Input 
          label="Due Date" 
          type="date"
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
        />
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="secondary" onClick={closeModal} type="button">Cancel</Button>
          <Button type="submit" disabled={loading}>Create Task</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;
