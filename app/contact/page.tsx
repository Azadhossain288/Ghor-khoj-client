"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:px-8">
      <h1 className="mb-6 text-3xl font-bold text-primary">Contact Us</h1>
      <p className="mb-8 text-slate-600">
        Have a question about a listing, or want to report an issue? Send us a message and
        we'll get back to you within 1-2 business days.
      </p>

      {sent ? (
        <p className="text-success">Thanks for reaching out — we'll reply soon.</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Hook this up to a real /api/contact route on the backend if you want actual emails sent.
            setSent(true);
          }}
          className="grid gap-4"
        >
          <input
            required
            placeholder="Your name"
            className="rounded-lg border px-3 py-2 text-sm"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            required
            type="email"
            placeholder="Email"
            className="rounded-lg border px-3 py-2 text-sm"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <textarea
            required
            rows={5}
            placeholder="Message"
            className="rounded-lg border px-3 py-2 text-sm"
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <button className="rounded-full bg-primary py-2.5 font-semibold text-white">Send Message</button>
        </form>
      )}

      <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
        <p>Email: azadhossain016288@gmail.com</p>
        <p>Phone: +880 16288@gmail.com</p>
        <p>Address: Dhanmondi, Dhaka, Bangladesh</p>
      </div>
    </div>
  );
}
