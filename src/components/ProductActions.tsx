"use client";

import { useState } from "react";
import { SizeSelector } from "@/components/SizeSelector";
import CartButton from "@/components/CartButton";

type ProductActionsProps = {
  sizes: string[];
  product: {
    name: string;
    slug: string;
    price: string;
    image: string;
  };
};

export function ProductActions({
  sizes,
  product,
}: ProductActionsProps) {
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <>
      <SizeSelector
        sizes={sizes}
        onSizeChange={setSelectedSize}
      />

      <CartButton
        selectedSize={selectedSize}
        product={product}
      />
    </>
  );
}