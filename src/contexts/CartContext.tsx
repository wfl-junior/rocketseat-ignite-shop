import { createContext, useCallback, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

export interface CartProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  priceFormatted: string;
  defaultPriceId: string;
}

interface CartContextData {
  items: CartProduct[];
  addItem: (item: CartProduct) => void;
  removeItem: (itemId: CartProduct["id"]) => void;
  clearItems: () => void;
}

const CartContext = createContext({} as CartContextData);

export const useCartContext = () => useContext(CartContext);

interface CartContextProviderProps {
  children: React.ReactNode;
}

export const CartContextProvider: React.FC<CartContextProviderProps> = ({
  children,
}) => {
  const [items, setItems] = useLocalStorageState<CartContextData["items"]>(
    "@ignite-shop/cart-items",
    [],
  );

  const addItem: CartContextData["addItem"] = useCallback(newItem => {
    setItems(currentItems => {
      if (currentItems.some(item => item.id === newItem.id)) {
        return currentItems;
      }

      return [...currentItems, newItem];
    });
  }, []);

  const removeItem: CartContextData["removeItem"] = useCallback(itemId => {
    setItems(currentItems => {
      return currentItems.filter(item => item.id !== itemId);
    });
  }, []);

  const clearItems: CartContextData["clearItems"] = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
