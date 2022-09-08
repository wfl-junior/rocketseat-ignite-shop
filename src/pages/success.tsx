import type { NextPage } from "next";
import Image from "next/future/image";
import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

const Success: NextPage = () => (
  <SuccessContainer>
    <h1>Compra efetuada!</h1>

    <ImageContainer>
      <Image
        src="https://files.stripe.com/links/MDB8YWNjdF8xTGZaWUVDY2cyeEx1SEVlfGZsX3Rlc3RfMkNSTWhTOG1SdUtRTEEwYzFpNWwxTzNn0025K9S1We"
        width={130}
        height={145}
        alt=""
        priority
      />
    </ImageContainer>

    <p>
      Uhuul <strong>Diego Fernandes</strong>, sua{" "}
      <strong>Camiseta Beyond the Limits </strong> já está a caminho da sua
      casa.
    </p>

    <Link href="/">Voltar ao catálogo</Link>
  </SuccessContainer>
);

export default Success;
