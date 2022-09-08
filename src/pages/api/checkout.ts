import type { NextApiHandler } from "next";
import { stripe } from "../../services/stripe";

const handler: NextApiHandler = async (request, response) => {
  if (request.method?.toUpperCase() !== "POST") {
    return response.status(404);
  }

  const priceId = "price_1LfZhICcg2xLuHEeoe2vtB2o";

  const checkoutSession = await stripe.checkout.sessions.create({
    cancel_url: process.env.NEXT_URL,
    success_url: `${process.env.NEXT_URL}/success`,
    mode: "payment",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  });

  return response.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
};

export default handler;
