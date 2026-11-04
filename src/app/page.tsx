import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { createClient } from "@/lib/supabase/server";

const currencyFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export default async function Home() {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("name, slug, price, image_url")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Homepage products fetch failed:", error);
  }

  const formattedProducts = (products ?? []).map((product) => ({
    ...product,
    price: currencyFormatter.format(Number(product.price)),
    image: product.image_url ?? "",
  }));

  return (
    <main>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">DAGA'YI MMXXIV</p>

          <h1>
            FORM
            <br />
            FOLLOWS
            <br />
            CULTURE.
          </h1>

          <p className="hero-description">
            Contemporary clothing shaped by identity, movement and
            expression.
          </p>

          <a href="#shop" className="hero-button">
            EXPLORE COLLECTION
          </a>
        </div>
      </section>

      {/* INTRO */}
      <section className="intro" id="about">
        <p className="eyebrow">THE DAGA'YI APPROACH</p>

        <h2>
          CLOTHING FOR
          <br />
          THOSE WHO
          <br />
          MOVE DIFFERENTLY.
        </h2>
      </section>

      {/* COLLECTION */}
      <section className="collection" id="collection">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 — NEW ARRIVALS</p>
            <h2>THE LATEST</h2>
          </div>

          <a href="#shop">VIEW ALL →</a>
        </div>

        <div className="product-grid" id="shop">
          {formattedProducts.map((product) => (
            <ProductCard
              key={product.slug}
              name={product.name}
              slug={product.slug}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </section>

      {/* STATEMENT */}
      <section className="statement">
        <p>
          DAGA'YI IS NOT JUST WHAT YOU WEAR.
          <br />
          IT'S HOW YOU ARRIVE.
        </p>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-brand">
          <h2>DAGA'YI</h2>
          <p>EST. MMXXIV</p>
        </div>

        <div className="footer-links">
  <a
    href="https://www.instagram.com/dagayi.ng/"
    target="_blank"
    rel="noopener noreferrer"
  >
    Instagram
  </a>

  <a href="/contact">Contact</a>
  <a href="/shipping">Shipping</a>
  <a href="/returns">Returns</a>
</div>

        <p className="copyright">
          © 2026 Daga'yi. All rights reserved.
        </p>
      </footer>
    </main>
  );
}