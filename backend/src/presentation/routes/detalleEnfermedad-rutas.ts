import { Router } from 'express'
import { DetalleEnfermedadController } from '../controllers/detalleEnfermedad-controller'

const router = Router()

router.post('/', DetalleEnfermedadController.create)
router.get('/:id_bovino', DetalleEnfermedadController.getByBovino)
router.put('/:id_bovino/:id_enfermedad', DetalleEnfermedadController.update)
router.delete('/:id_bovino/:id_enfermedad', DetalleEnfermedadController.delete)

export default router