import { Request, Response } from "express";
import EventRegistration from "../models/shirtModel";

/**
 * Generador de folio
 */
const generateFolio = () => {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000);

  return `SDC-${yyyy}${mm}${dd}-${random}`;
};

export class EventRegistrationController {
  static create = async (req: Request, res: Response) => {
    try {
      const { fullName, phone, willAttend } = req.body;

      if (!fullName || !phone || !willAttend) {
        return res.status(400).json({
          success: false,
          message: "fullName, phone y willAttend son obligatorios",
        });
      }

      if (!["si", "no"].includes(willAttend)) {
        return res.status(400).json({
          success: false,
          message: "willAttend debe ser 'si' o 'no'",
        });
      }

      /**
       * Validar duplicado
       */
      const existing = await EventRegistration.findOne({
        where: { phone },
      });

      if (existing) {
        return res.status(409).json({
          success: false,
          message: "Este teléfono ya está registrado",
        });
      }

      /**
       * Generar folio único
       */
      let folio = generateFolio();

      let existsFolio = await EventRegistration.findOne({
        where: { folio },
      });

      while (existsFolio) {
        folio = generateFolio();
        existsFolio = await EventRegistration.findOne({
          where: { folio },
        });
      }

      /**
       * Crear registro
       */
      const newRegistration = await EventRegistration.create({
        fullName: fullName.trim(),
        phone: phone.trim(),
        willAttend,
        folio,
      });

      console.log("REGISTRO GUARDADO:", newRegistration.toJSON());

      return res.status(201).json({
        success: true,
        message: "Registro exitoso",
        data: {
          folio: newRegistration.folio,
          fullName: newRegistration.fullName,
          phone: newRegistration.phone,
          willAttend: newRegistration.willAttend,
        },
      });
    } catch (error: any) {
      console.error("ERROR:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "Error interno",
      });
    }
  };

  /**
   * DEBUG endpoint (MUY IMPORTANTE)
   */
  static getAll = async (_req: Request, res: Response) => {
    const data = await EventRegistration.findAll({
      order: [["id", "DESC"]],
    });

    return res.json({
      total: data.length,
      data,
    });
  };
}