import { Router } from 'express';
import { listarRazas } from '../controllers/raza-controller';

const razaRutas = Router();
razaRutas.get('/', listarRazas);

export { razaRutas };