import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {apiVersion: "2020-08-27"});

type PaymentIntentCreateResponse = {
    client_secret: string | null,
    id: string,
};

type ErrorResponse = {
    message: string
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PaymentIntentCreateResponse | ErrorResponse>
) {
    const {
        body,
        method,
    } = req;

    switch (method) {
        case 'POST':
            const {amount, userId} = body;
            if (!amount || !userId) {
                return res.status(400).json({message: 'Missing amount or user'});
            }
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: "USD",
                metadata: { userId },
                payment_method_types: ["card"],
            });
            return res.status(200).json(paymentIntent);
        default:
            return res.status(422).json({message: 'Wrong endpoint'});
    }
}