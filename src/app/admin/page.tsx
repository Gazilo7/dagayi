import { createClient } from "@/lib/supabase/server";
import "./admin.css";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: productCount },
    { count: orderCount },
    { count: customerCount },
    { count: variantCount },
  ] = await Promise.all([
    supabase
      .from("products")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("user_roles")
      .select("*", { count: "exact", head: true })
      .eq("role", "customer"),
    supabase
      .from("product_variants")
      .select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "TOTAL PRODUCTS", value: productCount ?? 0 },
    { label: "TOTAL ORDERS", value: orderCount ?? 0 },
    { label: "CUSTOMERS", value: customerCount ?? 0 },
    { label: "PRODUCT VARIANTS", value: variantCount ?? 0 },
  ];

  return (
    <main className="admin-dashboard">
      <header>
        <p className="admin-eyebrow">DAGA&apos;YI MANAGEMENT</p>
        <h1>ADMIN DASHBOARD</h1>
        <p>Welcome to your store management dashboard.</p>
      </header>

      <section className="admin-stats">
        {stats.map((stat) => (
          <div className="admin-stat-card" key={stat.label}>
            <p>{stat.label}</p>
            <h2>{stat.value}</h2>
          </div>
        ))}
      </section>

      <section className="admin-quick-links">
        <h2>STORE MANAGEMENT</h2>

        <a href="/admin/orders">MANAGE ORDERS</a>
        <a href="/admin/products">MANAGE PRODUCTS</a>
        <a href="/admin/inventory">MANAGE INVENTORY</a>
      </section>
    </main>
  );
}