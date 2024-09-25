import mongoose from "mongoose";

const eventoSchema = await mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true,
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
    },
    direccion: {
        type: String,
        required: true,
        trim: true,
    },
    fecha: {
        type: Date,
        required: true,
        trim: true,
    },
    regional:{
         type: mongoose.Schema.Types.ObjectId,
        ref: "regionale"
    }
});

export const EventoModel = await mongoose.model("evento", eventoSchema);