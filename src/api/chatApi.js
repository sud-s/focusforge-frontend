import axiosClient from './axiosClient';

const chatApi = {
  // This file is deprecated - use coachApi instead
  // Keeping for backward compatibility
  getWelcomeMessage: () => axiosClient.get('ai/welcome'),
};

export default chatApi;
