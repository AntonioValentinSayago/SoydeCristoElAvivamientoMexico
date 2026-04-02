import { Router } from "express";
import { QuestionsController } from "../controllers/QuestionsController";

const router = Router();

router.get('/', QuestionsController.getQuestionsAll )

router.post('/', QuestionsController.create)


export default router