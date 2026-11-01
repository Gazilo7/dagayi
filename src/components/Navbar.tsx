"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SearchOverlay from "@/components/SearchOverlay";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user);
      setAuthChecked(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
      setAuthChecked(true);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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

        <button
          aria-label="Account"
          onClick={() =>
            router.push(isLoggedIn ? "/account" : "/login")
          }
        >
          ♙
        </button>

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