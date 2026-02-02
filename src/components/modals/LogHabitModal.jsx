import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { useHabits } from '../../store/habitStore';
import { useUI } from '../../store/uiStore';

const LogHabitModal = () => {
  const { modalData, activeModal, closeModal } = useUI(); // modalData should be the habit object
  const isOpen = activeModal === 'logHabit';
  const { logHabit } = useHabits();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!modalData) return;
    setLoading(true);
    await logHabit(modalData.id);
    setLoading(false);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} title="Log Habit" onClose={closeModal}>
      <div className="flex flex-col gap-4">
        <p>Are you sure you want to log <strong>{modalData?.title}</strong> for today?</p>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="secondary" onClick={closeModal}>Cancel</Button>
          <Button onClick={handleConfirm} disabled={loading}>Confirm Log</Button>
        </div>
      </div>
    </Modal>
  );
};

export default LogHabitModal;
