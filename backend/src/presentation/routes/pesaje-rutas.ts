import { Router } from 'express';
import { crearPesaje, listarPesajesPorBovino } from '../controllers/pesaje-controller';
import { authMiddleware } from '../middlewares/authmiddleware'; // si querés proteger

const pesajeRutas = Router();

// POST /api/pesajes
pesajeRutas.post('/', authMiddleware, crearPesaje);

// GET /api/bovinos/:id/pesajes
pesajeRutas.get('/bovino/:id', authMiddleware, listarPesajesPorBovino);

export { pesajeRutas };