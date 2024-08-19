import Stripe from "stripe";
import { stripe } from "../../stripe";
import { Subscriber, SubscriptionType } from "../../models/subscriber";

export const subsriptionDeleted = async (
  event: Stripe.CustomerSubscriptionDeletedEvent
) => {
  const subscription = await stripe.subscriptions.retrieve(
    event.data.object.id
  );

  const customer = await Subscriber.findOne({
    stripeId: subscription.customer,
  });
  if (!customer) throw Error("cant find customer");
  customer.subscription = SubscriptionType.EXPIRED;
  await customer.save();
};
