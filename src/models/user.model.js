import mongoose from "mongoose";

const userSchema = await mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    estrato: {
        type: Number,
        required: true,
    },
    rol: {
        type: String,
        required: true,
        enum: ["Usuario", "Administrador"],
    },
    regional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "regionale"
    }
});

export const UserModel = await mongoose.model("user", userSchema);
