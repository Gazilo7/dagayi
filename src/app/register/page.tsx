"use client";

import { useState } from "react";
import Link from "next/link";
import AuthHeader from "@/components/AuthHeader";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage(
      "Registration successful. Please check your email to confirm your account."
    );

    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <>
      <AuthHeader />

      <main className="auth-page">
        <div className="auth-container">
          <h1>CREATE AN ACCOUNT</h1>

          <p>Join Daga'yi and discover your style.</p>

          <form onSubmit={handleRegister}>
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
              minLength={8}
              required
            />

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={8}
              required
            />

            {error && (
              <p className="auth-error">{error}</p>
            )}

            {message && (
              <p className="auth-success">{message}</p>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <p>
            Already have an account?{" "}
            <Link href="/login">Log in</Link>
          </p>
        </div>
      </main>
    </>
  );
}