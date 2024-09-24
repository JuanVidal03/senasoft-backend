import mongoose from "mongoose";

const regionalSchema = await mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    coordenadas: {
        longitud: {
            type: String,
            required: true
        },
        latitud: {
            type: String,
            required: true
        }
    },
    bicicletas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "bicicletas"
    }]
});

export const RegionalModel = await mongoose.model("regionale", regionalSchema);
