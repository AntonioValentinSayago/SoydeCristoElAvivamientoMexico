import { Router } from "express";
import { EventRegistrationController } from "../controllers/RegisterController"

const router = Router();

router.post('/', EventRegistrationController.create)
router.get("/consulta", EventRegistrationController.getAll);


export default router