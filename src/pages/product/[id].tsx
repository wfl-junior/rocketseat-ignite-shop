import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/future/image";
import Head from "next/head";
import { Fragment } from "react";
import Stripe from "stripe";
import { CartProduct, useCartContext } from "../../contexts/CartContext";
import { stripe } from "../../services/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";
import { formatPrice } from "../../utils/formatPrice";

interface Product extends CartProduct {
  description: string;
}

interface ProductProps {
  product: Product;
}

type ProductParams = {
  id: string;
};

export const getStaticPaths: GetStaticPaths<ProductParams> = async () => {
  const response = await stripe.products.list();

  return {
    fallback: "blocking",
    paths: response.data.map(product => ({
      params: {
        id: product.id,
      },
    })),
  };
};

export const getStaticProps: GetStaticProps<
  ProductProps,
  ProductParams
> = async ({ params }) => {
  try {
    const productId = params!.id;
    const product = await stripe.products.retrieve(productId, {
      expand: ["default_price"],
    });

    const defaultPrice = product.default_price as Stripe.Price;
    const price = (defaultPrice.unit_amount || 0) / 100;

    return {
      revalidate: 60 * 60, // 1 hour
      props: {
        product: {
          id: product.id,
          name: product.name,
          imageUrl: product.images[0],
          description: product.description || "",
          price,
          priceFormatted: formatPrice(price),
          defaultPriceId: defaultPrice.id,
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

const Product: NextPage<ProductProps> = ({ product }) => {
  const { addItem } = useCartContext();

  function handleAddToCart() {
    addItem({
      defaultPriceId: product.defaultPriceId,
      id: product.id,
      imageUrl: product.imageUrl,
      name: product.name,
      price: product.price,
      priceFormatted: product.priceFormatted,
    });
  }

  return (
    <Fragment>
      <Head>
        <title>{`${product.name} | Ignite Shop`}</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image
            src={product.imageUrl}
            width={520}
            height={480}
            alt={product.name}
            priority
          />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>

          <button onClick={handleAddToCart}>Colocar na sacola</button>
        </ProductDetails>
      </ProductContainer>
    </Fragment>
  );
};

export default Product;
