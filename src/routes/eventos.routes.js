import { Router } from "express";
import { createEvento, getAllEventos, getAllEventosForRegional, addUserToEvento, getEventoById } from "../controllers/evento.controller.js";

const eventoRouter = Router();

eventoRouter.get("/evento", getAllEventos);
eventoRouter.get("/evento/:id", getEventoById);
eventoRouter.post("/evento", createEvento);
eventoRouter.get("/evento/:idregional", getAllEventosForRegional);
eventoRouter.patch("/evento/:id", addUserToEvento);

export default eventoRouter;