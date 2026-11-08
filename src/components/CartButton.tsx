"use client";

import { useCart } from "@/context/CartContext";

type CartButtonProps = {
  selectedSize: string;
  selectedVariantId: string;
  availableSizes: string[];
  product: {
    name: string;
    slug: string;
    price: string;
    image: string;
  };
};

export default function CartButton({
  selectedSize,
  selectedVariantId,
  availableSizes,
  product,
}: CartButtonProps) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }

    if (!availableSizes.includes(selectedSize)) {
      alert("Sorry, this size is out of stock.");
      return;
    }

    if (!selectedVariantId) {
      alert("Unable to identify this product variant. Please try again.");
      return;
    }

    addToCart({
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image,
      size: selectedSize,
      variantId: selectedVariantId,
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