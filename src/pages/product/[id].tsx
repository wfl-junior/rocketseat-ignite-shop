import type { NextPage } from "next";
import Image from "next/image";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";

const Product: NextPage = () => (
  <ProductContainer>
    <ImageContainer>
      <Image
        src="https://files.stripe.com/links/MDB8YWNjdF8xTGZaWUVDY2cyeEx1SEVlfGZsX3Rlc3RfZjhOTVdRMXJFWm9WVDhXMDdTNG5YR3pI00PzaIN1BF"
        width={520}
        height={480}
        alt=""
      />
    </ImageContainer>

    <ProductDetails>
      <h1>Camiseta X</h1>
      <span>R$ 79,90</span>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa alias, at
        laborum magni, provident similique laboriosam nihil corrupti expedita
        explicabo ducimus, odio id exercitationem consequatur soluta amet atque
        sapiente inventore!
      </p>

      <button>Comprar agora</button>
    </ProductDetails>
  </ProductContainer>
);

export default Product;
