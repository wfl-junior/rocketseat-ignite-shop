import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Stripe from "stripe";
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
}

interface ProductProps {
  product: Product;
}

type ProductParams = {
  id: string;
};

export const getStaticProps: GetStaticProps<
  ProductProps,
  ProductParams
> = async ({ params }) => {
  const productId = params!.id;
  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  return {
    revalidate: 60 * 60, // 1 hour
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        description: product.description!,
        price: formatPrice(
          ((product.default_price as Stripe.Price).unit_amount || 0) / 100,
        ),
      },
    },
  };
};

const Product: NextPage<ProductProps> = ({ product }) => (
  <ProductContainer>
    <ImageContainer>
      <Image
        src={product.imageUrl}
        width={520}
        height={480}
        alt={product.name}
      />
    </ImageContainer>

    <ProductDetails>
      <h1>{product.name}</h1>
      <span>{product.price}</span>
      <p>{product.description}</p>
      <button>Comprar agora</button>
    </ProductDetails>
  </ProductContainer>
);

export default Product;
