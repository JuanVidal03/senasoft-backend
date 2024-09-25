import { Router } from "express";
import { createEvento, getAllEventos, getAllEventosForRegional } from "../controllers/evento.controller.js";

const eventoRouter = Router();

eventoRouter.get("/evento", getAllEventos);
eventoRouter.post("/evento", createEvento);
eventoRouter.get("/evento/:idregional", getAllEventosForRegional);

export default eventoRouter;