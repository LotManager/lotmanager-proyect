import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
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


const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', // Adjust as needed
    credentials: true,
}));

//Rutas 

app.use("/api/auth", usuarioRutas);
app.use("/api/localidades", localidadRutas);
app.use("/api/feedlots", feedlotRutas);
app.use("/api/provincias", provinciaRutas);
app.use("/api/personal", personalRutas);
app.use("/api/enfermedades", enfermedadRutas);
app.use("/api/tratamientos", trataminetoRutas);


// app.use("/api/provincias", provinciaRutas);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});


//inicializar el servidor

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

 