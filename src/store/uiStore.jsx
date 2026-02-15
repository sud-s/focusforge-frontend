import React, { createContext, useContext, useState, useEffect } from 'react';

const UIContext = createContext();

// Get saved theme from localStorage or default to dark
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('focusforge_theme');
    if (saved) return saved;
  }
  return 'dark'; // Default to dark mode for modern SaaS look
};

// Apply theme to document
const applyTheme = (theme) => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    // Also toggle the 'dark' class for Tailwind's dark: prefix to work
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
};

export const UIProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState(getInitialTheme);
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('focusforge_notifications') === 'true';
    }
    return false;
  });
  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('focusforge_sound') === 'true';
    }
    return false;
  });

  // Apply theme on initial load
  useEffect(() => {
    applyTheme(theme);
  }, []);

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
      localStorage.setItem('focusforge_theme', newTheme);
      applyTheme(newTheme);
      return newTheme;
    });
  };

  const setThemeDirect = (newTheme) => {
    localStorage.setItem('focusforge_theme', newTheme);
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(prev => {
      const newVal = !prev;
      localStorage.setItem('focusforge_notifications', newVal);
      return newVal;
    });
  };
  
  const toggleSound = () => {
    setSoundEnabled(prev => {
      const newVal = !prev;
      localStorage.setItem('focusforge_sound', newVal);
      return newVal;
    });
  };

  return (
    <UIContext.Provider value={{ 
      activeModal, 
      modalData,
      openModal, 
      closeModal, 
      sidebarOpen, 
      toggleSidebar,
      theme,
      setTheme: setThemeDirect,
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
