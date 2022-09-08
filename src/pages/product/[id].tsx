import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/future/image";
import { useState } from "react";
import Stripe from "stripe";
import { api } from "../../services/api";
import { stripe } from "../../services/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";
import { formatPrice } from "../../utils/formatPrice";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  description: string;
  defaultPriceId: string;
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

    return {
      revalidate: 60 * 60, // 1 hour
      props: {
        product: {
          id: product.id,
          name: product.name,
          imageUrl: product.images[0],
          description: product.description || "",
          price: formatPrice((defaultPrice.unit_amount || 0) / 100),
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
  const [isLoading, setIsLoading] = useState(false);

  async function handleCheckout() {
    setIsLoading(true);

    try {
      const { data } = await api.post<{ checkoutUrl: string }>("/checkout", {
        priceId: product.defaultPriceId,
      });

      window.location.href = data.checkoutUrl;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      alert("Falha ao redirecionar ao checkout!");
    }
  }

  return (
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

        <button onClick={handleCheckout} disabled={isLoading}>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  );
};

export default Product;
