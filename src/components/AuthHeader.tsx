import Link from "next/link";
import styles from "./AuthHeader.module.css";

export default function AuthHeader() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        Daga'yi
      </Link>

      <Link href="/" className={styles.backLink}>
        BACK TO SHOP
      </Link>
    </header>
  );
}