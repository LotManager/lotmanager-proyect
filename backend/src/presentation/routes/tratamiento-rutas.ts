
import { Router } from 'express'
import { TratamientoController } from '../../presentation/controllers/tratamiento-controller'
import { TratamientoService } from '../../application/services/tratamientoService'
import { TratamientoRepository } from '../../infrastructure/repositorios/PrismaTratamientoRepository'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = Router()
const tratamientoService = new TratamientoService(new TratamientoRepository(prisma))
const controller = new TratamientoController(tratamientoService)

console.log('Tratamiento endpoints cargados')

router.post('/', controller.create.bind(controller))
router.get('/:id', controller.getById.bind(controller))
router.get('/:id/enfermedades', controller.getWithEnfermedades.bind(controller))
router.patch('/:id', controller.update.bind(controller))
router.delete('/:id', controller.delete.bind(controller))
router.get('/', controller.getAll.bind(controller))

export default router