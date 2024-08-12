import { Request, Response } from "express";
import { stripe } from "../stripe";

export const createPayment = async (req: Request, tes: Response) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "Subscription " },
          unit_amount: 50 * 100,
        },
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: "http://localhost:3004/complete",
    cancel_url: "http://localhost:3004/cancel",
  });
};
