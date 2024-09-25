import mongoose from "mongoose";

const alquilerSchema = await mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    bicicleta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bicicleta"
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
    estado:{
        type:Boolean,
        required:true,
        trim:true,
        default:false
    }
});

export const AlquilerModel = await mongoose.model("alquiler", alquilerSchema);