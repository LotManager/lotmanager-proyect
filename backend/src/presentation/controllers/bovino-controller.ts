// src/presentation/controllers/bovino-controller.ts

import { Request, Response } from 'express';
import prisma from '../../infrastructure/repositorios/client';

/* ----------------------------------------------------------
   PUT /api/bovinos/:id  → Actualizar bovino
---------------------------------------------------------- */
export const actualizarBovino = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return; // importante: salir sin ejecutar más código
    }

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

    // Validación de campos obligatorios
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
      res.status(400).json({ error: 'Faltan campos obligatorios' });
      return;
    }

    // Verificar existencia
    const existe = await prisma.bovino.findUnique({ where: { id } });
    if (!existe) {
      res.status(404).json({ error: 'Bovino no encontrado' });
      return;
    }

    // Actualizar
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

    res.json(actualizado);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

/* ----------------------------------------------------------
   DELETE /api/bovinos/:id  → Soft delete (egresar)
---------------------------------------------------------- */
export const eliminarBovino = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    const bovino = await prisma.bovino.findUnique({ where: { id } });
    if (!bovino) {
      res.status(404).json({ error: 'Bovino no encontrado' });
      return;
    }

    const egresado = await prisma.bovino.update({
      where: { id },
      data: {
        egreso: new Date(),
        estado_bovino: 'EGRESADO',
      },
    });

    res.json({ msg: 'Bovino egresado', bovino: egresado });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};