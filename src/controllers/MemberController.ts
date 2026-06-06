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
      * Crear miembro
      */
    static create = async (req: Request, res: Response) => {
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

            // =========================
            // 🧠 VALIDACIONES BÁSICAS
            // =========================

            if (!nombres || !apellido_paterno || !apellido_materno) {
                return res.status(400).json({
                    success: false,
                    message: "Nombre y apellidos son obligatorios",
                });
            }

            if (!edad || edad <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Edad inválida",
                });
            }

            if (!fecha_nacimiento) {
                return res.status(400).json({
                    success: false,
                    message: "Fecha de nacimiento requerida",
                });
            }

            if (!correo) {
                return res.status(400).json({
                    success: false,
                    message: "Correo requerido",
                });
            }

            if (!telefono) {
                return res.status(400).json({
                    success: false,
                    message: "Teléfono requerido",
                });
            }

            // =========================
            // 🔒 VALIDACIÓN DE DUPLICADOS
            // =========================

            const existingMember = await Member.findOne({
                where: {
                    nombres,
                    apellido_paterno,
                    apellido_materno,
                },
            });

            if (existingMember) {
                return res.status(409).json({
                    success: false,
                    message: "Ya existe un miembro con el mismo nombre completo",
                });
            }

            // =========================
            // 🧼 NORMALIZACIÓN
            // =========================

            const normalizeArray = (value: any) =>
                Array.isArray(value) ? value : [];

            // =========================
            // 🧱 CREACIÓN
            // =========================

            const newMember = await Member.create({
                nombres: nombres.trim(),
                apellido_paterno: apellido_paterno.trim(),
                apellido_materno: apellido_materno.trim(),
                edad,
                curp: curp || null,
                fecha_nacimiento,
                bautizado: Boolean(bautizado),
                nivel_academico,
                fecha_conversion,
                ocupacion,
                cursos: normalizeArray(cursos),
                iglesia_anterior,
                razon_salida,
                talentos_json: normalizeArray(talentos_json),
                correo: correo.toLowerCase(),
                telefono,
                tipo_sangre: tipo_sangre || null,
                estado_civil,
                genero,
                ministerios_json: normalizeArray(ministerios_json),
                cobertura: cobertura ?? true,
                created_at: new Date(),
            });

            return res.status(201).json({
                success: true,
                message: "Miembro creado correctamente",
                data: newMember,
            });

        } catch (error) {
            console.error("CREATE MEMBER ERROR:", error);

            return res.status(500).json({
                success: false,
                message: "Error al crear el miembro",
            });
        }
    };

    /**
     * Actualizar miembro
     */
    static update = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);

            const member = await Member.findByPk(id);

            if (!member) {
                return res.status(404).json({
                    success: false,
                    code: 404,
                    message: "Miembro no encontrado",
                });
            }

            await member.update(req.body);

            return res.status(200).json({
                success: true,
                code: 200,
                message: "Miembro actualizado correctamente",
                data: member,
            });
        } catch (error) {
            console.error("UPDATE MEMBER ERROR:", error);

            return res.status(500).json({
                success: false,
                code: 500,
                message: "Error al actualizar el miembro",
            });
        }
    };

    /**
     * Cambiar estado de cobertura del miembro
     * true  -> false (Deshabilitar)
     * false -> true  (Reactivar)
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

            const currentCoverage = member.cobertura;
            const newCoverage = !currentCoverage;

            await member.update({
                cobertura: newCoverage,
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
}