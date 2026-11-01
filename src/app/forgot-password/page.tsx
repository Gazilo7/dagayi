"use client";

import { useState } from "react";
import Link from "next/link";
import AuthHeader from "@/components/AuthHeader";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      }
    );

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage(
      "If an account exists for this email, a password reset link will be sent. Please check your inbox."
    );

    setEmail("");
  }

  return (
    <>
      <AuthHeader />

      <main className="auth-page">
        <div className="auth-container">
          <h1>FORGOT PASSWORD?</h1>

          <p>
            Enter your email address and we'll send you
            instructions to reset your password.
          </p>

          <form onSubmit={handleReset}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {error && (
              <p className="auth-error">{error}</p>
            )}

            {message && (
              <p className="auth-success">{message}</p>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "SENDING..." : "SEND RESET LINK"}
            </button>
          </form>

          <p>
            Remember your password?{" "}
            <Link href="/login">Log in</Link>
          </p>
        </div>
      </main>
    </>
  );
}