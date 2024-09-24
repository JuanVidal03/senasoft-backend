import mongoose from "mongoose";

export const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("<<< DB CONNECTED >>>");
        
    } catch (error) {
        console.log("<<< Error al conectar la DB >>>");
    }
}
