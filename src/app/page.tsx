import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <main>
      <Navbar/>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">DAGA&apos;YI MMXXIV</p>

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
        <p className="eyebrow">THE DAGA&apos;YI APPROACH</p>

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
          {products.map((product) => (
        <ProductCard
        key={product.name}
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
          DAGA&apos;YI IS NOT JUST WHAT YOU WEAR.
          <br />
          IT&apos;S HOW YOU ARRIVE.
        </p>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-brand">
          <h2>DAGA&apos;YI</h2>
          <p>EST. MMXXIV</p>
        </div>

        <div className="footer-links">
          <a href="#">Instagram</a>
          <a href="#">Contact</a>
          <a href="#">Shipping</a>
          <a href="#">Returns</a>
        </div>

        <p className="copyright">
          © 2026 Daga&apos;yi. All rights reserved.
        </p>
      </footer>
    </main>
  );
}