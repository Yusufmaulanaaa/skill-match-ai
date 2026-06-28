import { Response } from 'express';
import prisma from '../services/prisma.service';
import { AuthRequest, RecommendationResponse } from '../types';

function formatRecommendation(rec: any): RecommendationResponse {
  const gemini = (rec.geminiAnalysis ?? {}) as Record<string, unknown>;
  return {
    careerName: rec.careerName,
    matchPercentage: rec.matchPercentage,
    description: rec.description,
    salary: rec.salary ?? { min: 0, max: 0, currency: 'IDR' },
    growthRate: rec.growthRate ?? '',
    marketDemand: rec.marketDemand ?? '',
    requiredSkills: rec.requiredSkills ?? [],
    learningPath: rec.learningPath ?? [],
    suggestedProjects: rec.suggestedProjects ?? [],
    strengths: rec.strengths ?? [],
    weaknesses: rec.weaknesses ?? [],
    careerGrowth: rec.careerGrowth ?? [],
    geminiAnalysis: gemini,
  };
}

export async function getLatestRecommendation(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const userId = req.user!.userId;

    // Get the latest session
    const latest = await prisma.careerRecommendation.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (!latest) {
      res.status(404).json({
        success: false,
        message: 'Belum ada rekomendasi. Silakan kerjakan quiz terlebih dahulu.',
      });
      return;
    }

    // Get all recommendations for the latest session
    const allRecs = await prisma.careerRecommendation.findMany({
      where: { sessionId: latest.sessionId },
      orderBy: { matchPercentage: 'desc' },
    });

    const recommendations = allRecs.map(formatRecommendation);

    res.json({
      success: true,
      message: 'Berhasil mengambil rekomendasi terbaru',
      data: {
        recommendation: recommendations[0] ?? null,
        recommendations,
      },
    });
  } catch (error) {
    console.error('Get recommendation error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
    });
  }
}
