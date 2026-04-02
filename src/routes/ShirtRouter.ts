import { Router } from "express";
import { ShirtController } from "../controllers/ShirtController";

const router = Router();

router.get('/', ShirtController.getAll )

export default router