import { CareerScore } from '../types';
import { careerDataset } from '../data/career.data';

interface ScoreInput {
  interest: string;
  skills: string[];
  quizAnswers: { questionId: number; value: number }[];
}

export interface FullRecommendation extends CareerScore {
  salary: { min: number; max: number; currency: string };
  growthRate: string;
  marketDemand: string;
  strengths: string[];
  weaknesses: string[];
  careerGrowth: string[];
  geminiAnalysis: Record<string, unknown>;
}

/**
 * Calculate career scores for all careers and return sorted results.
 */
export function calculateCareerScores(input: ScoreInput): FullRecommendation[] {
  const scores: FullRecommendation[] = careerDataset.map((career) => {
    let score = 0;
    let maxScore = 0;

    // --- Interest scoring (weight: 30%) ---
    const interestLower = input.interest.toLowerCase().trim();
    const interestWords = interestLower.split(/\s+/);
    const interestRelevance = career.interestRelevance.map((i) => i.toLowerCase());
    const interestMatch = interestRelevance.some((rel) => {
      const relWords = rel.split(/\s+/);
      if (interestLower.includes(rel) || rel.includes(interestLower)) return true;
      const wordOverlap = interestWords.some((w) =>
        relWords.some((rw) => rw.includes(w) || w.includes(rw))
      );
      return wordOverlap;
    });
    if (interestMatch) {
      score += 30;
    }
    maxScore += 30;

    // --- Skills scoring (weight: 35%) ---
    const matchedSkills = input.skills.filter((s) =>
      career.requiredSkills.some(
        (rs) => rs.toLowerCase() === s.toLowerCase()
      )
    );
    const skillScore =
      career.requiredSkills.length > 0
        ? (matchedSkills.length / career.requiredSkills.length) * 35
        : 0;
    score += Math.min(skillScore, 35);
    maxScore += 35;

    // --- Quiz scoring (weight: 35%) ---
    const totalWeights = career.quizQuestionWeights.reduce((a, b) => a + b, 0);
    if (input.quizAnswers.length > 0 && totalWeights > 0) {
      let quizScore = 0;
      for (const answer of input.quizAnswers) {
        const idx = answer.questionId - 1;
        if (idx >= 0 && idx < career.quizQuestionWeights.length) {
          const weight = career.quizQuestionWeights[idx];
          const normalizedValue = (answer.value - 1) / 4;
          quizScore += normalizedValue * weight;
        }
      }
      const maxQuizScore = totalWeights;
      const quizPercentage = (quizScore / maxQuizScore) * 35;
      score += Math.min(quizPercentage, 35);
    }
    maxScore += 35;

    const matchPercentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

    return {
      careerName: career.name,
      score,
      matchPercentage: Math.min(matchPercentage, 100),
      description: career.description,
      requiredSkills: career.requiredSkills,
      learningPath: career.learningPath,
      suggestedProjects: career.suggestedProjects,
      salary: career.salary,
      growthRate: career.growthRate,
      marketDemand: career.marketDemand,
      strengths: career.strengths,
      weaknesses: career.weaknesses,
      careerGrowth: [],
      geminiAnalysis: {},
    };
  });

  // Sort by match percentage descending
  scores.sort((a, b) => b.matchPercentage - a.matchPercentage);

  return scores;
}

/**
 * Get the top N recommendations.
 */
export function getTopRecommendations(
  scores: FullRecommendation[],
  topN: number = 5
): FullRecommendation[] {
  return scores.slice(0, topN);
}

/**
 * Get the single best career recommendation.
 */
export function getBestCareer(scores: FullRecommendation[]): FullRecommendation {
  return scores[0];
}

/**
 * Build career growth items for a career (fallback when Gemini is not available).
 */
export function generateCareerGrowthItems(careerName: string): string[] {
  const growthMap: Record<string, string[]> = {
    'Frontend Developer': [
      'Junior Frontend Developer (0-2 tahun) – Rp 5-10 juta',
      'Frontend Developer (2-4 tahun) – Rp 10-18 juta',
      'Senior Frontend Developer (4-7 tahun) – Rp 18-28 juta',
      'Frontend Lead / Arsitek Frontend (7+ tahun) – Rp 25-40 juta',
      'Frontend Consultant / Freelance Specialist – Rp 30-50 juta+',
    ],
    'Backend Developer': [
      'Junior Backend Developer (0-2 tahun) – Rp 6-12 juta',
      'Backend Developer (2-5 tahun) – Rp 12-22 juta',
      'Senior Backend Developer (5-8 tahun) – Rp 22-35 juta',
      'Backend Arsitek / Tech Lead (8+ tahun) – Rp 30-50 juta',
      'Software Architect / CTO (10+ tahun) – Rp 50-100 juta+',
    ],
    'Full Stack Developer': [
      'Junior Full Stack Developer (0-2 tahun) – Rp 6-12 juta',
      'Full Stack Developer (2-4 tahun) – Rp 12-25 juta',
      'Senior Full Stack Developer (4-7 tahun) – Rp 20-35 juta',
      'Lead Full Stack / Tech Lead (7+ tahun) – Rp 30-50 juta',
      'Co-Founder Teknis / CTO Startup – Rp 50-100 juta+',
    ],
    'Mobile Developer': [
      'Junior Mobile Developer (0-2 tahun) – Rp 6-12 juta',
      'Mobile Developer (2-4 tahun) – Rp 12-22 juta',
      'Senior Mobile Developer (4-7 tahun) – Rp 20-30 juta',
      'Mobile Lead / Arsitek Mobile (7+ tahun) – Rp 28-45 juta',
      'Mobile App Consultant / Indie Developer – Rp 30-60 juta+',
    ],
    'AI Engineer': [
      'AI Engineer / ML Engineer (0-2 tahun) – Rp 10-18 juta',
      'AI Engineer (2-5 tahun) – Rp 18-35 juta',
      'Senior AI Engineer (5-8 tahun) – Rp 30-55 juta',
      'AI Research Scientist / Lead (8+ tahun) – Rp 50-80 juta',
      'Chief AI Officer / AI Director – Rp 80-150 juta+',
    ],
    'Data Scientist': [
      'Data Analyst / Junior Data Scientist (0-2 tahun) – Rp 7-15 juta',
      'Data Scientist (2-4 tahun) – Rp 15-30 juta',
      'Senior Data Scientist (4-7 tahun) – Rp 25-45 juta',
      'Data Science Lead / Head of Data (7+ tahun) – Rp 40-70 juta',
      'Chief Data Officer / CDO – Rp 70-150 juta+',
    ],
    'Cyber Security Analyst': [
      'Junior Security Analyst (0-2 tahun) – Rp 7-14 juta',
      'Security Analyst / Engineer (2-4 tahun) – Rp 14-28 juta',
      'Senior Security Engineer (4-7 tahun) – Rp 25-45 juta',
      'Security Lead / CISO (7+ tahun) – Rp 40-80 juta',
      'Chief Information Security Officer (10+ tahun) – Rp 80-200 juta+',
    ],
    'Cloud Engineer': [
      'Junior Cloud Engineer (0-2 tahun) – Rp 8-15 juta',
      'Cloud Engineer (2-4 tahun) – Rp 15-28 juta',
      'Senior Cloud Engineer (4-7 tahun) – Rp 25-45 juta',
      'Cloud Arsitek / Lead (7+ tahun) – Rp 40-70 juta',
      'Head of Cloud / Cloud Director – Rp 70-150 juta+',
    ],
    'DevOps Engineer': [
      'Junior DevOps Engineer (0-2 tahun) – Rp 8-15 juta',
      'DevOps Engineer (2-4 tahun) – Rp 15-28 juta',
      'Senior DevOps Engineer (4-7 tahun) – Rp 25-45 juta',
      'DevOps Lead / Platform Engineer (7+ tahun) – Rp 40-70 juta',
      'Head of Infrastructure / DevOps Director – Rp 70-150 juta+',
    ],
    'UI UX Designer': [
      'Junior UI UX Designer (0-2 tahun) – Rp 5-10 juta',
      'UI UX Designer (2-4 tahun) – Rp 10-18 juta',
      'Senior UI UX Designer (4-7 tahun) – Rp 18-28 juta',
      'UX Lead / Design Lead (7+ tahun) – Rp 25-40 juta',
      'Head of Design / Chief Design Officer – Rp 40-80 juta+',
    ],
  };

  return growthMap[careerName] || [
    `Junior ${careerName} – Entry level`,
    `${careerName} – Mid level`,
    `Senior ${careerName} – Senior level`,
    `Lead / Principal ${careerName}`,
    `Director / Head of ${careerName}`,
  ];
}
