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

    /** Controller for member-related operations */
    static async createMember(req: Request, res: Response): Promise<Response> {
        try {
            const {
                nombres,
                apellido_paterno,
                apellido_materno,
                edad,
                curp,
                fecha_nacimiento,
                bautizado,
                nivel_academico,
                fecha_conversion,
                ocupacion,
                cursos,
                iglesia_anterior,
                razon_salida,
                talentos_json,
                correo,
                telefono,
                tipo_sangre,
                estado_civil,
                genero,
                ministerios_json,
                cobertura
            } = req.body;

            // Validaciones básicas de los datos recibidos
            if (
                !nombres ||
                !apellido_paterno ||
                !apellido_materno ||
                !telefono ||
                !fecha_nacimiento
            ) {

                return res.status(400).json({
                    success: false,
                    message: "Los campos obligatorios son requeridos."
                });

            }

            /** Correo Repetido */
            if (correo) {
                const emailExists = await Member.findOne({
                    where: { correo }
                });

                if (emailExists) {

                    return res.status(409).json({
                        success: false,
                        message: "El correo ya se encuentra registrado."
                    });

                }

            }

            // ? Se validara el Telefono Repetido y el CURP Repetido
            const member = await Member.create({

                nombres,
                apellido_paterno,
                apellido_materno,
                edad,
                curp,
                fecha_nacimiento,
                bautizado,
                nivel_academico,
                fecha_conversion,
                ocupacion,
                cursos,
                iglesia_anterior,
                razon_salida,
                talentos_json,
                correo,
                telefono,
                tipo_sangre,
                estado_civil,
                genero,
                ministerios_json,
                cobertura: cobertura ?? true
            });

            return res.status(201).json({
                success: true,
                code: 201,
                message: "Miembro registrado correctamente.",
                data: member

            });

        } catch (error) {
            console.error("CREATE MEMBER ERROR:", error);
            return res.status(500).json({
                success: false,
                code: 500,
                message: "Error interno del servidor",
            });
        }

    }
}

