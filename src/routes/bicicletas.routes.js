import { Router } from "express";
import { getAllBicicletas, createBicicletas, getAllBicicletasIds } from "../controllers/bicicletas.controller.js"

const bicicletasRouter = Router();

bicicletasRouter.get("/bicicletas", getAllBicicletas);
bicicletasRouter.post("/bicicletas", createBicicletas);
bicicletasRouter.get("/bicicletasIds", getAllBicicletasIds);

export default bicicletasRouter;
