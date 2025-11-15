import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Request, Response } from 'express';
import { roleGuard  } from './presentation/middlewares/roleGuard';
import feedlotRutas from './presentation/routes/feedlot-rutas';
import localidadRutas from './presentation/routes/localidad-rutas';
import provinciaRutas from './presentation/routes/provincia-rutas';
import usuarioRutas from './presentation/routes/usuario-rutas';
import personalRutas from './presentation/routes/personal-rutas';
import enfermedadRutas from './presentation/routes/enfermedad-rutas';
import trataminetoRutas from './presentation/routes/tratamiento-rutas'
import corralRoutes from './presentation/routes/corral-routes'; 
import detalleAlimentoRoutes from "./presentation/routes/detalleAlimento-routes";
import suministroRoutes from "./presentation/routes/suministro-routes"
import alimentoRoutes from "./presentation/routes/alimento-routes"
import alimentacionRoutes from "./presentation/routes/alimentacion-routes"
import detalleEnfermedadRoutes from './presentation/routes/detalleEnfermedad-rutas';
import pesajeRouter from "./presentation/routes/pesaje-rutas";    
import bovinoRouter from "./presentation/routes/bovino-rutas";
import corralMetricsRouter from './presentation/routes/corral-metrics-rutas';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
}));

//Rutas 

app.use("/api/auth", usuarioRutas);
app.use("/api/localidades", localidadRutas);
app.use("/api/feedlots", feedlotRutas);
app.use("/api/provincias", provinciaRutas);
app.use("/api/personal", personalRutas);
app.use("/api/enfermedades", enfermedadRutas);
app.use("/api/tratamientos", roleGuard(["admin", "encargado"]), trataminetoRutas);
app.use("/api/corrales", corralRoutes);
app.use("/api/detalle-alimentos", detalleAlimentoRoutes);
app.use("/api/suministros", suministroRoutes);
app.use("/api/alimentos", alimentoRoutes);
app.use("/api/alimentaciones", alimentacionRoutes);
app.use("/api/detalle-enfermedad", detalleEnfermedadRoutes);
app.use("/api/pesaje", roleGuard(["admin", "encargado"]), pesajeRouter);
app.use("/api/bovinos", bovinoRouter);
app.use("/api/corral-metrics", corralMetricsRouter);

// app.use("/api/provincias", provinciaRutas);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});


//inicializar el servidor

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
