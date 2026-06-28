import api from '../services/axios';

export interface QuestionScale {
  value: number;
  label: string;
}

export interface Question {
  id: number;
  question: string;
  scale: QuestionScale[];
}

export interface QuestionsResponse {
  success: boolean;
  message: string;
  data: {
    questions: Question[];
  };
}

export interface QuizAnswer {
  questionId: number;
  value: number;
}

export interface SubmitQuizData {
  answers: QuizAnswer[];
}

export interface SalaryInfo {
  min: number;
  max: number;
  currency: string;
}

export interface Recommendation {
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
  geminiAnalysis: GeminiAnalysis | null;
  createdAt?: string;
}

export interface GeminiAnalysis {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  learningSuggestions: string[];
  careerGrowth: string[];
  requiredSkills?: string[];
  recommendedProjects?: string[];
}

export interface SubmitQuizResponse {
  success: boolean;
  message: string;
  data: {
    recommendation: Recommendation;
    recommendations: Recommendation[];
  };
}

export async function getQuestions(): Promise<QuestionsResponse> {
  const res = await api.get<QuestionsResponse>('/api/quiz/questions');
  return res.data;
}

export async function submitQuiz(data: SubmitQuizData): Promise<SubmitQuizResponse> {
  const res = await api.post<SubmitQuizResponse>('/api/quiz/submit', data);
  return res.data;
}
