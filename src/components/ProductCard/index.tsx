import Image from "next/future/image";
import Link from "next/link";
import { Handbag } from "phosphor-react";
import { CartProduct, useCartContext } from "../../contexts/CartContext";
import {
  AddToCartButton,
  Footer,
  ImageContainer,
  Name,
  Price,
  ProductCardContainer,
  ProductInfo,
} from "./styles";

interface ProductCardProps {
  product: CartProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartContext();

  function handleAddItemToCart() {
    addItem(product);
  }

  return (
    <ProductCardContainer className="keen-slider__slide">
      <Link href={`/product/${product.id}`} prefetch={false} passHref>
        <a>
          <ImageContainer>
            <Image
              src={product.imageUrl}
              width={520}
              height={480}
              alt={product.name}
              priority
            />
          </ImageContainer>
        </a>
      </Link>

      <Footer>
        <ProductInfo>
          <Name>{product.name}</Name>
          <Price>{product.priceFormatted}</Price>
        </ProductInfo>

        <AddToCartButton onClick={handleAddItemToCart}>
          <Handbag size={28} weight="bold" />
        </AddToCartButton>
      </Footer>
    </ProductCardContainer>
  );
};
