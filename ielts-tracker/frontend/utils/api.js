// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// API endpoints
export const ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',

  // Users
  GET_PROFILE: '/users/profile',
  UPDATE_PROFILE: '/users/profile',

  // Progress
  GET_PROGRESS: '/progress',
  UPDATE_PROGRESS: '/progress',
  GET_STATS: '/progress/stats',

  // Vocabulary
  GET_VOCABULARY: '/vocabulary',
  ADD_VOCABULARY: '/vocabulary',
  UPDATE_VOCABULARY: '/vocabulary/:id',
  DELETE_VOCABULARY: '/vocabulary/:id',

  // AI
  CHAT: '/ai/chat',
  GET_SUGGESTIONS: '/ai/suggestions',

  // Practice
  GET_QUESTIONS: '/practice/questions',
  SUBMIT_ANSWER: '/practice/submit',
};

export default API_BASE_URL;
