// src/routes/corral.routes.ts
import { Router } from 'express';
import { getAllCorralesController, createCorralController } from '../controllers/corral.controller';

const router = Router();

router.get('/', getAllCorralesController);
router.post('/', createCorralController);

export default router;