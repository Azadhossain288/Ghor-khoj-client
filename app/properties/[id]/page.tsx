"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";

export default function PropertyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    api.getProperty(id).then(setData);
    api.trackInteraction(id, "view").catch(() => {}); // silently fails if not logged in
  }, [id]);

  if (!data) return <div className="p-10 text-center text-slate-400">Loading...</div>;
  const { property, related } = data;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-8">
      <img
        src={property.images?.[0] || "https://placehold.co/800x400?text=GhorKhoj"}
        className="h-80 w-full rounded-2xl object-cover"
        alt={property.title}
      />

      <div className="mt-6 flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <h1 className="text-2xl font-bold text-primary">{property.title}</h1>
        <span className="text-xl font-bold text-accent">৳{property.price.toLocaleString()}</span>
      </div>
      <p className="text-slate-500">{property.location}</p>

      <section className="mt-6">
        <h2 className="mb-2 font-semibold text-primary">Description</h2>
        <p className="text-slate-600">{property.fullDescription}</p>
      </section>

      <section className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Spec label="Type" value={property.type} />
        <Spec label="Bedrooms" value={property.bedrooms} />
        <Spec label="Bathrooms" value={property.bathrooms} />
        <Spec label="Area" value={`${property.areaSqft || "-"} sqft`} />
      </section>

      {/* Contact / Inquiry form */}
      <section className="mt-10 rounded-2xl border border-slate-200 p-6">
        <h2 className="mb-4 font-semibold text-primary">Contact Agent</h2>
        {sent ? (
          <p className="text-success">Thanks! The owner will get back to you soon.</p>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await api.sendInquiry({ propertyId: property._id, ...form });
              setSent(true);
            }}
            className="grid gap-3"
          >
            <input required placeholder="Your name" className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input required type="email" placeholder="Email" className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <textarea required placeholder="Message" className="rounded-lg border px-3 py-2 text-sm" onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <button className="rounded-full bg-primary py-2 text-sm text-white">Send Inquiry</button>
          </form>
        )}
      </section>

      {related?.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 font-semibold text-primary">Related Properties</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p: any) => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Spec({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-xl bg-neutral p-4 text-center">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="font-semibold text-primary">{value}</p>
    </div>
  );
}
