import Image from "next/future/image";
import Link from "next/link";
import { Handbag } from "phosphor-react";
import logo from "../../assets/logo.svg";
import { useCartDrawerContext } from "../../contexts/CartDrawerContext";
import { CartButton, HeaderContainer } from "./styles";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const { open } = useCartDrawerContext();

  return (
    <HeaderContainer>
      <Link href="/" prefetch={false}>
        <a>
          <Image src={logo} alt="Ignite Shop" />
        </a>
      </Link>

      <CartButton data-cart-items={1} onClick={open}>
        <Handbag size={24} weight="bold" />
      </CartButton>
    </HeaderContainer>
  );
};
