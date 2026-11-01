"use client";

import { useState } from "react";
import Link from "next/link";
import AuthHeader from "@/components/AuthHeader";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    window.location.href = "/";
  }

  return (
    <>
      <AuthHeader />

      <main className="auth-page">
        <div className="auth-container">
          <h1>WELCOME BACK</h1>

          <p>Log in to your Daga'yi account.</p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="forgot-password-link">
              <Link href="/forgot-password">
                Forgot your password?
              </Link>
            </div>

            {error && (
              <p className="auth-error">{error}</p>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "LOGGING IN..." : "LOG IN"}
            </button>
          </form>

          <p>
            Don't have an account?{" "}
            <Link href="/register">Create one</Link>
          </p>
        </div>
      </main>
    </>
  );
}