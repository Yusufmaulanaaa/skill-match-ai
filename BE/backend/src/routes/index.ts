import { Router } from 'express';
import authRoutes from './auth.routes';
import profileRoutes from './profile.routes';
import quizRoutes from './quiz.routes';
import recommendationRoutes from './recommendation.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/quiz', quizRoutes);
router.use('/recommendation', recommendationRoutes);

export default router;
