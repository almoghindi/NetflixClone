import Stripe from "stripe";
import { plans, stripe } from "../../stripe";
import { Subscriber } from "../../models/subscriber";
import { Order, OrderStatus } from "../../models/order";

export const checkoutSessionComplete = async (
  event: Stripe.CheckoutSessionCompletedEvent
) => {
  const session = await stripe.checkout.sessions.retrieve(
    event.data.object.id,
    {
      expand: ["line_items"],
    }
  );
  const stripeId = session.customer as string;
  const customer = (await stripe.customers.retrieve(
    stripeId
  )) as Stripe.Response<Stripe.Customer>;

  const priceId = session?.line_items?.data[0].price?.id;
  const plan = plans.find((p) => p.priceId === priceId);
  if (!plan) throw Error("plant doest found");
  let user;
  if (!customer.deleted) {
    user = await Subscriber.findOne({ stripeId });
    const newOrder = Order.build({
      userId: customer.id,
      price: plan.price,
      status: OrderStatus.Completed,
    });
    await newOrder.save();

    if (!user) {
      user = Subscriber.build({
        stripeId,
        orderId: newOrder.id,
        subscription: plan.type,
      });

      await user.save();
    }
  } else {
    throw new Error("No user Found");
  }
};
