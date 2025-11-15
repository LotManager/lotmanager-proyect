import { Router } from "express"
import { crearPesaje, listarPesajesPorBovino } from "../controllers/pesaje-controllers"

const pesajeRouter = Router()

pesajeRouter.post("/", crearPesaje)
pesajeRouter.get("/bovino/:id", listarPesajesPorBovino)

export default pesajeRouter