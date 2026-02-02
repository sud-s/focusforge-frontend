import axiosClient from './axiosClient';

const taskApi = {
  getAll: () => axiosClient.get('tasks/'),
  create: (data) => axiosClient.post('tasks/', data),
  update: (id, data) => axiosClient.put(`tasks/${id}/`, data),
  delete: (id) => axiosClient.delete(`tasks/${id}/`),
  complete: (id) => axiosClient.patch(`tasks/${id}/complete/`),
};

export default taskApi;
