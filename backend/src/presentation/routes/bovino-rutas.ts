import { Router } from "express"
import {
  crearBovino,
  listarBovinos,
  obtenerBovino,
  actualizarBovino,
  eliminarBovino,
} from "../controllers/bovino-controller"

const bovinoRouter = Router()

bovinoRouter.post("/", crearBovino)
bovinoRouter.get("/", listarBovinos)
bovinoRouter.get("/:id", obtenerBovino)
bovinoRouter.put("/:id", actualizarBovino)
bovinoRouter.delete("/:id", eliminarBovino)

export default bovinoRouter