import app from "../../app"; // Adjust the path as necessary
import request from "supertest";
import { stripe } from "../../stripe";
import { subscriptionCreatedEvent } from "../../events/customers/customer-subscription-created";
import { subscriptionUpdatedEvent } from "../../events/customers/customer-subscription-updated";
import { subscriptionDeletedEvent } from "../../events/customers/customer-subscription-deleted";
import { invoicePaidEvent } from "../../events/invoice/invoice-paid";
import Stripe from "stripe";

interface MockEvent {
  id: string;
  object: string;
  type: string;
  data: {
    object: {
      id: string;
      customer: string;
    };
  };
}

// Mock the event handler functions
jest.mock("../../events/customers/customer-subscription-created");
jest.mock("../../events/customers/customer-subscription-updated");
jest.mock("../../events/customers/customer-subscription-deleted");
jest.mock("../../events/invoice/invoice-paid");

describe("POST /api/webhook", () => {
  let stripeEvent: MockEvent; // Explicitly type the variable

  beforeEach(() => {
    stripeEvent = {
      id: "evt_test",
      object: "event",
      type: "customer.subscription.created", // Example event type
      data: {
        object: {
          id: "sub_test",
          customer: "cus_test",
        },
      },
    };

    // Mock the stripe.webhooks.constructEvent method
    jest
      .spyOn(stripe.webhooks, "constructEvent")
      .mockImplementation(() => stripeEvent);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call subscriptionCreatedEvent when event type is customer.subscription.created", async () => {
    stripeEvent.type = "customer.subscription.created";

    await request(app)
      .post("/api/webhook")
      .set("stripe-signature", "test_signature")
      .send(stripeEvent)
      .expect(200);

    expect(subscriptionCreatedEvent).toHaveBeenCalledWith(stripeEvent);
  });

  it("should call subscriptionUpdatedEvent when event type is customer.subscription.updated", async () => {
    stripeEvent.type = "customer.subscription.updated";

    await request(app)
      .post("/api/webhook")
      .set("stripe-signature", "test_signature")
      .send(stripeEvent)
      .expect(200);

    expect(subscriptionUpdatedEvent).toHaveBeenCalledWith(stripeEvent);
  });

  it("should call invoicePaidEvent when event type is invoice.paid", async () => {
    stripeEvent.type = "invoice.paid";

    await request(app)
      .post("/api/webhook")
      .set("stripe-signature", "test_signature")
      .send(stripeEvent)
      .expect(200);

    expect(invoicePaidEvent).toHaveBeenCalledWith(stripeEvent);
  });

  it("should call subscriptionDeletedEvent when event type is customer.subscription.deleted", async () => {
    stripeEvent.type = "customer.subscription.deleted";

    await request(app)
      .post("/api/webhook")
      .set("stripe-signature", "test_signature")
      .send(stripeEvent)
      .expect(200);

    expect(subscriptionDeletedEvent).toHaveBeenCalledWith(stripeEvent);
  });

  it("should return 400 if the event is not properly constructed", async () => {
    jest.spyOn(stripe.webhooks, "constructEvent").mockImplementation(() => {
      throw new Error("Invalid signature");
    });

    await request(app)
      .post("/api/webhook")
      .set("stripe-signature", "invalid_signature")
      .send(stripeEvent)
      .expect(400);

    expect(subscriptionCreatedEvent).not.toHaveBeenCalled();
  });
});
