import { Router } from "express";
import { createAlquiler, getAllAlquileres, getAlquileresForUser, patchAlquiler } from "../controllers/alquiler.controller.js";
const alquilerRouter = Router();

alquilerRouter.get("/alquiler", getAllAlquileres);
alquilerRouter.post("/alquiler", createAlquiler);
alquilerRouter.get("/alquiler/:iduser", getAlquileresForUser);
alquilerRouter.patch('/alquiler/:alquilerid', patchAlquiler)

export default alquilerRouter;