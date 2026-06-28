import { Response } from 'express';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import prisma from '../services/prisma.service';
import {
  calculateCareerScores,
  getTopRecommendations,
  getBestCareer,
  generateCareerGrowthItems,
  FullRecommendation,
} from '../services/scoring.service';
import { analyzeWithGemini } from '../modules/gemini/gemini.service';
import { AuthRequest, RecommendationResponse } from '../types';

const questions = [
  { id: 1, question: 'Saya senang membangun antarmuka website yang menarik dan responsif.' },
  { id: 2, question: 'Saya tertarik mempelajari Machine Learning dan Artificial Intelligence.' },
  { id: 3, question: 'Saya menikmati analisis data dan menemukan pola dari data besar.' },
  { id: 4, question: 'Saya tertarik dengan keamanan sistem dan perlindungan data.' },
  { id: 5, question: 'Saya suka mengelola server, cloud, dan infrastruktur IT.' },
  { id: 6, question: 'Saya menikmati membangun API dan logika backend.' },
  { id: 7, question: 'Saya tertarik mengembangkan aplikasi mobile.' },
  { id: 8, question: 'Saya suka merancang pengalaman pengguna (user experience).' },
  { id: 9, question: 'Saya menikmati mendesain tampilan visual website atau aplikasi.' },
  { id: 10, question: 'Saya tertarik bekerja dengan database dan optimasi query.' },
  { id: 11, question: 'Saya suka menulis kode yang bersih, terstruktur, dan teruji.' },
  { id: 12, question: 'Saya menikmati memecahkan masalah logika dan algoritma kompleks.' },
  { id: 13, question: 'Saya tertarik dengan teknologi Cloud Computing (AWS, GCP, Azure).' },
  { id: 14, question: 'Saya suka mengotomatisasi proses dan membangun CI/CD pipeline.' },
  { id: 15, question: 'Saya tertarik menjadi fullstack yang menguasai frontend dan backend.' },
];

export const submitQuizSchema = z.object({
  answers: z
    .array(
      z.object({
        questionId: z.number().int().min(1).max(15),
        value: z.number().int().min(1).max(5),
      })
    )
    .length(15, 'Jawab semua 15 pertanyaan'),
});

export function getQuestions(_req: AuthRequest, res: Response): void {
  res.json({
    success: true,
    message: 'Berhasil mengambil data pertanyaan',
    data: {
      questions: questions.map((q) => ({
        id: q.id,
        question: q.question,
        scale: [
          { value: 1, label: 'Sangat Tidak Setuju' },
          { value: 2, label: 'Tidak Setuju' },
          { value: 3, label: 'Netral' },
          { value: 4, label: 'Setuju' },
          { value: 5, label: 'Sangat Setuju' },
        ],
      })),
    },
  });
}

function toRecommendationResponse(
  rec: FullRecommendation,
  geminiAnalysis: Record<string, unknown>
): RecommendationResponse {
  return {
    careerName: rec.careerName,
    matchPercentage: rec.matchPercentage,
    description: rec.description,
    salary: rec.salary,
    growthRate: rec.growthRate,
    marketDemand: rec.marketDemand,
    requiredSkills: rec.requiredSkills,
    learningPath: rec.learningPath,
    suggestedProjects: rec.suggestedProjects,
    strengths: rec.strengths,
    weaknesses: rec.weaknesses,
    careerGrowth: rec.careerGrowth,
    geminiAnalysis,
  };
}

export async function submitQuiz(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const { answers } = req.body;
    const sessionId = randomUUID();

    // Save quiz result
    await prisma.quizResult.create({
      data: {
        userId,
        answers: answers as any,
      },
    });

    // Get user data for scoring
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { skills: true },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User tidak ditemukan',
      });
      return;
    }

    // Calculate career scores
    const allScores = calculateCareerScores({
      interest: user.interest || '',
      skills: user.skills.map((s) => s.skill),
      quizAnswers: answers,
    });

    const top5 = getTopRecommendations(allScores, 5);
    const bestCareer = getBestCareer(allScores);

    // Get Gemini analysis for top career
    console.log('[Quiz] Best career detected:', bestCareer.careerName, 'with', bestCareer.matchPercentage + '%');

    const geminiAnalysis = await analyzeWithGemini(
      user.interest || '',
      user.skills.map((s) => s.skill),
      answers,
      bestCareer.careerName,
      {
        description: bestCareer.description,
        requiredSkills: bestCareer.requiredSkills,
        learningPath: bestCareer.learningPath,
        suggestedProjects: bestCareer.suggestedProjects,
        salary: bestCareer.salary,
        growthRate: bestCareer.growthRate,
        marketDemand: bestCareer.marketDemand,
        strengths: bestCareer.strengths,
        weaknesses: bestCareer.weaknesses,
      }
    );

    // Build career growth for all top 5
    const top5WithGrowth = top5.map((rec) => ({
      ...rec,
      careerGrowth:
        rec.careerName === bestCareer.careerName
          ? geminiAnalysis.careerGrowth
          : generateCareerGrowthItems(rec.careerName),
    }));

    // Save recommendations for each of top 5
    for (const rec of top5WithGrowth) {
      const isTop = rec.careerName === bestCareer.careerName;
      await prisma.careerRecommendation.create({
        data: {
          userId,
          sessionId,
          careerName: rec.careerName,
          matchPercentage: rec.matchPercentage,
          description: rec.description,
          salary: rec.salary as any,
          growthRate: rec.growthRate,
          marketDemand: rec.marketDemand,
          requiredSkills: rec.requiredSkills,
          learningPath: rec.learningPath,
          suggestedProjects: rec.suggestedProjects,
          strengths: rec.strengths,
          weaknesses: rec.weaknesses,
          careerGrowth: rec.careerGrowth,
          geminiAnalysis: (isTop ? geminiAnalysis : {}) as any,
        },
      });
    }

    const recommendations = top5WithGrowth.map((rec) =>
      toRecommendationResponse(
        rec,
        rec.careerName === bestCareer.careerName
          ? (geminiAnalysis as unknown as Record<string, unknown>)
          : {}
      )
    );

    res.json({
      success: true,
      message: 'Quiz berhasil diproses',
      data: {
        recommendation: recommendations[0],
        recommendations,
      },
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
    });
  }
}
