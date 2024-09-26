import { Router } from "express";
import { getAllBicicletas, createBicicletas, getAllBicicletasIds, patchBicicleta } from "../controllers/bicicletas.controller.js"

const bicicletasRouter = Router();

bicicletasRouter.get("/bicicletas", getAllBicicletas);
bicicletasRouter.post("/bicicletas", createBicicletas);
bicicletasRouter.get("/bicicletasIds", getAllBicicletasIds);
bicicletasRouter.patch("/bicicletaPatch/:idbicicleta", patchBicicleta)

export default bicicletasRouter;
