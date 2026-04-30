import { Router } from "express";

import { MemberController } from "../controllers/MemberController";

const router = Router();

router.get('/', MemberController.getAll);
router.put("/:id/status", MemberController.toggleStatus);

export default router;