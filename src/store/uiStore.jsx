import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null); // 'createHabit', 'createTask', etc.
  const [modalData, setModalData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('light');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const openModal = (modalName, data = null) => {
    setActiveModal(modalName);
    setModalData(data);
  };
  
  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      // Apply to both html and body to be safe
      document.documentElement.setAttribute('data-theme', newTheme);
      document.body.setAttribute('data-theme', newTheme);
      return newTheme;
    });
  };

  const toggleNotifications = () => setNotificationsEnabled(prev => !prev);
  const toggleSound = () => setSoundEnabled(prev => !prev);

  return (
    <UIContext.Provider value={{ 
      activeModal, 
      modalData,
      openModal, 
      closeModal, 
      sidebarOpen, 
      toggleSidebar,
      theme,
      setTheme,
      toggleTheme,
      notificationsEnabled,
      toggleNotifications,
      soundEnabled,
      toggleSound
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
