import { Router } from 'express';
import { authMiddleware } from '../middlewares/authmiddleware';
import { crearPesaje, listarPesajesPorBovino, reporteCrecimiento, reporteCorral, eficienciaBovino } from '../controllers/pesaje-controllers';

export const pesajeRouter = Router();

pesajeRouter.post('/', authMiddleware, crearPesaje);
pesajeRouter.get('/bovino/:id', authMiddleware, listarPesajesPorBovino);
pesajeRouter.get('/bovino/:id/reporte', authMiddleware, reporteCrecimiento);
pesajeRouter.get('/corral/:id/reporte', authMiddleware, reporteCorral);
pesajeRouter.get('/bovino/:id/eficiencia', authMiddleware, eficienciaBovino);

