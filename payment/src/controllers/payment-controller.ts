import { Request, Response, text } from "express";
import { plans, stripe } from "../stripe";
import { subsriptionDeleted } from "../events/customers/customer-subscription-deleted";
import { checkoutSessionComplete } from "../events/checkout/checkout-session-completed";
import Stripe from "stripe";
import { Subscriber } from "../models/subscriber";

export const createSubscription = async (req: Request, res: Response) => {
  const customer = await stripe.customers.create({
    name: req.body.name,
    email: req.body.email,
    payment_method: req.body.paymentMethod,
    invoice_settings: {
      default_payment_method: req.body.paymentMethod,
    },
  });
  const priceId = req.body.priceId;
  const subscription: Stripe.Subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        price: priceId,
      },
    ],
    payment_behavior: "default_incomplete",
    payment_settings: { save_default_payment_method: "on_subscription" },
    expand: ["latest_invoice.payment_intent"],
  });

  const latestInvoice = subscription.latest_invoice as Stripe.Invoice;
  const paymentIntent = latestInvoice.payment_intent as Stripe.PaymentIntent;
  const clientSecret = paymentIntent.client_secret;
  res.send({
    subscriptionId: subscription.id,
    clientSecret: clientSecret,
  });
  console.log(req.body);
};

export const getPublishKey = async (req: Request, res: Response) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
};
export const webhookEvent = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];
  const webhookKey = process.env.STRIPE_WEBHOOK_SECRET!;
  const body = req.body;
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig!, webhookKey);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).send(`Webhook Error: ${err.message}`);
    } else {
      res.status(400).send(`Webhook Error: Unknown error occurred`);
    }
    return;
  }
  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      await checkoutSessionComplete(event);
      break;
    case "customer.subscription.deleted":
      await subsriptionDeleted(event);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
};
