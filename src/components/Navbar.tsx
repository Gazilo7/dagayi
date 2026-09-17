"use client";

import { useState } from "react";
import SearchOverlay from "@/components/SearchOverlay";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-left">
        <button className="menu-button" aria-label="Open menu">
          ☰
        </button>

        <nav>
          <a href="#shop">SHOP</a>
          <a href="#collection">COLLECTION</a>
          <a href="#about">ABOUT</a>
        </nav>
      </div>

      <div className="header-right">
        <a href="/" className="logo">
          Daga'yi
        </a>

        <button
          aria-label="Search"
          onClick={() => setSearchOpen(true)}
        >
          ⌕
        </button>

        <button aria-label="Account">♙</button>

        <a href="/wishlist" aria-label="Wishlist">
          ♡
        </a>

        <a href="/cart" aria-label="Shopping bag">
          ▢
        </a>
      </div>

      {searchOpen && (
        <SearchOverlay onClose={() => setSearchOpen(false)} />
      )}
    </header>
  );
}