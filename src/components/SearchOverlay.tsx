"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type SearchOverlayProps = {
  onClose: () => void;
};

type Product = {
  name: string;
  slug: string;
  category: string;
};

export default function SearchOverlay({
  onClose,
}: SearchOverlayProps) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("products")
        .select("name, slug, category")
        .eq("is_active", true);

      if (error) {
        console.error("Search overlay error:", error);
        setError(true);
      } else {
        setProducts(data ?? []);
      }

      setLoading(false);
    }

    fetchProducts();
  }, []);

  const searchTerm = search.toLowerCase();

  const results = products.filter((product) => {
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
            {loading ? (
              <p>Loading products...</p>
            ) : error ? (
              <p>Unable to load products.</p>
            ) : results.length === 0 ? (
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

          {!loading && !error && (
            <a
              href={`/search?query=${encodeURIComponent(search)}`}
              className="search-overlay-view-all"
            >
              VIEW ALL RESULTS
            </a>
          )}
        </>
      )}
    </div>
  );
}