import Image from "next/future/image";
import { CartProduct, useCartContext } from "../../contexts/CartContext";
import {
  CartItemContainer,
  ImageContainer,
  Info,
  Name,
  Price,
  RemoveFromCartButton,
} from "./styles";

interface CartItemProps {
  product: CartProduct;
}

export const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const { removeItem } = useCartContext();

  function handleRemoveItem() {
    removeItem(product.id);
  }

  return (
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
        <Price>{product.priceFormatted}</Price>

        <RemoveFromCartButton onClick={handleRemoveItem}>
          Remover
        </RemoveFromCartButton>
      </Info>
    </CartItemContainer>
  );
};
