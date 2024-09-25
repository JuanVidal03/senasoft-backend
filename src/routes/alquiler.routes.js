import { Router } from "express";
import { createAlquiler, getAllAlquileres, getAlquileresForUser } from "../controllers/alquiler.controller.js";
const alquilerRouter = Router();

alquilerRouter.get("/alquiler", getAllAlquileres);
alquilerRouter.post("/alquiler", createAlquiler);
alquilerRouter.get("/alquiler/:idUser", getAlquileresForUser);

export default alquilerRouter;