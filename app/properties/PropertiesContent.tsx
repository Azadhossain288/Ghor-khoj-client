"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { DIVISIONS } from "@/lib/constants";
import PropertyCard from "@/components/PropertyCard";

export default function PropertiesContent() {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [filters, setFilters] = useState({
    q: "",
    location: "",
    division: "",
    type: searchParams.get("type") || "",
    sort: "newest",
  });

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ ...filters, page: String(page) });
    api
      .getProperties(params)
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
      })
      .finally(() => setLoading(false));
  }, [filters, page]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <h1 className="mb-6 text-2xl font-bold text-white">Explore Properties</h1>

      {/* Search + filters */}
      <div className="mb-8 grid gap-3 md:grid-cols-6">
        <input
          placeholder="Search by title..."
          className="rounded-full border border-slate-700 bg-surface px-4 py-2 text-sm text-white placeholder:text-slate-400 md:col-span-2"
          onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
        />
        <input
          placeholder="Location"
          className="rounded-full border border-slate-700 bg-surface px-4 py-2 text-sm text-white placeholder:text-slate-400"
          onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
        />
        <select
          className="rounded-full border border-slate-700 bg-surface px-4 py-2 text-sm text-white placeholder:text-slate-400"
          onChange={(e) => setFilters((f) => ({ ...f, division: e.target.value }))}
        >
          <option value="">All divisions</option>
          {DIVISIONS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select
          value={filters.type}
          className="rounded-full border border-slate-700 bg-surface px-4 py-2 text-sm text-white placeholder:text-slate-400"
          onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
        >
          <option value="">All types</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="land">Land</option>
          <option value="commercial">Commercial</option>
        </select>
        <select
          className="rounded-full border border-slate-700 bg-surface px-4 py-2 text-sm text-white placeholder:text-slate-400"
          onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}
        >
          <option value="newest">Newest</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="popular">Most Viewed</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-2xl bg-slate-700" />
            ))
          : items.map((p) => <PropertyCard key={p._id} property={p} />)}
      </div>

      {!loading && items.length === 0 && <p className="mt-10 text-center text-slate-400">No properties found.</p>}

      {/* Pagination */}
      <div className="mt-10 flex justify-center gap-2">
        {Array.from({ length: pages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`h-9 w-9 rounded-full text-sm ${
              page === i + 1 ? "bg-primary text-white" : "bg-surface text-white border border-slate-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}