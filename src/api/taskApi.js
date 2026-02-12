import axiosClient from './axiosClient';

const taskApi = {
  getAll: (params) => axiosClient.get('tasks', { params }),
  getToday: () => axiosClient.get('tasks/today'),
  getSchedule: (startDate, endDate) => axiosClient.get('tasks/schedule', { params: { start_date: startDate, end_date: endDate } }),
  create: (data) => axiosClient.post('tasks', data),
  update: (id, data) => axiosClient.put(`tasks/${id}`, data),
  delete: (id) => axiosClient.delete(`tasks/${id}`),
  complete: (id) => axiosClient.patch(`tasks/${id}/complete`),
  uncomplete: (id) => axiosClient.patch(`tasks/${id}/uncomplete`),
  markMissed: (id) => axiosClient.patch(`tasks/${id}/missed`),
  getStats: (startDate, endDate) => axiosClient.get('tasks/stats', { params: { start_date: startDate, end_date: endDate } }),
};

export default taskApi;
