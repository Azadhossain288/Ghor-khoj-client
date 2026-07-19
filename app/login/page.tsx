"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const { error: err } = await signIn.email({ email: form.email, password: form.password });
    if (err) return setError(err.message || "Login failed");
    router.push("/dashboard");
  }

  async function handleDemoLogin() {
    setError("");
    const { error: err } = await signIn.email({
      email: process.env.NEXT_PUBLIC_DEMO_EMAIL || "demo@ghorkhoj.com",
      password: process.env.NEXT_PUBLIC_DEMO_PASSWORD || "Demo@1234",
    });
    if (err) return setError("Demo login failed — make sure the demo user is seeded.");
    router.push("/dashboard");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 md:px-8">
      <h1 className="mb-6 text-2xl font-bold text-primary">Login</h1>

      <form onSubmit={handleLogin} className="grid gap-4">
        <input required type="email" placeholder="Email" className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input required type="password" placeholder="Password" className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button className="rounded-full bg-primary py-2.5 font-semibold text-white">Login</button>
      </form>

      <button onClick={handleDemoLogin} className="mt-3 w-full rounded-full border border-accent py-2.5 font-semibold text-accent">
        Try Demo Login
      </button>

      <button
        onClick={() =>
          signIn.social({
            provider: "google",
            callbackURL: `${window.location.origin}/dashboard`,
          })
        }
        className="mt-3 w-full rounded-full border border-slate-300 py-2.5 font-semibold text-primary"
      >
        Continue with Google
      </button>

      <p className="mt-6 text-center text-sm text-slate-500">
        No account? <a href="/register" className="text-accent">Register</a>
      </p>
    </div>
  );
}
