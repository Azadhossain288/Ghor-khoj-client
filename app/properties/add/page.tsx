"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { api } from "@/lib/api";
import { DIVISIONS } from "@/lib/constants";

export default function AddPropertyPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    location: "",
    division: DIVISIONS[0],
    type: "apartment",
    bedrooms: "",
    bathrooms: "",
    images: "",
  });

  if (isPending) return null;
  if (!session) {
    router.push("/login");
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await api.addProperty({
      ...form,
      price: Number(form.price),
      bedrooms: Number(form.bedrooms) || 0,
      bathrooms: Number(form.bathrooms) || 0,
      images: form.images ? [form.images] : [],
    });
    router.push("/properties/manage");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:px-8">
      <h1 className="mb-6 text-2xl font-bold text-primary">Add Property</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input required placeholder="Title" className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input required placeholder="Short description" className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
        <textarea required placeholder="Full description" rows={4} className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, fullDescription: e.target.value })} />
        <div className="grid grid-cols-2 gap-4">
          <input required type="number" placeholder="Price (BDT)" className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <input required placeholder="Location" className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, location: e.target.value })} />
        </div>
        <select className="rounded-lg border px-3 py-2 text-sm" value={form.division} onChange={(e) => setForm({ ...form, division: e.target.value })}>
          {DIVISIONS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="land">Land</option>
          <option value="commercial">Commercial</option>
        </select>
        <div className="grid grid-cols-2 gap-4">
          <input type="number" placeholder="Bedrooms" className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, bedrooms: e.target.value })} />
          <input type="number" placeholder="Bathrooms" className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, bathrooms: e.target.value })} />
        </div>
        <input placeholder="Image URL (optional)" className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, images: e.target.value })} />
        <button className="rounded-full bg-primary py-2.5 font-semibold text-white">Submit</button>
      </form>
    </div>
  );
}