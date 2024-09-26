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

export const getRegionalById = async(req, res) => {
    
    const { id } = req.params;
    
    try {

        const foundRegional = await RegionalModel.findById(id).populate("bicicletas");
        if (!foundRegional) return res.status(404).json({
            message: "Regional no encontrado.",
        });

        return res.status(200).json({
            message: "Regional encongtrada",
            data: foundRegional
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener el la regional por id",
            error: error.message,
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

export const addBicicletaToRegional = async(req, res) => {

    const { id } = req.params;
    const bicicletas = req.body;

    try {

        const foundRegional = await RegionalModel.findById(id).populate("bicicletas");
        if (!foundRegional) return res.status(404).json({
            message: "Regional no encontrado.",
        });

        foundRegional.bicicletas = bicicletas;

        foundRegional.save();

        return res.status(200).json({
            message: "Bicicletas agregadas correctamente.",
            data: foundRegional,
        });

        
    } catch (error) {
        res.status(500).json({
            message: "Error al agregar bicicletas a la regional.",
            error: error,
        });
    }
}
