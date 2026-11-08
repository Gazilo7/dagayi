"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { createClient } from "@/lib/supabase/client";
import "./checkout.css";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = cartItems.reduce((total, item) => {
    const price = Number(item.price.replace(/[^\d.]/g, ""));
    return total + price * item.quantity;
  }, 0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (cartItems.some((item) => !item.variantId)) {
      setError("A cart item has missing variant information. Please add it again.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        router.push("/login");
        return;
      }

      const { data, error: orderError } = await supabase.rpc(
        "create_customer_order",
        {
          p_customer_name: name,
          p_customer_email: email,
          p_shipping_address: {
            phone,
            address,
            city,
            state,
            country: "Nigeria",
          },
          p_items: cartItems.map((item) => ({
            variant_id: item.variantId,
            quantity: item.quantity,
          })),
        }
      );

      if (orderError) {
        throw orderError;
      }

      const order = data?.[0];

      if (!order) {
        throw new Error("Order could not be created.");
      }

      clearCart();

      alert(
        `Order placed successfully!\nOrder number: ${order.order_number}`
      );

      router.push("/account/orders");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="checkout-page">
      <h1>CHECKOUT</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <section className="checkout-summary">
            <h2>ORDER SUMMARY</h2>

            {cartItems.map((item) => (
              <div key={item.variantId}>
                <p>
                  {item.name} — Size {item.size} × {item.quantity}
                </p>
              </div>
            ))}

            <h3>
              Subtotal: ₦{subtotal.toLocaleString("en-NG")}
            </h3>
          </section>

          <form onSubmit={handleSubmit} className="checkout-form">
            <h2>DELIVERY DETAILS</h2>

            <input
              required
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              required
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              required
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              required
              placeholder="Delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            /><input
              required
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <input
              required
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />

            {error && <p className="checkout-error">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "PLACING ORDER..." : "PLACE ORDER"}
            </button>
          </form>
        </>
      )}
    </main>
  );
}