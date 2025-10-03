// src/presentation/routes/bovino-rutas.ts
import { Router } from 'express';
import prisma from '../../infrastructure/repositorios/client';
import { authMiddleware } from '../middlewares/authmiddleware';
import { actualizarBovino, eliminarBovino } from '../controllers/bovino-controller';

export const bovinoRouter = Router();

bovinoRouter.put('/:id', authMiddleware, actualizarBovino);
bovinoRouter.delete('/:id', authMiddleware, eliminarBovino);


/* ----------------------------------------------------------
   PUT  /api/bovinos/:id  → Actualizar un bovino completo
---------------------------------------------------------- */
bovinoRouter.put('/:id', authMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id);               // 1. ID que viene en la URL
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    // 2. Body que envía el cliente (frontend o Postman)
    const {
      id_raza,
      id_corral,
      caravana,
      estado_bovino,
      estado_salud,
      ingreso,
      egreso,
      peso_ingreso,
      peso_egreso,
      sexo,
      tipo_bovino,
    } = req.body;

    // 3. Validar campos OBLIGATORIOS
    if (
      !id_raza ||
      !id_corral ||
      caravana === undefined ||
      !estado_bovino ||
      !ingreso ||
      !peso_ingreso ||
      !sexo ||
      !tipo_bovino
    ) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // 4. Verificar que exista el bovino
    const existe = await prisma.bovino.findUnique({ where: { id } });
    if (!existe) return res.status(404).json({ error: 'Bovino no encontrado' });

    // 5. Update en la BD
    const actualizado = await prisma.bovino.update({
      where: { id },
      data: {
        id_raza: Number(id_raza),
        id_corral: Number(id_corral),
        caravana: Number(caravana),
        estado_bovino,
        estado_salud: estado_salud || 'SANO',
        ingreso: new Date(ingreso),
        egreso: egreso ? new Date(egreso) : null,
        peso_ingreso: parseFloat(peso_ingreso),
        peso_egreso: peso_egreso ? parseFloat(peso_egreso) : null,
        sexo,
        tipo_bovino,
      },
    });

    // 6. Responder
    res.json(actualizado);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

/* ----------------------------------------------------------
   DELETE  /api/bovinos/:id  → Soft delete (egresar)
---------------------------------------------------------- */
bovinoRouter.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    // 1. Verificar que exista
    const bovino = await prisma.bovino.findUnique({ where: { id } });
    if (!bovino) return res.status(404).json({ error: 'Bovino no encontrado' });

    // 2. Soft delete: marcar fecha de egreso y estado
    const egresado = await prisma.bovino.update({
      where: { id },
      data: {
        egreso: new Date(),
        estado_bovino: 'EGRESADO', // o el valor que uses
      },
    });

    res.json({ msg: 'Bovino egresado', bovino: egresado });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});