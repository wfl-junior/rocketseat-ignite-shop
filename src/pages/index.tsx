import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/future/image";
import Stripe from "stripe";
import { stripe } from "../services/stripe";
import { HomeContainer, Product } from "../styles/pages/home";
import { formatPrice } from "../utils/formatPrice";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  priceFormatted: string;
}

interface HomeProps {
  products: Product[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product): Product => {
    const price =
      ((product.default_price as Stripe.Price).unit_amount || 0) / 100;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price,
      priceFormatted: formatPrice(price),
    };
  });

  return {
    props: {
      products,
    },
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
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product => (
        <Product key={product.id} className="keen-slider__slide">
          <Image
            src={product.imageUrl}
            width={520}
            height={480}
            alt=""
            priority
          />

          <footer>
            <strong>{product.name}</strong>
            <span>{product.priceFormatted}</span>
          </footer>
        </Product>
      ))}
    </HomeContainer>
  );
};

export default Home;
