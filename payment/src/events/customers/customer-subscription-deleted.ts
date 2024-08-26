import Stripe from "stripe";
import { stripe } from "../../stripe";
import { Subscriber, SubscriptionType } from "../../models/subscriber";
import { Order, OrderStatus } from "../../models/order";

export const subscriptionDeletedEvent = async (
  event: Stripe.CustomerSubscriptionDeletedEvent
) => {
  const subscription = await stripe.subscriptions.retrieve(
    event.data.object.id
  );
  const stripeId = subscription.customer as string;
  const customer = (await stripe.customers.retrieve(
    stripeId
  )) as Stripe.Response<Stripe.Customer>;
  if (!customer) throw Error("cant find customer");
  if (subscription.status !== "active") {
    let user = await Subscriber.findOne({ stripeId: stripeId });
    if (!user) throw Error("cant find user");
    user.subscription = SubscriptionType.EXPIRED;
    const order = await Order.findById({ _id: user.orderId });
    if (!order) throw Error("cant find order {Delete}");
    order.status = OrderStatus.Canceled;
    await user.save();
    await order.save();
  } else {
    throw Error("subscription is active");
  }
};
