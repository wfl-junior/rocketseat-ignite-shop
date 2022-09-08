import type { NextPage } from "next";
import Image from "next/future/image";
import camiseta1 from "../assets/camisetas/1.png";
import camiseta2 from "../assets/camisetas/2.png";
import { HomeContainer, Product } from "../styles/pages/home";
// import camiseta3 from '../assets/camisetas/3.png';

const Home: NextPage = () => (
  <HomeContainer>
    <Product>
      <Image src={camiseta1} width={520} height={480} alt="" priority />

      <footer>
        <strong>Camiseta X</strong>
        <span>R$ 79,90</span>
      </footer>
    </Product>

    <Product>
      <Image src={camiseta2} width={520} height={480} alt="" priority />

      <footer>
        <strong>Camiseta X</strong>
        <span>R$ 79,90</span>
      </footer>
    </Product>
  </HomeContainer>
);

export default Home;
