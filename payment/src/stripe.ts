import Stripe from "stripe";
import { SubscriptionType } from "./models/subscriber";
interface Plan {
  type: SubscriptionType;
  link: string;
  priceId: string;
  price: number;
  duration: string;
}
export const plans: Plan[] = [
  {
    type: SubscriptionType.BASIC,
    link: "https://buy.stripe.com/test_bIYcOAdiW9Gg5xu9AA",
    priceId: "price_1PmurrGI8xoArhccBp4XFfSF",
    price: 10,
    duration: "/month",
  },

  {
    type: SubscriptionType.STANDART,
    link: "https://buy.stripe.com/test_bIY5m85Qu5q0cZW28a",
    priceId: "price_1PmurQGI8xoArhccL8JVD2CK",
    price: 20,
    duration: "/month",
  },
  {
    type: SubscriptionType.PREMIUM,
    link: "https://buy.stripe.com/test_8wM3e01AecSs8JGdQR",
    priceId: "price_1PmurgGI8xoArhccigmyfZ86",
    price: 30,
    duration: "/month",
  },
];
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});
