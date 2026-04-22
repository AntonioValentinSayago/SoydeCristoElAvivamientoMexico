// import type { Request, Response } from "express";
// import EventRegistration from "../models/shirtModel";

// export class QuestionsController {
//     static getQuestionsAll = async (_req: Request, _res: Response) => {
//         try {
//             const questions = await EventRegistration.findAll({
//                 order: [["id", "ASC"]],
//             });

//             return _res.status(200).json({
//                 success: true,
//                 code: 200,
//                 data: questions,
//             });
//         } catch (error) {
//             console.error("Error getting questions:", error);
//             return _res.status(500).json({
//                 success: false,
//                 code: 500,
//                 message: "Error Fatal, Verificar Conexion",
//             });
//         }
//     };

//     static create = async (_req: Request, _res: Response) => {
//         try {
//             const { questions } = _req.body;

//             if (!Array.isArray(questions)) {
//                 return _res.status(400).json({
//                     success: false,
//                     message: "questions debe ser un arreglo",
//                 });
//             }

//             const createdQuestions = await EventRegistration.bulkCreate(questions, {
//                 validate: true,
//             });

//             return _res.status(201).json({
//                 success: true,
//                 code: 201,
//                 total: createdQuestions.length,
//                 data: createdQuestions,
//             });
//         } catch (error: any) {
//             console.error("bulk create questions error:", error);
//             return _res.status(500).json({
//                 success: false,
//                 message: error.message || "Error Fatal, Verificar Conexion",
//                 errors: error.errors?.map((e: any) => e.message) ?? [],
//             });
//         }
//     }
// }