import { Router } from "express";
import { getAllRegionales, createRegionales, addBicicletaToRegional, getRegionalById } from "../controllers/regional.controller.js";

const regionalesRouter = Router();

regionalesRouter.get("/regionales", getAllRegionales);
regionalesRouter.get("/regionales/:id", getRegionalById);
regionalesRouter.post("/regionales", createRegionales);
regionalesRouter.patch("/addBicicletaReginal/:id", addBicicletaToRegional);

export default regionalesRouter;
