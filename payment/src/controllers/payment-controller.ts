import { Request, Response, text } from "express";
import { stripe } from "../stripe";
import { subsriptionDeleted } from "../events/customers/customer-subscription-deleted";
import { checkoutSessionComplete } from "../events/checkout/checkout-session-completed";

const getPriceId = (plan: string): string => {
  switch (plan.toLocaleLowerCase()) {
    case "basic":
      return "price_1PmurrGI8xoArhccBp4XFfSF";
    case "standart":
      return "price_1PmurQGI8xoArhccL8JVD2CK";
    case "premium":
      return "price_1PmurgGI8xoArhccigmyfZ86";
    default:
      return "";
  }
};
export const createPayment = async (req: Request, res: Response) => {
  const plan = req.query.plan?.toString();
  if (!plan) {
    res.status(401).send("plan not found");
    return;
  }
  const priceid = getPriceId(plan);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: priceid, // Replace with your price ID
        quantity: 1,
      },
    ],
    success_url: `${process.env.BASE_URL}/sucsses?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.BASE_URL}/cancel`,
  });

  // Return the session ID
  console.log(session);
  res.status(204).json(session.id);
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
