import type { NextApiHandler } from "next";
import { stripe } from "../../services/stripe";

const handler: NextApiHandler = async (request, response) => {
  if (request.method?.toUpperCase() !== "POST") {
    return response.status(405).json({
      message: "This route only supports POST method.",
    });
  }

  try {
    const { priceId } = request.body;

    if (!priceId || typeof priceId !== "string") {
      return response.status(400).json({
        message: "priceId is a required field and must be a string.",
      });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      cancel_url: process.env.NEXT_URL,
      success_url: `${process.env.NEXT_URL}/success/{CHECKOUT_SESSION_ID}`,
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
  } catch (error) {
    console.log(error);

    return response
      .status(500)
      .json({ message: "Houston, we have a problem." });
  }
};

export default handler;
