import mongoose from "mongoose";

const bicicletasSchema = await mongoose.Schema({
    Usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    Bicicleta: {
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

export const BicicletaModel = await mongoose.model("bicicleta", bicicletasSchema);