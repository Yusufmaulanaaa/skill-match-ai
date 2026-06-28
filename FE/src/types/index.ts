export type EducationLevel = 'High School' | 'Diploma' | 'Bachelor' | 'Master';

export type ITInterest =
  | 'Frontend Development'
  | 'Backend Development'
  | 'Fullstack Development'
  | 'Mobile Development'
  | 'Artificial Intelligence'
  | 'Data Science'
  | 'Cyber Security'
  | 'Cloud Computing'
  | 'UI UX Design';

export type Skill =
  | 'HTML'
  | 'CSS'
  | 'JavaScript'
  | 'TypeScript'
  | 'React'
  | 'Next.js'
  | 'Node.js'
  | 'Express'
  | 'PHP'
  | 'Laravel'
  | 'Python'
  | 'SQL'
  | 'MongoDB'
  | 'PostgreSQL'
  | 'Docker'
  | 'Git'
  | 'Linux';

export interface GeminiAnalysis {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  learningSuggestions: string[];
  careerGrowth: string[];
  requiredSkills?: string[];
  recommendedProjects?: string[];
}

export const EDUCATION_OPTIONS: EducationLevel[] = [
  'High School',
  'Diploma',
  'Bachelor',
  'Master',
];

export const IT_INTEREST_OPTIONS: ITInterest[] = [
  'Frontend Development',
  'Backend Development',
  'Fullstack Development',
  'Mobile Development',
  'Artificial Intelligence',
  'Data Science',
  'Cyber Security',
  'Cloud Computing',
  'UI UX Design',
];

export const SKILL_OPTIONS: Skill[] = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Express',
  'PHP',
  'Laravel',
  'Python',
  'SQL',
  'MongoDB',
  'PostgreSQL',
  'Docker',
  'Git',
  'Linux',
];
