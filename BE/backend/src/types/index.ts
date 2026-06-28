import { Request } from 'express';

export interface JwtPayload {
  userId: string;
  email: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export interface QuizAnswer {
  questionId: number;
  value: number;
}

export interface CareerScore {
  careerName: string;
  score: number;
  matchPercentage: number;
  description: string;
  requiredSkills: string[];
  learningPath: string[];
  suggestedProjects: string[];
}

export interface SalaryInfo {
  min: number;
  max: number;
  currency: string;
}

export interface RecommendationResponse {
  careerName: string;
  matchPercentage: number;
  description: string;
  salary: SalaryInfo;
  growthRate: string;
  marketDemand: string;
  requiredSkills: string[];
  learningPath: string[];
  suggestedProjects: string[];
  strengths: string[];
  weaknesses: string[];
  careerGrowth: string[];
  geminiAnalysis: Record<string, unknown>;
}

export interface GeminiAnalysis {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  learningSuggestions: string[];
  careerGrowth: string[];
  requiredSkills: string[];
  recommendedProjects: string[];
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  token?: string;
  user?: T;
}
