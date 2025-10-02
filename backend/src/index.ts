import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Routers
import feedlotRutas from './presentation/routes/feedlot-rutas';
import { razaRutas } from './presentation/routes/raza-rutas';
import { pesajeRutas } from './presentation/routes/pesaje-rutas';
import { bovinoRouter } from './presentation/routes/bovino-rutas'; // PUT / DELETE ya hechos

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

/* ---------- API ---------- */
app.use('/api/feedlots', feedlotRutas);
app.use('/api/razas',    razaRutas);
app.use('/api/pesajes',  pesajeRutas);
app.use('/api/bovinos',  bovinoRouter);

/* ---------- Health check ---------- */
app.get('/', (_req, res) => res.send('Hello, World!'));

/* ---------- 404 & Global Error ---------- */
app.use((_req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

app.use((err: any, _req: Request, res: Response, _next: any) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

/* ---------- Levantar servidor ---------- */
app.listen(PORT, () => {
  console.log(` Server ready at http://localhost:${PORT}`);
});