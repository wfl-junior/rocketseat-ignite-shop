import Image from "next/future/image";
import {
  CartItemContainer,
  ImageContainer,
  Info,
  Name,
  Price,
  RemoveFromCartButton,
} from "./styles";

interface CartItemProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  };
}

export const CartItem: React.FC<CartItemProps> = ({ product }) => (
  <CartItemContainer>
    <ImageContainer>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={102}
        height={93}
      />
    </ImageContainer>

    <Info>
      <Name>{product.name}</Name>
      <Price>{product.price}</Price>
      <RemoveFromCartButton>Remover</RemoveFromCartButton>
    </Info>
  </CartItemContainer>
);
