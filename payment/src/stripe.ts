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
    priceId: "price_1PpwwMGI8xoArhcckSGICyTL",
    price: 10,
    duration: "/month",
  },

  {
    type: SubscriptionType.STANDARD,
    priceId: "price_1PpwweGI8xoArhcct9iyJoiM",
    price: 20,
    duration: "/month",
  },
  {
    type: SubscriptionType.PREMIUM,
    priceId: "price_1PpwxAGI8xoArhccpY5Ofz0Q",
    price: 30,
    duration: "/month",
  },
];
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});
