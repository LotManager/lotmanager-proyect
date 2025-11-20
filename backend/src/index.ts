import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Request, Response } from 'express';

// --- RUTAS ROTAS (TEMPORALMENTE DESACTIVADAS) ---
// (Estas dependen del schema viejo y las arreglaremos después)
// import feedlotRutas from './presentation/routes/feedlot-rutas';
// import localidadRutas from './presentation/routes/localidad-rutas';
// import provinciaRutas from './presentation/routes/provincia-rutas';
// import usuarioRutas from './presentation/routes/usuario-rutas';
// import personalRutas from './presentation/routes/personal-rutas';
// import enfermedadRutas from './presentation/routes/enfermedad-rutas';
// import trataminetoRutas from './presentation/routes/tratamiento-rutas'
// import detalleAlimentoRoutes from "./presentation/routes/detalleAlimento.routes";
// import suministroRoutes from "./presentation/routes/suministro.routes"
// import alimentacionRoutes from "./presentation/routes/alimentacion.routes"
// import corralMetricsRouter from './presentation/routes/corral-metrics-rutas';

// --- RUTAS QUE VAMOS A PROBAR (YA ESTÁN ARREGLADAS) ---
import corralRoutes from './presentation/routes/corral-routes'; 
import bovinoRouter from "./presentation/routes/bovino-rutas";
import movimientoCorralRoutes from './presentation/routes/movimientoCorral.routes';
import pesajeRouter from "./presentation/routes/pesaje-rutas";
import razaRouter from './presentation/routes/raza-routes';
import alimentoRoutes from "./presentation/routes/alimento.routes"
import dietaRouter from './presentation/routes/dieta.routes';
import suministroRouter from './presentation/routes/suministro.routes';
import reportesRouter from './presentation/routes/reportes-rutas';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', // Adjust as needed
    credentials: true,
}));

// --- Rutas Desactivadas ---
// app.use("/api/auth", usuarioRutas);
// app.use("/api/localidades", localidadRutas);
// app.use("/api/feedlots", feedlotRutas);
// app.use("/api/provincias", provinciaRutas);
// app.use("/api/personal", personalRutas);
// app.use("/api/enfermedades", enfermedadRutas);
// app.use("/api/tratamientos", trataminetoRutas);
// app.use('/detalle-alimentos', detalleAlimentoRoutes);
// app.use('/alimentaciones', alimentacionRoutes);
// app.use('/api/corral-metrics', corralMetricsRouter);

// --- Rutas Activas ---
app.use('/api/corrales', corralRoutes);
app.use('/api/bovinos', bovinoRouter);
app.use('/api/movimientos', movimientoCorralRoutes);
app.use('/api/pesajes', pesajeRouter);
app.use('/api/razas', razaRouter);
app.use('/api/alimentos', alimentoRoutes);
app.use('/api/dietas', dietaRouter);
app.use('/api/suministros', suministroRouter);
app.use('/api/reports', reportesRouter);

// --- Rutas de Test (Las dejamos) ---
app.get("/test-provincia", (req, res) => {
  res.send("Ruta directa funcionando");
});
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});


//inicializar el servidor
app.listen(PORT, () => {
    // Te agrego unos logs para que sea claro que estás en modo de prueba
    console.log(`🚀 SERVIDOR ARRANCADO (MODO DE PRUEBA)`);
    console.log(`✨ Rutas activas: /api/corrales, /api/bovinos`);
    console.log(`Server is running on http://localhost:${PORT}`);
});