// import type { Request, Response } from "express";
// import Shirts from "../models/shirtModel";

// export class ShirtController {
//     static getAll = async (_req: Request, _res: Response) => {
//         try {
//             const shirt = await Shirts.findAll({})
//             return _res.status(200).json({
//                 success: true,
//                 code: 200,
//                 data: shirt
//             });
//         } catch (error) {
//             _res.status(500).json({ error: 'Error Fatal, Verficar Conexion' })
//         }
//     }
//     static create = async (_req: Request, _res: Response) => {
//         try {
//             const shirt = new Shirts(_req.body);

//             await shirt.save();
//             _res.status(201).json('Successfully created t-shirt')

//         } catch (error) {
//             _res.status(500).json({ error: 'Error Fatal, Verficar Conexion' })
//         }
//     }
// }