"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { api } from "@/lib/api";
import { DIVISIONS } from "@/lib/constants";

export default function EditPropertyPage() {
  const { id } = useParams<{ id: string }>();
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    api.getProperty(id).then((data) => {
      const p = data.property;
      setForm({
        title: p.title,
        shortDescription: p.shortDescription,
        fullDescription: p.fullDescription,
        price: String(p.price),
        location: p.location,
        division: p.division || DIVISIONS[0],
        type: p.type,
        bedrooms: String(p.bedrooms || ""),
        bathrooms: String(p.bathrooms || ""),
        images: p.images?.[0] || "",
      });
      setLoading(false);
    });
  }, [id]);

  if (isPending || loading) return <div className="p-10 text-center text-slate-400">Loading...</div>;
  if (!session) {
    router.push("/login");
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await api.updateProperty(id, {
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
      <h1 className="mb-6 text-2xl font-bold text-primary">Edit Property</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input required placeholder="Title" value={form.title} className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input required placeholder="Short description" value={form.shortDescription} className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
        <textarea required placeholder="Full description" rows={4} value={form.fullDescription} className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, fullDescription: e.target.value })} />
        <div className="grid grid-cols-2 gap-4">
          <input required type="number" placeholder="Price (BDT)" value={form.price} className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <input required placeholder="Location" value={form.location} className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, location: e.target.value })} />
        </div>
        <select value={form.division} className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, division: e.target.value })}>
          {DIVISIONS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select value={form.type} className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="land">Land</option>
          <option value="commercial">Commercial</option>
        </select>
        <div className="grid grid-cols-2 gap-4">
          <input type="number" placeholder="Bedrooms" value={form.bedrooms} className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, bedrooms: e.target.value })} />
          <input type="number" placeholder="Bathrooms" value={form.bathrooms} className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, bathrooms: e.target.value })} />
        </div>
        <input placeholder="Image URL (optional)" value={form.images} className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, images: e.target.value })} />
        <button className="rounded-full bg-primary py-2.5 font-semibold text-white">Save Changes</button>
      </form>
    </div>
  );
}