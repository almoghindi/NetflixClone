import Stripe from "stripe";
import app from "../../app"; // Adjust the path as necessary
import request from "supertest";
import { stripe } from "../../stripe";

jest.mock("../../stripe", () => ({
  stripe: {
    customers: {
      create: jest.fn(),
    },
    subscriptions: {
      create: jest.fn(),
    },
  },
}));
describe("POST /api/payment/create-subscription", function () {
  it("should create a new subscription and return subscriptionId and clientSecret", async () => {
    const mockSubscription = {
      id: "sub_test",
      latest_invoice: {
        payment_intent: {
          client_secret: "secret_test",
        },
      },
    };

    const mockCustomer = {
      id: "cus_test",
    };

    // Explicitly mock the behavior of the methods
    (stripe.customers.create as jest.Mock).mockResolvedValue(mockCustomer);
    (stripe.subscriptions.create as jest.Mock).mockResolvedValue(
      mockSubscription
    );

    const response = await request(app)
      .post("/api/payment/create-subscription")
      .send({ plan: "STANDART", userId: "TEST" })
      .expect(200);

    // Expect the response to have subscriptionId and clientSecret
    expect(response.body).toHaveProperty("subscriptionId", "sub_test");
    expect(response.body).toHaveProperty("clientSecret", "secret_test");
  });
});

describe("GET /api/payment/publish-key", function () {
  it("should return the publishable key", async () => {
    process.env.STRIPE_PUBLISHABLE_KEY = "pk_test_123456789";

    const response = await request(app)
      .get("/api/payment/publish-key")
      .expect(200);

    // Expect the response to contain the publishable key
    expect(response.body).toHaveProperty("publishableKey", "pk_test_123456789");
  });
});
