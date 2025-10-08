import { Router } from 'express';
import { authMiddleware } from '../middlewares/authmiddleware';
import { crearPesaje, listarPesajesPorBovino, reporteCrecimiento, reporteCorral, eficienciaBovino } from '../controllers/pesaje-controllers';

const pesajeRouter = Router();

pesajeRouter.post('/', crearPesaje);
pesajeRouter.get('/bovino/:id', listarPesajesPorBovino);
pesajeRouter.get('/bovino/:id/reporte', reporteCrecimiento);
pesajeRouter.get('/corral/:id/reporte', reporteCorral);
pesajeRouter.get('/bovino/:id/eficiencia',  eficienciaBovino);

export default pesajeRouter;

