import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Request, Response } from 'express';
import feedlotRutas from './presentation/routes/feedlot-rutas';
import localidadRutas from './presentation/routes/localidad-rutas';
import provinciaRutas from './presentation/routes/provincia-rutas';
import usuarioRutas from './presentation/routes/usuario-rutas';
import personalRutas from './presentation/routes/personal-rutas';
import enfermedadRutas from './presentation/routes/enfermedad-rutas';
import trataminetoRutas from './presentation/routes/tratamiento-rutas'

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
app.use("/api/auth", usuarioRutas);
app.use("/api/localidades", localidadRutas);
app.use("/api/feedlots", feedlotRutas);
app.use("/api/provincias", provinciaRutas);
app.use("/api/personal", personalRutas);
app.use("/api/enfermedades", enfermedadRutas);
app.use("/api/tratamientos", trataminetoRutas);

/* ---------- 404 & Global Error ---------- */
app.use((_req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

app.use((err: any, _req: Request, res: Response, _next: any) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
// app.use("/api/provincias", provinciaRutas);



app.get("/test-provincia", (req, res) => {
  res.send("Ruta directa funcionando");
});
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

/* ---------- Levantar servidor ---------- */
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

 
