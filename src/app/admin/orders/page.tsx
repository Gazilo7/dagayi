"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import "./orders.css";

type Order = {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  status: string;
  payment_status: string;
  total: number;
  created_at: string;
  order_items: {
    product_name: string;
    size: string;
    quantity: number;
    unit_price: number;
  }[];
};

const statuses = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("orders")
        .select(`
          id,
          order_number,
          customer_name,
          customer_email,
          status,
          payment_status,
          total,
          created_at,
          order_items (
            product_name,
            size,
            quantity,
            unit_price
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        setError("Unable to load orders.");
      } else {
        setOrders((data ?? []) as unknown as Order[]);
      }

      setLoading(false);
    }

    loadOrders();
  }, []);

  async function updateStatus(orderId: string, status: string) {
    const supabase = createClient();

    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (error) {
      alert("Unable to update order status.");
      return;
    }

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
    alert("Order status updated successfully.");
  }

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);

  if (loading) {
    return <main className="admin-orders"><p>Loading orders...</p></main>;
  }

  return (
    <main className="admin-orders">
      <header>
        <p className="admin-eyebrow">DAGA&apos;YI MANAGEMENT</p>
        <h1>MANAGE ORDERS</h1>
        <p>View customer orders and update their status.</p>
      </header>

      {error ? (
        <p>{error}</p>
      ) : orders.length === 0 ? (
        <p>No customer orders yet.</p>
      ) : (
        <div className="admin-orders-list">
          {orders.map((order) => (
            <section className="admin-order-card" key={order.id}>
              <div className="admin-order-heading">
                <div>
                  <p className="admin-order-label">ORDER NUMBER</p>
                  <h2>{order.order_number}</h2>
                </div>

                <p>
                  {new Date(order.created_at).toLocaleDateString("en-NG")}
                </p>
              </div>

              <div className="admin-order-customer">
                <p><strong>Customer:</strong> {order.customer_name}</p>
                <p><strong>Email:</strong> {order.customer_email}</p>
                <p><strong>Payment:</strong> {order.payment_status}</p>
              </div>

              <div className="admin-order-items">
                {order.order_items?.map((item, index) => (
                  <p key={index}>
                    {item.product_name} — Size {item.size} × {item.quantity}
                    {" · "}
                    {formatPrice(Number(item.unit_price))}
                  </p>
                ))}
              </div>

              <div className="admin-order-footer">
                <strong>{formatPrice(Number(order.total))}</strong><select
                  value={order.status}
                  onChange={(event) =>
                    updateStatus(order.id, event.target.value)
                  }
                  aria-label={`Update status for ${order.order_number}`}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}