import type { Request, Response } from "express";
import { Member } from "../models/MemberModel";

export class MemberController {
    /**
     * Obtener todos los miembros
     */
    static getAll = async (_req: Request, res: Response) => {
        try {
            const members = await Member.findAll();
            return res.status(200).json({
                success: true,
                code: 200,
                data: members,
            });
        } catch (error) {
            console.error("GET ALL MEMBERS ERROR:", error);

            return res.status(500).json({
                success: false,
                code: 500,
                message: "Error al obtener los miembros",
            });
        }
    };
    /**
     * Cambiar estado de cobertura del miembro
     */
    static toggleCoverage = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            const memberId = Number(req.params.id);

            if (!Number.isInteger(memberId) || memberId <= 0) {
                return res.status(400).json({
                    success: false,
                    code: 400,
                    message: "El ID del miembro es inválido",
                });
            }

            const member = await Member.findOne({
                where: { id: memberId },
            });

            if (!member) {
                return res.status(404).json({
                    success: false,
                    code: 404,
                    message: "Miembro no encontrado",
                });
            }

            const currentCoverage =
                member.getDataValue("cobertura");
            const newCoverage = !currentCoverage;

            console.log({
                id: member.id,
                coberturaActual: member.cobertura,
            });
            console.log(member.toJSON());
            console.log(member.dataValues);

            await member.update({
                cobertura: newCoverage,
            });

            console.log({
                nuevaCobertura: newCoverage,
            });
            return res.status(200).json({
                success: true,
                code: 200,
                message: newCoverage
                    ? "Miembro reactivado correctamente"
                    : "Miembro deshabilitado correctamente",
                data: {
                    id: member.id,
                    nombreCompleto: `${member.nombres} ${member.apellido_paterno} ${member.apellido_materno}`,
                    cobertura: newCoverage,
                    updatedAt: new Date(),
                },
            });

        } catch (error) {
            console.error("MEMBER TOGGLE COVERAGE ERROR:", error);

            return res.status(500).json({
                success: false,
                code: 500,
                message: "Error interno del servidor",
            });
        }
    };

    /** Detalle del perfil de cada miembro de la iglesia */
    static getProfile = async (req: Request, res: Response) => {
        try {
            const memberId = Number(req.params.id);

            if (!Number.isInteger(memberId) || memberId <= 0) {
                return res.status(400).json({
                    success: false,
                    code: 400,
                    message: "El ID del miembro es inválido",
                });
            }

        /** Buscar el miembro por su ID y devolver su perfil completo */
        const member = await Member.findOne({
            where: { id: memberId },
        });

        if (!member) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: "Miembro no encontrado",
            });
        }

        return res.status(200).json({
            success: true,
            code: 200,
            data: member,
        });
        } catch (error) {
            return res.status(500).json({
                success: false,
                code: 500,
                message: "Error interno del servidor",
            });
        }
    };
}