import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async(req, res) => {
    
    const userData = req.body;

    try {
        
        const foundUser = await UserModel.findOne({ email: userData.email });
        if(foundUser) return res.status(400).json({
            message: `El usuario con email: ${userData.email} ya existe.`,
        });

        const user = new UserModel(userData);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(userData.password, salt);

        await user.save();

        res.status(201).json({
            message: "Usuario creado exitosamente!",
            user,
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al registrar el usuario",
            error: error.message,
        });
    }
}

export const login = async(req, res) => {

    const userData = req.body;

    try {

        const foundUser = await UserModel.findOne({ email: userData.email });
        if(!foundUser) return res.status(404).json({
            message: `El usuario con email: ${userData.email} no existe.`,
        });

        const comparePassword = await bcrypt.compare(userData.password, foundUser.password);
        if(!comparePassword) return res.status(400).json({
            message: "Credenciales incorrectas.",
        });

        jwt.sign(
            { _id: foundUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "12h" },
            (error, token) => {
                if(error) return res.status(400).json({
                    message: "Error al generar el token",
                    error: error.message,
                });

                res.cookie("token", token, {
                    secure: true,
                    sameSites: "none",
                    httpOnly: false, 
                });

                return res.status(200).json({
                    message: "Sesión iniciada correctamente!",
                    data: { token, user: foundUser }
                });
            }

        );

        
    } catch (error) {
        res.status(500).json({
            message: "Error al iniciar sesion.",
            error: error.message,
        });
    }
}

export const verifyToken = async(req, res) => {
    
    const { token } = req.cookies;

    try {
        
        if(!token) return res.status(403).json({
            message: "Sin autorización.",
        });

        jwt.verify(token, process.env.JWT_SECRET, async(error, user) => {

            if(error) return res.status(400).json({
                message: "Error al verificar el token",
                error: error.message,
            });

            const foundUser = await UserModel.findById(user._id);
            if(!foundUser) return res.status(404).json({
                message: "Usuario no encontrado",
            });

            return res.status(200).json({
                message: "Token verificado correctamente.",
                user: foundUser,
            });

        });

    } catch (error) {
        res.status(500).json({
            message: "Error al verificar el token.",
            error: error.message,
        });
    }
}

export const logout = async(req, res) => {
    try {
        
        res.cookie("token", "", {
            expires: new Date(0),
        });

        return res.status(200).json({
            message: "Sesión cerrada correctamente."
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al cerrar sesion.",
            error: error.message,
        });
    }
}
