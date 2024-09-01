import { Request, Response, text } from "express";
import { plans, stripe } from "../stripe";
import Stripe from "stripe";
import { ChangeSubscriptionProducer } from "../events/producers/change-subscription-producer";
import { kafkaWrapper } from "../kafka-wrapper";

export const createSubscription = async (req: Request, res: Response) => {
  const { plan, userId } = req.body;

  const customer = await stripe.customers.create({
    name: userId,
    metadata: {
      user_id: userId,
    },
  });
  const priceId = plans.find((p) => p.type === plan)!.priceId;
  const subscription: Stripe.Subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        price: priceId,
      },
    ],
    payment_behavior: "default_incomplete",
    payment_settings: {
      save_default_payment_method: "on_subscription",
      payment_method_types: ["card"],
    },
    expand: ["latest_invoice.payment_intent"],
  });

  const latestInvoice = subscription.latest_invoice as Stripe.Invoice;
  const paymentIntent = latestInvoice.payment_intent as Stripe.PaymentIntent;
  const clientSecret = paymentIntent.client_secret;

  await new ChangeSubscriptionProducer(kafkaWrapper.client).produce({
    id: userId,
    subscription: plan,
  });

  res.send({
    subscriptionId: subscription.id,
    clientSecret: clientSecret,
  });
};
export const getPublishKey = async (req: Request, res: Response) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
};
