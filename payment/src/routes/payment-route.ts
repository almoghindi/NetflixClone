import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { createPayment, webhookEvent } from "../controllers/payment-controller";
const router: Router = Router();

router.post("/", expressAsyncHandler(createPayment));
router.post(
  "/webhook",

  expressAsyncHandler(webhookEvent)
);
export default router;
