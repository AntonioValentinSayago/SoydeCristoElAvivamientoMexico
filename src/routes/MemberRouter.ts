import { Router } from "express";

import { MemberController } from "../controllers/MemberController";

const router = Router();

router.get('/', MemberController.getAll);

router.patch(
    "/members/:id/toggle-coverage",
    MemberController.toggleCoverage
);

export default router;