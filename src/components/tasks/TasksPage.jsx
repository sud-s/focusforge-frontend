import React from 'react';
import { Plus } from 'lucide-react';
import TaskList from './TaskList';
import Button from '../common/Button';
import { useTasks } from '../../store/taskStore';
import { useUI } from '../../store/uiStore';
import Loader from '../common/Loader';

const TasksPage = () => {
  const { tasks, loading, toggleTask, deleteTask } = useTasks();
  const { openModal } = useUI();

  const handleAddTask = () => {
    openModal('createTask');
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Tasks</h1>
          <p className="text-gray">Manage your to-dos and stay organized.</p>
        </div>
        <Button onClick={handleAddTask} icon={Plus}>Add Task</Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <TaskList 
          tasks={tasks} 
          onToggle={toggleTask} 
          onDelete={handleDeleteTask} 
        />
      )}
    </div>
  );
};

export default TasksPage;
