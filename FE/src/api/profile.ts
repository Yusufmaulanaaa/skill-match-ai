import api from '../services/axios';

export interface ProfileData {
  fullName: string;
  education: string;
  interest: string;
  skills: string[];
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: string;
      fullName: string;
      email: string;
      education: string | null;
      interest: string | null;
      skills: string[];
    };
  };
}

export async function saveProfile(data: ProfileData): Promise<ProfileResponse> {
  const res = await api.post<ProfileResponse>('/api/profile', data);
  return res.data;
}
