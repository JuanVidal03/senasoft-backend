import { BicicletaModel } from "../models/bicicleta.model.js";

export const getAllBicicletas = async(req, res) => {
    try {
        
        const bicicletas = await BicicletaModel.find({});

        return res.status(200).json({
            message: "Bicicletas obtenidas correctamente!",
            data: bicicletas,
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener todas las bicicletas",
            error,
        });
    }
}

export const createBicicletas = async(req, res) => {

    const bicicletas = req.body;

    try {

        const createdBicicletas = await BicicletaModel.insertMany(bicicletas);

        return res.status(201).json({
            message: "Bicicletas creadas correctamente!",
            data: createdBicicletas,
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Error al crear las bicicletas",
            error,
        });
    }
}

export const getAllBicicletasIds = async(req, res) => {
    try {
        
        const bicicletasIds = await BicicletaModel.find({})
            .sort({ _id: -1 })
            .limit(100)
            .select("_id");

        return res.status(200).json({
            message: "Bicicletas obtenidas correctamente!",
            data: bicicletasIds,
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener todas las bicicletas",
            error,
        });
    }
}


export const patchBicicleta= async (req, res) => {
    const { idbicicleta } = req.params;
    const estado = req.body;
  
    try {
      const bicicletaActualizado = await BicicletaModel.findByIdAndUpdate(
        idbicicleta,
        estado,
        {
          new: true,
          runValidators: true,
        }
      );
  
      if (!bicicletaActualizado) {
        return res.status(404).json({ mensaje: "Alquiler no encontrado." });
      }
  
      return res.status(200).json(bicicletaActualizado);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        mensaje: "Error al actualizar el alquiler.",
        error: error.message,
      });
    }
};
