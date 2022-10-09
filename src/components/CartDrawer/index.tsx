import { X } from "phosphor-react";
import { useCartDrawerContext } from "../../contexts/CartDrawerContext";
import { CartItem } from "../CartItem";
import {
  CartDrawerContainer,
  CloseButton,
  Items,
  Price,
  PurchaseButton,
  Quantity,
  QuantityContainer,
  Summary,
  Title,
  TotalContainer,
} from "./styles";

export const CartDrawer: React.FC = () => {
  const { isOpen, close } = useCartDrawerContext();

  return (
    <CartDrawerContainer variant={isOpen ? "open" : "closed"}>
      <CloseButton onClick={close}>
        <X />
      </CloseButton>

      <Title>Sacola de compras</Title>

      <Items>
        <CartItem
          product={{
            id: "1",
            name: "Camiseta Beyond the Limits",
            imageUrl:
              "https://files.stripe.com/links/MDB8YWNjdF8xTGZaWUVDY2cyeEx1SEVlfGZsX3Rlc3RfRXZ3ak52TEZKZnoyOFNQU0xpTVJtbEM300ax8dvmaK",
            price: "R$ 79,90",
          }}
        />
      </Items>

      <Summary>
        <QuantityContainer>
          <span>Quantidade</span>
          <Quantity>3 itens</Quantity>
        </QuantityContainer>

        <TotalContainer>
          <span>Valor total</span>
          <Price>R$ 270,00</Price>
        </TotalContainer>
      </Summary>

      <PurchaseButton>Finalizar compra</PurchaseButton>
    </CartDrawerContainer>
  );
};
