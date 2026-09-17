"use client";

import { useEffect, useState } from "react";
import { products } from "@/lib/products";

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All")

  useEffect(() => {
  const query = new URLSearchParams(window.location.search).get("query");

  if (query) {
    setSearch(query);
  }
}, []);

 const results = products.filter((product) => {
  const matchesSearch = product.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCategory =
    category === "All" || product.category === category;

  return matchesSearch && matchesCategory;
});

  return (
    <main className="search-page">
      <h1>SEARCH</h1>
      <input type="text" placeholder="Search products..." value={search} onChange={(event) => setSearch(event.target.value)} />

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
        {search && results.length === 0 ? (
          <p>No products found.</p>
        ) : (
          results.map((product) => (
            <a
              href={`/products/${product.slug}`}
              className="search-result"
              key={product.slug}
            >
              <img src={product.image} alt={product.name} />

              <div>
                <h2>{product.name}</h2>
                <p>{product.price}</p>
              </div>
            </a>
          ))
        )}
      </div>
    </main>
  );
}