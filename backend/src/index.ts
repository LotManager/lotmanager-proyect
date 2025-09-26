import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import corralRoutes from './presentation/routes/corral.routes'; // 👈 Import con extensión .js

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/corrales', corralRoutes);

// Ruta de prueba
app.get('/ping', (_req, res) => {
  res.send('pong 🏓');
});

export default app;