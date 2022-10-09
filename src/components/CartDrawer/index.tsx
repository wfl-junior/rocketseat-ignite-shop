import { CircleNotch, X } from "phosphor-react";
import { useMemo, useState } from "react";
import { useCartContext } from "../../contexts/CartContext";
import { useCartDrawerContext } from "../../contexts/CartDrawerContext";
import { api } from "../../services/api";
import { formatPrice } from "../../utils/formatPrice";
import { CartItem } from "../CartItem";
import {
  CartDrawerContainer,
  CloseButton,
  Items,
  NoItemsMessage,
  Price,
  PurchaseButton,
  Quantity,
  QuantityContainer,
  Summary,
  Title,
  TotalContainer,
} from "./styles";

export const CartDrawer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, close } = useCartDrawerContext();
  const { items, clearItems } = useCartContext();

  const totalPrice = useMemo((): string => {
    return formatPrice(items.reduce((total, item) => total + item.price, 0));
  }, [items]);

  async function handleCheckout() {
    setIsLoading(true);

    try {
      const { data } = await api.post<{ checkoutUrl: string }>("/checkout", {
        priceIds: items.map(item => item.defaultPriceId),
      });

      clearItems();
      window.location.href = data.checkoutUrl;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      alert("Falha ao redirecionar ao checkout!");
    }
  }

  return (
    <CartDrawerContainer variant={isOpen ? "open" : "closed"}>
      <CloseButton onClick={close}>
        <X />
      </CloseButton>

      <Title>Sacola de compras</Title>

      <Items>
        {items.length ? (
          items.map(item => <CartItem key={item.id} product={item} />)
        ) : (
          <NoItemsMessage>Não há itens no seu carrinho.</NoItemsMessage>
        )}
      </Items>

      <Summary>
        <QuantityContainer>
          <span>Quantidade</span>
          <Quantity>{items.length} itens</Quantity>
        </QuantityContainer>

        <TotalContainer>
          <span>Valor total</span>
          <Price>{totalPrice}</Price>
        </TotalContainer>
      </Summary>

      <PurchaseButton onClick={handleCheckout} disabled={isLoading}>
        {isLoading ? <CircleNotch size={22} /> : "Finalizar compra"}
      </PurchaseButton>
    </CartDrawerContainer>
  );
};
