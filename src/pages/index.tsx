import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import Stripe from "stripe";
import { ProductCard } from "../components/ProductCard";
import { CartProduct } from "../contexts/CartContext";
import { stripe } from "../services/stripe";
import { HomeContainer } from "../styles/pages/home";
import { formatPrice } from "../utils/formatPrice";

interface HomeProps {
  products: CartProduct[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product): CartProduct => {
    const defaultPrice = product.default_price as Stripe.Price;
    const price = (defaultPrice.unit_amount || 0) / 100;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price,
      priceFormatted: formatPrice(price),
      defaultPriceId: defaultPrice.id,
    };
  });

  return {
    revalidate: 60 * 60 * 2, // 2 hours
    props: { products },
  };
};

const Home: NextPage<HomeProps> = ({ products }) => {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <Fragment>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </HomeContainer>
    </Fragment>
  );
};

export default Home;
