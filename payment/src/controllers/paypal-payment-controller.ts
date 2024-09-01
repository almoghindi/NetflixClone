import SubscriptionPayPal from "../models/subscription-paypal";
import { generateAccessToken } from "../utils/paypal-access-token";
import { Request, Response } from "express";
import { ISubscription } from "../interfaces/subscription-interface";
import { PayPalService } from "../services/paypal-service";
import { SubscriptionService } from "../services/subscription-service";
import { ChangeSubscriptionProducer } from "../events/producers/change-subscription-producer";
import { kafkaWrapper } from "../kafka-wrapper";

interface ICreateOrderRequest {
  selectedPlan: string;
  PlanPrice: string;
  userId: string;
}

interface ICaptureOrderRequest {
  orderID: string;
  selectedPlan: string;
  PlanPrice: string;
}

export class PayPalController {
  constructor(
    private paypalService = new PayPalService(),
    private subscriptionService = new SubscriptionService()
  ) {}

  createPayPalOrder = async (req: Request, res: Response): Promise<void> => {
    const { selectedPlan, PlanPrice, userId } = req.body as ICreateOrderRequest;
    const order = await this.paypalService.createOrder(
      selectedPlan,
      Number(PlanPrice)
    );

    const subscription: ISubscription = {
      userId,
      orderId: order.id,
      subscription: selectedPlan,
      subscriptionPrice: Number(PlanPrice),
    };

    await this.subscriptionService.createSubscription(subscription);

    await new ChangeSubscriptionProducer(kafkaWrapper.client).produce({
      id: userId,
      subscription: selectedPlan,
    });

    res.json(order);
  };

  capturePayPalOrder = async (req: Request, res: Response): Promise<void> => {
    const { orderID, selectedPlan, PlanPrice } =
      req.body as ICaptureOrderRequest;

    const captureData = await this.paypalService.captureOrder(orderID);

    if (captureData.status === "COMPLETED") {
      await this.subscriptionService.updateSubscription(orderID, selectedPlan);
    }

    res.json(captureData);
  };
}
