import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import {
  getPublishKey,
  createSubscription,
} from "../controllers/payment-controller";
const router: Router = Router();

router.get("/config", expressAsyncHandler(getPublishKey));
router.post("/create-subscription", expressAsyncHandler(createSubscription));

export default router;
