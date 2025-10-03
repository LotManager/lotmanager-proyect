import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import corralRoutes from './presentation/routes/corral.routes'; 
import detalleAlimentoRoutes from "./presentation/routes/detalleAlimento.routes";
import suministroRoutes from "./presentation/routes/suministro.routes"


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/corrales', corralRoutes);
app.use('/detalle-alimentos', detalleAlimentoRoutes);
app.use('/suministros', suministroRoutes);
