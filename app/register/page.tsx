"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    const { error: err } = await signUp.email(form);
    if (err) return setError(err.message || "Registration failed");
    router.push("/dashboard");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 md:px-8">
      <h1 className="mb-6 text-2xl font-bold text-primary">Create an Account</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input required placeholder="Full name" className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input required type="email" placeholder="Email" className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input required type="password" placeholder="Password (min 6 chars)" className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button className="rounded-full bg-primary py-2.5 font-semibold text-white">Register</button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account? <a href="/login" className="text-accent">Login</a>
      </p>
    </div>
  );
}
