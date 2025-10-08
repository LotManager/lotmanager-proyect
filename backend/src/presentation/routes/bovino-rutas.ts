import { Router } from 'express';
import { authMiddleware } from '../middlewares/authmiddleware';
import { actualizarBovino, eliminarBovino } from '../controllers/bovino-controller';

export const bovinoRouter = Router();

/* ---------- PUT /api/bovinos/:id ---------- */
bovinoRouter.put('/:id', authMiddleware, actualizarBovino);

/* ---------- DELETE /api/bovinos/:id ---------- */
bovinoRouter.delete('/:id', authMiddleware, eliminarBovino);