import mongoose from "mongoose";

const regionalSchema = await mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    coordenadas: {
        x: {
            type: String,
            required: true
        },
        y: {
            type: String,
            required: true
        }
    }
});

export const RegionalModel = await mongoose.model("regionale", regionalSchema);
