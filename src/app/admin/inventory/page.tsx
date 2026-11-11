"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import "./inventory.css";

type InventoryItem = {
  id: string;
  product_id: string;
  size: string;
  color: string;
  stock_quantity: number;
  product_name: string;
};

export default function AdminInventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInventory() {
      const supabase = createClient();

      const [{ data: variants }, { data: products }] = await Promise.all([
        supabase
          .from("product_variants")
          .select("id, product_id, size, color, stock_quantity")
          .order("created_at", { ascending: false }),
        supabase.from("products").select("id, name"),
      ]);

      const productNames = new Map(
        (products ?? []).map((product) => [product.id, product.name])
      );

      setItems(
        (variants ?? []).map((variant) => ({
          ...variant,
          product_name: productNames.get(variant.product_id) ?? "Unknown product",
        }))
      );

      setLoading(false);
    }

    loadInventory();
  }, []);

  async function updateStock(id: string, quantity: number) {
    if (!Number.isInteger(quantity) || quantity < 0) {
      alert("Enter a valid stock quantity.");
      return;
    }

    const supabase = createClient();

    const { error } = await supabase
      .from("product_variants")
      .update({ stock_quantity: quantity })
      .eq("id", id);

    if (error) {
      alert("Unable to update stock.");
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, stock_quantity: quantity } : item
      )
    );
  }

  return (
    <main className="admin-inventory">
      <header>
        <p className="admin-eyebrow">DAGA&apos;YI MANAGEMENT</p>
        <h1>MANAGE INVENTORY</h1>
        <p>View stock levels for each product variant.</p>
      </header>

      {loading ? (
        <p>Loading inventory...</p>
      ) : items.length === 0 ? (
        <p>No inventory items found.</p>
      ) : (
        <div className="admin-inventory-list">
          {items.map((item) => (
            <section className="admin-inventory-row" key={item.id}>
              <div>
                <h2>{item.product_name}</h2>
                <p>
                  Size: {item.size} · Color: {item.color}
                </p>
              </div>

              <label>
                Stock
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={item.stock_quantity}
                  onChange={(event) => {
                    const value = event.target.value;
                    setItems((current) =>
                      current.map((entry) =>
                        entry.id === item.id
                          ? {
                              ...entry,
                              stock_quantity: value === "" ? 0 : Number(value),
                            }
                          : entry
                      )
                    );
                  }}
                  onBlur={(event) =>
                    updateStock(item.id, Number(event.target.value))
                  }
                />
              </label>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}