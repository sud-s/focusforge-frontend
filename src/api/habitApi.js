import axiosClient from './axiosClient';

const habitApi = {
  // Trailing slash on all endpoints to match FastAPI routing
  getAll: () => axiosClient.get('habits/'),
  create: (data) => axiosClient.post('habits/', data),
  update: (id, data) => axiosClient.put(`habits/${id}/`, data),
  delete: (id) => axiosClient.delete(`habits/${id}/`),
  log: (id) => axiosClient.post(`habits/${id}/log/`, {}),
  
  // AI/Prediction endpoints (new format)
  predict: (id) => axiosClient.get(`habits/${id}/ai/predict/`),
  getAIStats: (id) => axiosClient.get(`habits/${id}/ai/stats/`),
  
  // New AI Coach endpoints
  getAIWelcome: () => axiosClient.get('habits/ai/welcome/'),
  getAISuggestions: (habitId) => axiosClient.get(`habits/${habitId}/ai/suggestions/`),
  
  // Legacy endpoints (keep for backward compatibility)
  analysis: (id) => axiosClient.get(`habits/${id}/analysis/`),
  prediction: (id) => axiosClient.get(`habits/${id}/prediction/`),
};

export default habitApi;
