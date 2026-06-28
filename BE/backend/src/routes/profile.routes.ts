import { Router } from 'express';
import { createProfile, profileSchema } from '../controllers/profile.controller';
import { validate, authMiddleware } from '../middleware';

const router = Router();

router.post('/', authMiddleware, validate(profileSchema), createProfile);

export default router;
