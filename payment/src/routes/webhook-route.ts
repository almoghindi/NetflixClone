import { Router, raw } from "express";
import expressAsyncHandler from "express-async-handler";
import { webhookEvent } from "../controllers/webhook-controller";
const router: Router = Router();

router.post("/", expressAsyncHandler(webhookEvent));

export default router;
