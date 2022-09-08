import type { GetServerSideProps, NextPage } from "next";
import Image from "next/future/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { ImageContainer, SuccessContainer } from "../../styles/pages/success";

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}

export const getServerSideProps: GetServerSideProps<
  SuccessProps,
  { sessionId: string }
> = async ({ params }) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(params!.sessionId, {
      expand: ["line_items", "line_items.data.price.product"],
    });

    const product = session.line_items!.data[0].price!
      .product as Stripe.Product;

    return {
      props: {
        customerName: session.customer_details!.name!,
        product: {
          name: product.name,
          imageUrl: product.images[0],
        },
      },
    };
  } catch (error) {
    console.log(error);

    return {
      notFound: true,
    };
  }
};

const Success: NextPage<SuccessProps> = ({ customerName, product }) => (
  <SuccessContainer>
    <h1>Compra efetuada!</h1>

    <ImageContainer>
      <Image
        src={product.imageUrl}
        width={120}
        height={110}
        alt={product.name}
        priority
      />
    </ImageContainer>

    <p>
      Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong>{" "}
      já está a caminho da sua casa.
    </p>

    <Link href="/">Voltar ao catálogo</Link>
  </SuccessContainer>
);

export default Success;
