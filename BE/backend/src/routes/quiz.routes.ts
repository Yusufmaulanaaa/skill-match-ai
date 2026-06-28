import { Router } from 'express';
import { getQuestions, submitQuiz, submitQuizSchema } from '../controllers/quiz.controller';
import { validate, authMiddleware } from '../middleware';

const router = Router();

router.get('/questions', getQuestions);
router.post('/submit', authMiddleware, validate(submitQuizSchema), submitQuiz);

export default router;
