"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import "./products.css";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  is_active: boolean;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("products")
        .select("id, name, slug, price, is_active")
        .order("name");

      if (!error) {
        setProducts((data ?? []) as Product[]);
      }

      setLoading(false);
    }

    loadProducts();
  }, []);

  async function toggleProduct(product: Product) {
    const supabase = createClient();

    const { error } = await supabase
      .from("products")
      .update({ is_active: !product.is_active })
      .eq("id", product.id);

    if (error) {
      alert("Unable to update product.");
      return;
    }

    setProducts((current) =>
      current.map((item) =>
        item.id === product.id
          ? { ...item, is_active: !item.is_active }
          : item
      )
    );
  }

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <main className="admin-products">
      <header>
        <p className="admin-eyebrow">DAGA&apos;YI MANAGEMENT</p>
        <h1>MANAGE PRODUCTS</h1>
        <p>View products and control their availability in your store.</p>
      </header>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="admin-products-list">
          {products.map((product) => (
            <section className="admin-product-row" key={product.id}>
              <div>
                <h2>{product.name}</h2>
                <p>{formatPrice(Number(product.price))}</p>
                <span>{product.is_active ? "ACTIVE" : "HIDDEN"}</span>
              </div>

              <button onClick={() => toggleProduct(product)}>
                {product.is_active ? "HIDE PRODUCT" : "SHOW PRODUCT"}
              </button>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}