import { Router } from 'express'
import { TratamientoController } from '../../presentation/controllers/tratamiento-controller'
import { TratamientoService } from '../../application/services/tratamientoService'
import { TratamientoRepository } from '../../infrastructure/repositorios/PrismaTratamientoRepository'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = Router()
const tratamientoService = new TratamientoService(new TratamientoRepository(prisma))
const controller = new TratamientoController(tratamientoService)


router.post('/', controller.crear.bind(controller))
router.get('/:id', controller.obtenerPorId.bind(controller))
router.get('/:id/enfermedades', controller.obtenerConEnfermedades.bind(controller))
router.patch('/:id', controller.actualizar.bind(controller))
router.delete('/:id', controller.eliminar.bind(controller))
router.get('/', controller.listar.bind(controller))

export default router