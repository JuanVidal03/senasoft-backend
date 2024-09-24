import { RegionalModel } from "../models/regional.model.js";


export const getAllRegionales = async(req, res) => {
    try {
        
        const regionales = await RegionalModel.find({});
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

        const regionalesCreated = await RegionalModel.insertMany(regionales);

        return res.status(201).json({
            message: "Regionales creadas correctamente!",
            data: regionalesCreated,
        });

        
    } catch (error) {
        res.status(500).json({
            message: "Error al crear regionales.",
            error: error,
        });
    }
}
