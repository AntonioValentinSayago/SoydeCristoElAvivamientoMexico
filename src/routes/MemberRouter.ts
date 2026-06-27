import { Router } from "express";

import { MemberController } from "../controllers/MemberController";

const router = Router();

router.get('/', MemberController.getAll);

router.patch(
    "/member/:id/toggle-coverage",
    MemberController.toggleCoverage
);

router.get("/member/:id", MemberController.getProfile);
router.post("/member", MemberController.createMember);

export default router;