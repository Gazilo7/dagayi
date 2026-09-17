"use client";

import { useState } from "react";
import { products } from "@/lib/products";

type SearchOverlayProps = {
  onClose: () => void;
};

export default function SearchOverlay({
  onClose,
}: SearchOverlayProps) {
  const [search, setSearch] = useState("");

  const results = products.filter((product) => {
  const searchTerm = search.toLowerCase();

  return (
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
});

  return (
    <div className="search-overlay">
      <div className="search-overlay-top">
        <input
          autoFocus
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <button onClick={onClose} aria-label="Close search">
          ×
        </button>
      </div>

      {search && (
  <>
    <div className="search-overlay-results">
      {results.length === 0 ? (
        <p>No products found.</p>
      ) : (
        results.map((product) => (
          <a
            href={`/products/${product.slug}`}
            key={product.slug}
          >
            {product.name}
          </a>
        ))
      )}
    </div>

    <a
      href={`/search?query=${encodeURIComponent(search)}`}
      className="search-overlay-view-all"
    >
      VIEW ALL RESULTS
    </a>
  </>
)}
    </div>
  );
}