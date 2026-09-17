"use client";

import { useWishlist } from "@/context/WishlistContext";

type ProductCardProps = {
  name: string;
  slug: string;
  price: string;
  image: string;
};

export default function ProductCard({
  name,
  slug,
  price,
  image,
}: ProductCardProps) {
  const {
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
  } = useWishlist();

  const wishlisted = isWishlisted(slug);

  function handleWishlistClick(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault();
    event.stopPropagation();

    if (wishlisted) {
      removeFromWishlist(slug);
    } else {
      addToWishlist({
        name,
        slug,
        price,
        image,
      });
    }
  }

  return (
    <a
      href={`/products/${slug}`}
      className="product-card"
    >
      <div className="product-image">
        <img src={image} alt={name} />

        <button
          className={`wishlist ${
            wishlisted ? "wishlisted" : ""
          }`}
          onClick={handleWishlistClick}
          aria-label={
            wishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          {wishlisted ? "♥" : "♡"}
        </button>
      </div>

      <div className="product-info">
        <h3>{name}</h3>
        <p>{price}</p>
      </div>
    </a>
  );
}