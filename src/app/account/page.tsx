import { redirect } from "next/navigation";
import AuthHeader from "@/components/AuthHeader";
import { createClient } from "@/lib/supabase/server";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <>
      <AuthHeader />

      <main className="account-page">
        <div className="account-container">
          <h1>MY ACCOUNT</h1>

          <p>Welcome to Daga'yi.</p>

          <div className="account-details">
            <h2>ACCOUNT DETAILS</h2>

            <p>Email address</p>
            <strong>{user.email}</strong>
          </div>

          <form action="/auth/signout" method="POST">
            <button type="submit">
              LOG OUT
            </button>
          </form>
        </div>
      </main>
    </>
  );
}