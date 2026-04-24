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
      const {
        fullName,
        phone,
        willAttend,
        churchName,
        hasCompanions,
        companionsCount,
      } = req.body;

      /**
       * 🔥 VALIDACIONES BASE
       */
      if (!fullName || !phone || !willAttend || !churchName) {
        return res.status(400).json({
          success: false,
          message:
            "fullName, phone, churchName y willAttend son obligatorios",
        });
      }

      if (!["si", "no"].includes(willAttend)) {
        return res.status(400).json({
          success: false,
          message: "willAttend debe ser 'si' o 'no'",
        });
      }

      /**
       * 🔥 NORMALIZAR DATOS DE ACOMPAÑANTES
       */
      const hasCompanionsNormalized = Boolean(hasCompanions);
      const companionsCountNormalized = Number(companionsCount) || 0;

      /**
       * 🔥 REGLAS DE NEGOCIO
       */
      if (!hasCompanionsNormalized && companionsCountNormalized > 0) {
        return res.status(400).json({
          success: false,
          message:
            "No puedes enviar acompañantes si no marcaste que vienes acompañado",
        });
      }

      if (hasCompanionsNormalized && companionsCountNormalized <= 0) {
        return res.status(400).json({
          success: false,
          message:
            "Debes indicar al menos 1 acompañante si marcaste que vienes acompañado",
        });
      }

      if (companionsCountNormalized < 0) {
        return res.status(400).json({
          success: false,
          message: "El número de acompañantes no puede ser negativo",
        });
      }

      /**
       * 🔥 VALIDAR DUPLICADO
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
       * 🔥 GENERAR FOLIO ÚNICO
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
       * 🔥 CREAR REGISTRO
       */
      const newRegistration = await EventRegistration.create({
        fullName: fullName.trim(),
        phone: phone.trim(),
        churchName: churchName.trim(),
        willAttend,
        folio,
        hasCompanions: hasCompanionsNormalized,
        companionsCount: companionsCountNormalized,
      });

      console.log("REGISTRO GUARDADO:", newRegistration.toJSON());

      /**
       * 🔥 RESPONSE LIMPIO
       */
      return res.status(201).json({
        success: true,
        message: "Registro exitoso",
        data: {
          folio: newRegistration.folio,
          fullName: newRegistration.fullName,
          phone: newRegistration.phone,
          churchName: newRegistration.churchName,
          willAttend: newRegistration.willAttend,
          hasCompanions: newRegistration.hasCompanions,
          companionsCount: newRegistration.companionsCount,
          totalPersonas: 1 + newRegistration.companionsCount, // 🔥 útil para frontend
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
     * 🔥 Obtener todos los registros
     */
  static getAll = async (_req: Request, res: Response) => {
    try {
      const registrations = await EventRegistration.findAll({
        order: [["id", "DESC"]],
      });

      return res.status(200).json({
        success: true,
        code: 200,
        total: registrations.length,
        data: registrations,
      });

    } catch (error) {
      console.error("ERROR getAll:", error);

      return res.status(500).json({
        success: false,
        code: 500,
        message: "Error al obtener registros",
      });
    }
  };
}