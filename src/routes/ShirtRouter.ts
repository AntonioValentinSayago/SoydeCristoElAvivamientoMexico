import { Router } from "express";
import { body } from "express-validator";
import { ShirtController } from "../controllers/ShirtController";

const router = Router();

router.get('/', ShirtController.getAll )

/**
 * Controller Create Shirt
 */
router.post('/', 
    body('name')
        .notEmpty().withMessage('El nombre de la playera no puede ir Vacio'),
    ShirtController.create 
)


export default router