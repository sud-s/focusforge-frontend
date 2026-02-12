import axiosClient from './axiosClient';

const habitApi = {
  // No trailing slashes - FastAPI routes don't use them
  getAll: () => axiosClient.get('habits'),
  create: (data) => axiosClient.post('habits', data),
  update: (id, data) => axiosClient.put(`habits/${id}`, data),
  delete: (id) => axiosClient.delete(`habits/${id}`),
  log: (id, dateStr = null, timeStr = null) => {
    // Pass date and time as query parameters
    const params = {};
    if (dateStr) params.date_str = dateStr;
    if (timeStr) params.time_str = timeStr;
    return axiosClient.post(`habits/${id}/log`, {}, { params });
  },
  miss: (id) => axiosClient.post(`habits/${id}/missed`, {}),
  
  // AI/Prediction endpoints
  predict: (id) => axiosClient.get(`habits/${id}/ai/predict`),
  getAIStats: (id) => axiosClient.get(`habits/${id}/ai/stats`),
  
  // AI Coach endpoints
  getAIWelcome: () => axiosClient.get('habits/ai/welcome'),
  getAISuggestions: (habitId) => axiosClient.get(`habits/${habitId}/ai/suggestions`),
  getHabitPredictions: (habitId) => axiosClient.get(`habits/${habitId}/ai/predictions`),
  getAllPredictions: () => axiosClient.get('habits/ai/predictions'),
  
  // Task endpoints for date/time logging
  getTodayTasks: () => axiosClient.get('tasks/today'),
  getTaskSchedule: (startDate, endDate) => axiosClient.get('tasks/schedule', { params: { start_date: startDate, end_date: endDate } }),
  
  // Legacy endpoints (keep for backward compatibility)
  analysis: (id) => axiosClient.get(`habits/${id}/analysis`),
  prediction: (id) => axiosClient.get(`habits/${id}/prediction`),
};

export default habitApi;
