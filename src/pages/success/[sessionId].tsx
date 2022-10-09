import type { GetServerSideProps, NextPage } from "next";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import {
  ImageContainer,
  ImagesContainer,
  SuccessContainer,
} from "../../styles/pages/success";

interface SuccessProps {
  customerName: string;
  products: Array<{
    id: string;
    name: string;
    imageUrl: string;
  }>;
}

export const getServerSideProps: GetServerSideProps<
  SuccessProps,
  { sessionId: string }
> = async ({ params }) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(params!.sessionId, {
      expand: ["line_items", "line_items.data.price.product"],
    });

    const products = session.line_items!.data.map(item => {
      const product = item.price!.product as Stripe.Product;

      return {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
      };
    });

    return {
      props: {
        customerName: session.customer_details!.name!,
        products,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

const Success: NextPage<SuccessProps> = ({ customerName, products }) => (
  <Fragment>
    <Head>
      <title>Compra efetuada | Ignite Shop</title>
      <meta name="robots" content="noindex" />
    </Head>

    <SuccessContainer>
      <ImagesContainer>
        {products.map(product => (
          <ImageContainer key={product.id}>
            <Image
              src={product.imageUrl}
              width={120}
              height={110}
              alt={product.name}
              priority
            />
          </ImageContainer>
        ))}
      </ImagesContainer>

      <h1>Compra efetuada!</h1>

      <p>
        Uhuul <strong>{customerName}</strong>, sua compra de {products.length}{" "}
        camiseta{products.length !== 1 && "s"} já está a caminho da sua casa.
      </p>

      <Link href="/">Voltar ao catálogo</Link>
    </SuccessContainer>
  </Fragment>
);

export default Success;
