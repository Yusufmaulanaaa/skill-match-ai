import api from '../services/axios';

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserData {
  id: string;
  fullName: string;
  email: string;
  education: string | null;
  interest: string | null;
  skills: string[];
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: UserData;
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>('/api/auth/register', data);
  return res.data;
}

export async function login(data: LoginData): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>('/api/auth/login', data);
  return res.data;
}

export async function getMe(): Promise<AuthResponse> {
  const res = await api.get<AuthResponse>('/api/auth/me');
  return res.data;
}
