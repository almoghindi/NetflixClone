import SubscriptionPayPal from "../models/subscription-paypal";
import { ISubscription } from "../interfaces/subscription-interface";


export class SubscriptionService {

    async createSubscription(subscription: ISubscription) {
        const newSubscription = new SubscriptionPayPal(subscription);
        await newSubscription.save();
    }

    async updateSubscription(orderId: string, subscription: string) {
        await SubscriptionPayPal.findOneAndUpdate(
            { orderId },
            { subscription },
            { new: true });
    }
}