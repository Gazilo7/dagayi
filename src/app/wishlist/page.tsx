"use client";

import { useWishlist } from "@/context/WishlistContext";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <main className="wishlist-page">
      <h1>YOUR WISHLIST</h1>

      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-items">
          {wishlistItems.map((item) => (
            <div className="wishlist-item" key={item.slug}>
              <img src={item.image} alt={item.name} />

              <div className="wishlist-item-info">
                <h2>{item.name}</h2>
                <p>{item.price}</p>

                <button
                  className="remove-wishlist"
                  onClick={() => removeFromWishlist(item.slug)}
                >
                  REMOVE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}