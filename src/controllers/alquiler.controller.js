import { AlquilerModel } from "../models/alquiler.model.js";
import { BicicletaModel } from "../models/bicicleta.model.js";

export const getAllAlquileres = async (req, res) => {
  try {
    const alquileres = await AlquilerModel.find()
      .populate("usuario")
      .populate("bicicleta");
    return res.status(200).json({
      message: "alquileres obtenidos correctamente!",
      data: alquileres,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener todas los alquileres",
      error,
    });
  }
};

export const createAlquiler = async (req, res) => {
  const alquiler = req.body;
  const idBicicleta = alquiler.bicicleta;
  const estado = "Inactivo";

  try {
    const createdAlquiler = await AlquilerModel.create(alquiler);

    
    const updateBicycleState = await BicicletaModel.findByIdAndUpdate(
      idBicicleta,
      { estado: estado }, 
      {
        new: true,
        runValidators: true, 
      }
    );

    if (!updateBicycleState) {
      return res.status(404).json({ message: "Bicicleta no encontrada." });
    }

    return res.status(201).json({
      message: "Alquiler creado correctamente!",
      data: createdAlquiler,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al crear los alquileres",
      error: error.message,
    });
  }
};

export const getAlquileresForUser = async (req, res) => {
  const { iduser } = req.params;

  try {
    const alquileres = await AlquilerModel.find({ usuario: iduser }).populate(
      "bicicleta"
    );

    if (!alquileres.length) {
      return res
        .status(404)
        .json({ mensaje: "No se encontraron alquileres para este usuario." });
    }

    return res.status(200).json(alquileres);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        mensaje: "Error al obtener los alquileres.",
        error: error.message,
      });
  }
};

export const patchAlquiler = async (req, res) => {
  const { alquilerid } = req.params;
  const data = req.body;

  try {
    const alquilerActualizado = await AlquilerModel.findByIdAndUpdate(
      alquilerid,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!alquilerActualizado) {
      return res.status(404).json({ mensaje: "Alquiler no encontrado." });
    }

    return res.status(200).json(alquilerActualizado);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        mensaje: "Error al actualizar el alquiler.",
        error: error.message,
      });
  }
};
