import { invoicePaidEvent } from "../events/invoice/invoice-paid";
import { Request, Response } from "express";
import { stripe } from "../stripe";
import { subscriptionDeletedEvent } from "../events/customers/customer-subscription-deleted";
import { subscriptionUpdatedEvent } from "../events/customers/customer-subscription-updated";
import { subscriptionCreatedEvent } from "../events/customers/customer-subscription-created";

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
    case "customer.subscription.created":
      await subscriptionCreatedEvent(event);
      break;
    case "customer.subscription.updated":
      await subscriptionUpdatedEvent(event);
      break;
    case "invoice.paid":
      await invoicePaidEvent(event);
      break;
    case "customer.subscription.deleted":
      await subscriptionDeletedEvent(event);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
};
