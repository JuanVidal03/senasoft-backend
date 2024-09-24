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
        enum: ["activo", "inactivo", "mantenimiento"],
    },
    precio: {
        type: Number,
        required: true,
        trim: true,
    },
   
});

export const BicicletaModel = await mongoose.model("bicicleta", bicicletasSchema);