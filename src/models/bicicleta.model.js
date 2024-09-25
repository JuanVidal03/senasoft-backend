import mongoose from "mongoose";

const bicicletasSchema = await mongoose.Schema({
    marca: {
        type: String,
        required: true,
        trim: true,
    },
    color: {
        type: String,
        required: true,
        trim: true,
    },
    estado: {
        type: String,
        required: true,
        enum: ["Activo", "Inactivo", "Mantenimiento"],
    },
    precioBase: {
        type: Number,
        required: true,
        trim: true,
    },
});

export const BicicletaModel = await mongoose.model("bicicleta", bicicletasSchema);