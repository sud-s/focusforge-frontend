import axiosClient from './axiosClient';

const settingsApi = {
  // Password
  changePassword: (data) => axiosClient.put('settings/password/', data),
  
  // Personalization
  getPersonalization: () => axiosClient.get('settings/personalization/'),
  updatePersonalization: (data) => axiosClient.put('settings/personalization/', data),
  
  // Profile
  getProfile: () => axiosClient.get('settings/profile/'),
  updateProfile: (data) => axiosClient.put('settings/profile/', data),
};

export default settingsApi;
