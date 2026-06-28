import { Router } from 'express';
import { getLatestRecommendation } from '../controllers/recommendation.controller';
import { authMiddleware } from '../middleware';

const router = Router();

router.get('/latest', authMiddleware, getLatestRecommendation);

export default router;
