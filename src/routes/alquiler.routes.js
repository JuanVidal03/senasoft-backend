import { Router } from "express";
import { createAlquiler, getAllAlquileres, getAlquileresForUser, getTotalRentWeek, makeProfitMonth, patchAlquiler } from "../controllers/alquiler.controller.js";
const alquilerRouter = Router();

alquilerRouter.get("/makeProfitMonth", makeProfitMonth)
alquilerRouter.get("/alquilerWeek", getTotalRentWeek)
alquilerRouter.get("/alquiler", getAllAlquileres);
alquilerRouter.post("/alquiler", createAlquiler);
alquilerRouter.get("/alquiler/:iduser", getAlquileresForUser);
alquilerRouter.patch('/alquilerpatch/:alquilerid', patchAlquiler)

export default alquilerRouter;