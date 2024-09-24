import { Router } from "express";
import { register, login, verifyToken, logout } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/verify-token", verifyToken);
authRouter.post("/logout", logout);

export default authRouter;
