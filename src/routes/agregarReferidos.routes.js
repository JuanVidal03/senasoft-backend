import { Router } from "express";
import { enviarCorreoInvitacion, verificarInvitacion, } from "../controllers/agregarReferidos.controller.js";
const referidosRouter = Router();

referidosRouter.post("/enviarcorreo", enviarCorreoInvitacion);
referidosRouter.get("/user/invitation/:token", verificarInvitacion);

export default referidosRouter;