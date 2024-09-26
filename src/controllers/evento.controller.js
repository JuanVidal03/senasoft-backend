import { EventoModel } from "../models/eventos.model.js";


export const getAllEventos = async(req, res) => {
    try {
        const eventos = await EventoModel.find({}).populate('regional')
        return res.status(200).json({
            message: "Eventos obtenidos correctamente!",
            data: eventos,
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener todas los eventos",
            error,
        });
    }
}

export const getEventoById = async(req, res) => {

    const { id } = req.params;

    try {
        const foundEvent = await EventoModel.findById(id).populate("participantes");
        if (!foundEvent) return res.status(404).json({
            message: "Evento no encontrado",
        });

        return res.status(200).json({
            message: "Eventos obtenidos correctamente!",
            data: foundEvent,
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener todas los eventos",
            error,
        });
    }
}


export const createEvento = async(req, res) => {

    const evento = req.body;

    try {

        const createdEvento = await EventoModel.create(evento);

        return res.status(201).json({
            message: "evento creado correctamente!",
            data: createdEvento,
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Error al crear los eventos",
            error,
        });
    }
}

export const getAllEventosForRegional = async (req, res) => {
    const { idregional } = req.params;

    try {
        const eventos = await EventoModel.find({ regional: idregional })
            .populate('regional') 

        if (!eventos.length) {
            return res.status(404).json({ mensaje: 'No se encontraron eventos para este centor.' });
        }

        return res.status(200).json(eventos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener los centros.', error: error.message });
    }
};

export const addUserToEvento = async(req, res) => {
    
    const { id } = req.params;
    const { idUser } = req.body;
    
    try {

        const foundEvento = await EventoModel.findById(id).populate("participantes");
        if (!foundEvento) return res.status(404).json({
            message: "Evento no encontrado.",
        });

        const userExists = foundEvento.participantes.some(participante => participante._id.toString() === idUser );

        if (userExists) return res.status(400).json({
                message: "El usuario ya está en la lista de participantes."
        });

        foundEvento.participantes.push(idUser);

        await foundEvento.save();

        return res.status(200).json({
            message: "Usuario agregado al evento correctamente!",
            data: foundEvento,
        });


    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error al agregar usuario al evento.',
            error: error.message
        });
    }
}
