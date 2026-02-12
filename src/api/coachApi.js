import axiosClient from './axiosClient';

const coachApi = {
  // Get coach status and user level
  getStatus: () => axiosClient.get('ai/coach/status'),
  
  // Get tomorrow's prediction
  getTomorrow: () => axiosClient.get('ai/coach/tomorrow'),
  
  // Get failure risk analysis
  getFailureRisk: () => axiosClient.get('ai/coach/failure-risk'),
  
  // Get weekly discipline score
  getWeeklyScore: () => axiosClient.get('ai/coach/weekly-score'),
  
  // Get personalized recommendations
  getRecommendations: () => axiosClient.get('ai/coach/recommendations'),
  
  // Get all coach insights (combines all endpoints)
  getAllInsights: () => axiosClient.get('ai/coach/insights'),
  
  // Legacy endpoints (still available)
  getBehavior: () => axiosClient.get('ai/behavior'),
  getProductivityScore: () => axiosClient.get('ai/productivity-score'),
  getInsights: () => axiosClient.get('ai/insights'),
};

export default coachApi;
