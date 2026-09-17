"use client";

import { useState } from "react";

type SizeSelectorProps = {
  sizes: string[];
  onSizeChange: (size: string) => void;
};

export function SizeSelector({
  sizes,
  onSizeChange,
}: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState("");

  function handleSizeClick(size: string) {
    setSelectedSize(size);
    onSizeChange(size);
  }

  return (
    <div className="size-selector">
      <p>SELECT SIZE</p>

      <div className="size-options">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => handleSizeClick(size)}
            className={selectedSize === size ? "selected" : ""}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}