"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { api } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";

const TYPES = [
  { key: "apartment", label: "Apartment", emoji: "🏢" },
  { key: "house", label: "House", emoji: "🏡" },
  { key: "land", label: "Land", emoji: "🌾" },
  { key: "commercial", label: "Commercial", emoji: "🏬" },
];

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("all"); // "all" | type key
  const [recs, setRecs] = useState<any[]>([]);

  useEffect(() => {
    if (!session) return;
    api.getMyProperties().then((d) => {
      setItems(d.items);
      setLoading(false);
    });
    api.getRecommendations().then((d) => setRecs(d.items));
  }, [session]);

  if (isPending) return null;
  if (!session) {
    router.push("/login");
    return null;
  }

  const counts = TYPES.reduce<Record<string, number>>((acc, t) => {
    acc[t.key] = items.filter((p) => p.type === t.key).length;
    return acc;
  }, {});

  const visible = activeFilter === "all" ? items : items.filter((p) => p.type === activeFilter);

  async function handleDelete(id: string) {
    if (!confirm("Delete this listing? This can't be undone.")) return;
    await api.deleteProperty(id);
    setItems((prev) => prev.filter((p) => p._id !== id));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <h1 className="mb-1 text-2xl font-bold text-primary">Welcome back, {session.user.name}</h1>
      <p className="mb-8 text-slate-500">Manage your listings and see how they're performing.</p>

      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:sticky md:top-20">
          <button
            onClick={() => setActiveFilter("all")}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold ${
              activeFilter === "all" ? "bg-primary text-white" : "text-primary hover:bg-neutral"
            }`}
          >
            <span>Total Listings</span>
            <span>{items.length}</span>
          </button>

          <p className="mb-2 mt-4 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">By Category</p>
          <div className="flex flex-col gap-1">
            {TYPES.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveFilter(t.key)}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ${
                  activeFilter === t.key ? "bg-accent/20 font-semibold text-primary" : "text-slate-600 hover:bg-neutral"
                }`}
              >
                <span>{t.emoji} {t.label}</span>
                <span>{counts[t.key]}</span>
              </button>
            ))}
          </div>

          <Link
            href="/properties/add"
            className="mt-6 block rounded-full bg-primary py-2 text-center text-sm font-semibold text-white"
          >
            + Add Property
          </Link>
        </aside>

        {/* Main content */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-primary">
              {activeFilter === "all" ? "All Listings" : TYPES.find((t) => t.key === activeFilter)?.label}
              <span className="ml-2 text-sm font-normal text-slate-400">({visible.length})</span>
            </h2>
          </div>

          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-14 animate-pulse rounded-xl bg-slate-200" />
              ))}
            </div>
          ) : visible.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-400">
              No listings in this category yet.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-neutral text-slate-500">
                  <tr>
                    <th className="p-3">Title</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Views</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((p) => (
                    <tr key={p._id} className="border-t border-slate-100">
                      <td className="p-3 font-medium text-primary">{p.title}</td>
                      <td className="p-3 capitalize text-slate-500">{p.type}</td>
                      <td className="p-3">{p.location}</td>
                      <td className="p-3">৳{p.price.toLocaleString()}</td>
                      <td className="p-3">{p.views}</td>
                      <td className="p-3 space-x-3">
                        <Link href={`/properties/${p._id}`} className="text-accent">View</Link>
                        <Link href={`/properties/edit/${p._id}`} className="text-primary underline">Edit</Link>
                        <button onClick={() => handleDelete(p._id)} className="text-red-500">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* AI Recommendations */}
          {recs.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-4 font-semibold text-primary">Recommended for You</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recs.map(({ property, reason }) => (
                  <div key={property._id} className="flex flex-col gap-2">
                    <PropertyCard property={property} />
                    <p className="text-xs italic text-slate-400">✨ {reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
