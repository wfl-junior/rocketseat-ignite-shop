import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import type { GetStaticProps, NextPage } from "next";
import Image from "next/future/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../services/stripe";
import { HomeContainer, Product } from "../styles/pages/home";
import { formatPrice } from "../utils/formatPrice";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
}

interface HomeProps {
  products: Product[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map(
    (product): Product => ({
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: formatPrice(
        ((product.default_price as Stripe.Price).unit_amount || 0) / 100,
      ),
    }),
  );

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
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product => (
        <Link key={product.id} href={`/product/${product.id}`} passHref>
          <Product className="keen-slider__slide">
            <Image
              src={product.imageUrl}
              width={520}
              height={480}
              alt=""
              priority
            />

            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        </Link>
      ))}
    </HomeContainer>
  );
};

export default Home;
