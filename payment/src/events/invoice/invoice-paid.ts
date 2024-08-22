import Stripe from "stripe";
import { plans, stripe } from "../../stripe";
import { Subscriber } from "../../models/subscriber";
import { Order, OrderStatus } from "../../models/order";

export const invoicePaidEvent = async (event: Stripe.InvoicePaidEvent) => {
  const invoice = await stripe.invoices.retrieve(event.data.object.id);
  const stripeId = invoice.customer as string;
  const customer = (await stripe.customers.retrieve(
    stripeId
  )) as Stripe.Response<Stripe.Customer>;
  if (!customer) throw Error("cant find customer");
  const user = await Subscriber.findOne({ stripeId });
  if (!user) throw Error("cant find user");
  const order = await Order.findOne({ _id: user.orderId });
  if (!order) throw Error("cant find order");
  order.status = OrderStatus.Completed;
  await order.save();
};
