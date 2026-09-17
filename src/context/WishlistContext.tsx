"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type WishlistItem = {
  name: string;
  slug: string;
  price: string;
  image: string;
};

type WishlistContextType = {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
};

const WishlistContext = createContext<
  WishlistContextType | undefined
>(undefined);

export function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlistItems, setWishlistItems] = useState<
    WishlistItem[]
  >([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedWishlist =
      localStorage.getItem("dagayi-wishlist");

    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch {
        localStorage.removeItem("dagayi-wishlist");
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    localStorage.setItem(
      "dagayi-wishlist",
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems, isLoaded]);

  function addToWishlist(item: WishlistItem) {
    setWishlistItems((currentItems) => [
      ...currentItems,
      item,
    ]);
  }

  function removeFromWishlist(slug: string) {
    setWishlistItems((currentItems) =>
      currentItems.filter((item) => item.slug !== slug)
    );
  }

  function isWishlisted(slug: string) {
    return wishlistItems.some((item) => item.slug === slug);
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}