"use client";

import { useState } from "react";
import { SizeSelector } from "@/components/SizeSelector";
import CartButton from "@/components/CartButton";

type ProductActionsProps = {
  sizes: string[];
  availableSizes: string[];
  variants: {
    id: string;
    size: string;
    color: string | null;
  }[];
  product: {
    name: string;
    slug: string;
    price: string;
    image: string;
  };
};

export function ProductActions({
  sizes,
  availableSizes,
  variants,
  product,
}: ProductActionsProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVariantId, setSelectedVariantId] = useState("");

  function handleSizeChange(size: string) {
    setSelectedSize(size);

    const variant = variants.find(
      (item) => item.size === size
    );

    setSelectedVariantId(variant?.id ?? "");
  }

  return (
    <>
      <SizeSelector
        sizes={sizes}
        availableSizes={availableSizes}
        onSizeChange={handleSizeChange}
      />

      <CartButton
        selectedSize={selectedSize}
        selectedVariantId={selectedVariantId}
        availableSizes={availableSizes}
        product={product}
      />
    </>
  );
}