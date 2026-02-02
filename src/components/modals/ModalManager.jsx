import React from 'react';
import { useUI } from '../../store/uiStore';
import CreateHabitModal from './CreateHabitModal';
import CreateTaskModal from './CreateTaskModal';
import LogHabitModal from './LogHabitModal';

const ModalManager = () => {
  const { activeModal } = useUI();

  if (!activeModal) return null;

  return (
    <>
      {activeModal === 'createHabit' && <CreateHabitModal />}
      {activeModal === 'createTask' && <CreateTaskModal />}
      {activeModal === 'logHabit' && <LogHabitModal />}
    </>
  );
};

export default ModalManager;
