import { AlquilerModel } from "../models/alquiler.model.js";

export const getAllAlquileres = async(req, res) => {
    try {
        const alquileres = await AlquilerModel.find({}).populate('usuario').populate('bicicleta');
        return res.status(200).json({
            message: "alquileres obtenidos correctamente!",
            data: alquileres,
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener todas los alquileres",
            error,
        });
    }
}

export const createAlquiler = async(req, res) => {

    const alquiler = req.body;

    try {

        const createdAlquiler = await AlquilerModel.create(alquiler);

        return res.status(201).json({
            message: "Alquiler creado correctamente!",
            data: createdAlquiler,
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Error al crear los alquileres",
            error,
        });
    }
}

export const getAlquileresForUser = async (req, res) => {
    const { idUser } = req.params;

    try {
        const alquileres = await AlquilerModel.find({ usuario: idUser })
            .populate('bicicleta') 

        if (!alquileres.length) {
            return res.status(404).json({ mensaje: 'No se encontraron alquileres para este usuario.' });
        }

        return res.status(200).json(alquileres);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener los alquileres.', error: error.message });
    }
};

