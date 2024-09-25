import mongoose from "mongoose";

const alquilerSchema = await mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    bicicleta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bicicletas"
    },
    fechaInicio: {
        type: Date,
        required: true,
        trim: true,
    },
    fechaFin: {
        type: Date,
        required: true,
        trim: true,
    },
    valorTotal:{
        type:Number,
        required:true,
        trim:true
    },
    precioUso:{
        type:Number,
        required:true,
        trim:true
    }
});

export const AlquilerModel = await mongoose.model("alquiler", alquilerSchema);