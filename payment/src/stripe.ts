import Stripe from "stripe";
import { SubscriptionType } from "./models/subscriber";
interface Plan {
  type: SubscriptionType;
  priceId: string;
  price: number;
  duration: string;
}
export const plans: Plan[] = [
  {
    type: SubscriptionType.BASIC,
    priceId: "price_1Pok39GI8xoArhccOPaECA5T",
    price: 10,
    duration: "/month",
  },

  {
    type: SubscriptionType.STANDART,
    priceId: "price_1Pok5pGI8xoArhccVVtQHcp1",
    price: 20,
    duration: "/month",
  },
  {
    type: SubscriptionType.PREMIUM,
    priceId: "price_1Pok64GI8xoArhccm2Je21x9",
    price: 30,
    duration: "/month",
  },
];
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});
