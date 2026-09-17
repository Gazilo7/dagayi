"use client";

import { useCart } from "@/context/CartContext";

type CartButtonProps = {
  selectedSize: string;
  product: {
    name: string;
    slug: string;
    price: string;
    image: string;
  };
};

export default function CartButton({
  selectedSize,
  product,
}: CartButtonProps) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }

    addToCart({
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity: 1,
    });

    alert(`Added to cart — Size: ${selectedSize}`);
  }

  return (
    <button className="add-to-cart" onClick={handleAddToCart}>
      ADD TO CART
    </button>
  );
}