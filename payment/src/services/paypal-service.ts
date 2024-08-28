import { generateAccessToken } from "../utils/paypal-access-token";

export class PayPalService {
  private apiUrl: string;
  constructor() {
    this.apiUrl = process.env.PAYPAL_API_URL || "";
  }

  async createOrder(selectedPlan: string, PlanPrice: number) {
    const accessToken = await generateAccessToken();
    const response = await fetch(`${this.apiUrl}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "ILS",
              value: PlanPrice,
            },
            description: `Netflix ${selectedPlan} Plan`,
          },
        ],
      }),
    });
    return response.json();
  }

  async captureOrder(orderID: string) {
    const accessToken = await generateAccessToken();
    const response = await fetch(
      `${this.apiUrl}/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.json();
  }
}
