import { RegionalModel } from "../models/regional.model.js";
import mongoose from "mongoose";

export const getAllRegionales = async(req, res) => {
    try {
        
        const regionales = await RegionalModel.find({}).populate("bicicletas");
        return res.status(200).json({
            message: "Regionales obtenidas correctamente!",
            data: regionales,
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener todas las regionales.",
            error: error,
        });
    }
}

export const createRegionales = async(req, res) => {

    const regionales = req.body;

    try {

        regionales.forEach(regional => {
            if (regional.bicicletas) {
                regional.bicicletas = regional.bicicletas
                    .filter(id => mongoose.Types.ObjectId.isValid(id))
                    .map(id => new mongoose.Types.ObjectId(id));
            }
        });

        console.log(regionales);

        const regionalesCreated = await RegionalModel.insertMany(regionales);

        return res.status(201).json({
            message: "Regionales creadas correctamente!",
            data: regionalesCreated,
        });

        
    } catch (error) {
        res.status(500).json({
            message: "Error al crear regionales.",
            error: error.message,
        });
    }
}
