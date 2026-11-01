"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Product = {
  name: string;
  slug: string;
  category: string;
  price: number;
  image_url: string | null;
};

export default function SearchPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(
      window.location.search
    ).get("query");

    if (query) {
      setSearch(query);
    }

    async function fetchProducts() {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("products")
        .select("name, slug, category, price, image_url")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Search fetch error:", error);
        setError("Unable to load products. Please try again.");
      } else {
        setProducts(data ?? []);
      }

      setLoading(false);
    }

    fetchProducts();
  }, []);

  const results = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <main className="search-page">
      <h1>SEARCH</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div className="category-filters">
        {["All", "T-Shirts", "Jackets", "Shirts", "Trousers"].map(
          (item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={category === item ? "active" : ""}
            >
              {item}
            </button>
          )
        )}
      </div>

      <div className="search-results">
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>{error}</p>
        ) : search && results.length === 0 ? (
          <p>No products found.</p>
        ) : (
          results.map((product) => (
            <a
              href={`/products/${product.slug}`}
              className="search-result"
              key={product.slug}
            >
              <img
                src={product.image_url ?? ""}
                alt={product.name}
              />

              <div>
                <h2>{product.name}</h2>
                <p>{formatPrice(Number(product.price))}</p>
              </div>
            </a>
          ))
        )}
      </div>
    </main>
  );
}