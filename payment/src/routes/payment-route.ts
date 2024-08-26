import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import {
  getPublishKey,
  createSubscription,
} from "../controllers/payment-controller";
import { PayPalService } from "../services/paypal-service";
import { SubscriptionService } from "../services/subscription-service";
import { PayPalController } from "../controllers/paypal-payment-controller";

const router: Router = Router();
const paypalService = new PayPalService();
const subscriptionService = new SubscriptionService();
const paypalController = new PayPalController(paypalService, subscriptionService);

router.get("/config", expressAsyncHandler(getPublishKey));
router.post("/create-subscription", expressAsyncHandler(createSubscription));


router.post('/create-paypal-order', expressAsyncHandler(paypalController.createPayPalOrder));
router.post('/capture-paypal-order', expressAsyncHandler(paypalController.capturePayPalOrder));


export default router;
