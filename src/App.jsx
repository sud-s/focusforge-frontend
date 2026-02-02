import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './store/authStore';
import { HabitProvider } from './store/habitStore';
import { TaskProvider } from './store/taskStore';
import { UIProvider } from './store/uiStore';
import CreateHabitModal from './components/modals/CreateHabitModal';
import CreateTaskModal from './components/modals/CreateTaskModal';
import LogHabitModal from './components/modals/LogHabitModal';
import ModalManager from './components/modals/ModalManager';
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UIProvider>
          <HabitProvider>
            <TaskProvider>
              <AppRoutes />
              
              {/* Global Modals */}
              <CreateHabitModal />
              <CreateTaskModal />
              <LogHabitModal />
              
            </TaskProvider>
          </HabitProvider>
        </UIProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
