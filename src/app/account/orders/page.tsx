import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import "./orders.css";

type OrderItem = {
  product_name: string;
  product_slug: string;
  size: string;
  color: string | null;
  unit_price: number;
  quantity: number;
  image_url: string | null;
};

type Order = {
  id: string;
  order_number: string;
  status: string;
  payment_status: string;
  total: number;
  created_at: string;
  order_items: OrderItem[];
};

export default async function OrdersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      order_number,
      status,
      payment_status,
      total,
      created_at,
      order_items (
        product_name,
        product_slug,
        size,
        color,
        unit_price,
        quantity,
        image_url
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
  }

  const orders = (data ?? []) as unknown as Order[];

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <main className="orders-page">
      <h1>MY ORDERS</h1>
      <p className="orders-intro">Your Daga&apos;yi order history.</p>

      {error ? (
        <p>Unable to load your orders. Please try again.</p>
      ) : orders.length === 0 ? (
        <section className="empty-orders">
          <h2>No orders yet</h2>
          <p>Your orders will appear here after checkout.</p>
          <a href="/">CONTINUE SHOPPING</a>
        </section>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <section className="order-card" key={order.id}>
              <div className="order-header">
                <div>
                  <p className="order-label">ORDER NUMBER</p>
                  <h2>{order.order_number}</h2>
                </div>

                <div>
                  <p className="order-label">ORDER DATE</p>
                  <p>
                    {new Date(order.created_at).toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="order-status">
                <span>Order status: {order.status}</span>
                <span>Payment: {order.payment_status}</span>
              </div>

              <div className="order-items">
                {order.order_items?.map((item, index) => (
                  <div className="order-item" key={`${order.id}-${index}`}>
                    {item.image_url && (
                      <img src={item.image_url} alt={item.product_name} />
                    )}

                    <div>
                      <h3>{item.product_name}</h3>
                      <p>
                        Size: {item.size}
                        {item.color ? ` · ${item.color}` : ""}
                      </p>
                      <p>Quantity: {item.quantity}</p>
                      <p>{formatPrice(Number(item.unit_price))}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-total">
                <span>ORDER TOTAL</span>
                <strong>{formatPrice(Number(order.total))}</strong>
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}