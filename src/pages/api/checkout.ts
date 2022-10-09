import type { NextApiHandler } from "next";
import * as yup from "yup";
import { stripe } from "../../services/stripe";

const checkoutValidationSchema = yup.object({
  priceIds: yup.array().of(yup.string().required()).required(),
});

const handler: NextApiHandler = async (request, response) => {
  if (request.method?.toUpperCase() !== "POST") {
    return response.status(405).json({
      message: "This route only supports POST method.",
    });
  }

  try {
    const { priceIds } = await checkoutValidationSchema.validate(request.body);

    const checkoutSession = await stripe.checkout.sessions.create({
      cancel_url: process.env.NEXT_URL,
      success_url: `${process.env.NEXT_URL}/success/{CHECKOUT_SESSION_ID}`,
      mode: "payment",
      line_items: priceIds.map(priceId => ({
        price: priceId,
        quantity: 1,
      })),
    });

    return response.status(201).json({
      checkoutUrl: checkoutSession.url,
    });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return response.status(400).json({
        message: error.message,
        errors: error.inner.map(validationError => ({
          path: validationError.path || null,
          message: validationError.message,
        })),
      });
    }

    console.log(error);

    return response
      .status(500)
      .json({ message: "Houston, we have a problem." });
  }
};

export default handler;
