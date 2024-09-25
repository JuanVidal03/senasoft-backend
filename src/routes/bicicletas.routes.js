import { Router } from "express";
import { getAllBicicletas, createBicicletas, getAllBicicletasIds } from "../controllers/bicicleta.controller.js";

const bicicletasRouter = Router();

bicicletasRouter.get("/bicicletas", getAllBicicletas);
bicicletasRouter.post("/bicicletas", createBicicletas);
bicicletasRouter.get("/bicicletasIds", getAllBicicletasIds);

export default bicicletasRouter;
