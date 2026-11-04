import Navbar from "@/components/Navbar";
import styles from "./Contact.module.css";

const whatsappLink =
  "https://wa.me/2348098943576?text=Hello%20Daga%27yi%2C%20I%27d%20like%20to%20make%20an%20enquiry.";

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <Navbar />

      <section className={styles.content}>
        <p className={styles.eyebrow}>WE'RE HERE TO HELP</p>

        <h1>GET IN TOUCH.</h1>

        <p className={styles.description}>
          Have a question about an order, our collection, or anything
          Daga'yi? We'd love to hear from you.
        </p>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          CHAT WITH US ON WHATSAPP
        </a>

        <p className={styles.number}>+234 809 894 3576</p>
      </section>
    </main>
  );
}