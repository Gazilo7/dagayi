"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type CartItem = {
  name: string;
  slug: string;
  price: string;
  image: string;
  size: string;
  variantId: string;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, change: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("dagayi-cart");

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);

        // Remove old cart items that don't have a variant ID.
        if (Array.isArray(parsedCart)) {
          setCartItems(
            parsedCart.filter(
              (item): item is CartItem =>
                typeof item.variantId === "string" &&
                typeof item.slug === "string" &&
                typeof item.size === "string"
            )
          );
        }
      } catch {
        localStorage.removeItem("dagayi-cart");
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "dagayi-cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems, isLoaded]);

  function addToCart(item: CartItem) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (cartItem) => cartItem.variantId === item.variantId
      );

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.variantId === item.variantId
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
      }

      return [...currentItems, { ...item, quantity: 1 }];
    });
  }

  function removeFromCart(index: number) {
    setCartItems((currentItems) =>
      currentItems.filter((_, itemIndex) => itemIndex !== index)
    );
  }

  function updateQuantity(index: number, change: number) {
    setCartItems((currentItems) =>
      currentItems.map((item, itemIndex) => {
        if (itemIndex !== index) return item;

        const newQuantity = item.quantity + change;

        return newQuantity < 1
          ? item
          : { ...item, quantity: newQuantity };
      })
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}