import api from '../services/axios';
import type { Recommendation } from './quiz';

export interface RecommendationResponse {
  success: boolean;
  message: string;
  data: {
    recommendation: Recommendation;
    recommendations: Recommendation[];
  };
}

export async function getLatestRecommendation(): Promise<RecommendationResponse> {
  const res = await api.get<RecommendationResponse>('/api/recommendation/latest');
  return res.data;
}
