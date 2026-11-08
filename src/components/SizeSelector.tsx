"use client";

import { useState } from "react";

type SizeSelectorProps = {
  sizes: string[];
  availableSizes: string[];
  onSizeChange: (size: string) => void;
};

export function SizeSelector({
  sizes,
  availableSizes,
  onSizeChange,
}: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState("");

  function handleSizeClick(size: string) {
    if (!availableSizes.includes(size)) return;

    setSelectedSize(size);
    onSizeChange(size);
  }

  return (
    <div className="size-selector">
      <p>SELECT SIZE</p>

      <div className="size-options">
        {sizes.map((size) => {
          const isAvailable = availableSizes.includes(size);

          return (
            <button
              key={size}
              type="button"
              disabled={!isAvailable}
              onClick={() => handleSizeClick(size)}
              className={[
                selectedSize === size ? "selected" : "",
                !isAvailable ? "out-of-stock" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {size}
              {!isAvailable && <span> — Out of Stock</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}