import { Router } from "express";
import { getAllRegionales, createRegionales } from "../controllers/regional.controller.js";

const regionalesRouter = Router();

regionalesRouter.get("/regionales", getAllRegionales);
regionalesRouter.post("/regionales", createRegionales);

export default regionalesRouter;
