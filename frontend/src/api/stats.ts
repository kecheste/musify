import type { Stats } from '../store/statsSlice';

const API_BASE_URL = 'http://localhost:3000/api';

export const getStats = async (): Promise<Stats> => {
  const response = await fetch(`${API_BASE_URL}/stats`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch stats: ${response.statusText}`);
  }
  
  return response.json();
};
