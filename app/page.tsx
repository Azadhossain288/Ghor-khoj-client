"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";

const NEIGHBORHOODS = ["Gulshan", "Dhanmondi", "Uttara", "Banani", "Mirpur", "Bashundhara", "Baridhara", "Mohammadpur"];

const CATEGORIES = [
  { label: "Apartments", type: "apartment", emoji: "🏢" },
  { label: "Houses", type: "house", emoji: "🏡" },
  { label: "Land", type: "land", emoji: "🌾" },
  { label: "Commercial", type: "commercial", emoji: "🏬" },
];

const FEATURES = [
  { title: "AI Recommendation Engine", desc: "The more you browse and save, the sharper your matches get — no manual filtering required." },
  { title: "AI Chat Assistant", desc: "Ask in plain language and get answers pulled from live listings, not guesses." },
  { title: "Verified Listings", desc: "Every property is submitted by a real owner or agent — no scraped or duplicate posts." },
];

const STEPS = [
  { title: "Tell us what you need", desc: "Search, filter, or just ask the AI Assistant in plain language." },
  { title: "Get matched", desc: "Recommendations sharpen automatically as you view and save properties." },
  { title: "Compare & shortlist", desc: "Side-by-side specs, photos, and pricing for everything you're considering." },
  { title: "Contact & visit", desc: "Message the owner directly and schedule a visit — no middleman delay." },
];

const TESTIMONIALS = [
  { name: "Farhana Ahmed", role: "Renter, Dhanmondi", quote: "I described my budget and commute needs to the AI Assistant and had three real listings to compare within minutes." },
  { name: "Rakib Hasan", role: "Buyer, Uttara", quote: "The recommendations got sharper the more I browsed — by the second week it was surfacing exactly what I wanted." },
  { name: "Nusrat Jahan", role: "Owner, Gulshan", quote: "Listing my apartment took under five minutes, and I started getting genuine inquiries the same day." },
];

const BLOG_POSTS = [
  { title: "5 Things to Check Before Renting in Dhaka", excerpt: "A practical checklist covering utility connections, verbal promises to get in writing, and questions worth asking before you sign." },
  { title: "Gulshan vs Dhanmondi: A Price Breakdown", excerpt: "What actually drives the per-square-foot gap between Dhaka's two most-searched neighborhoods, block by block." },
  { title: "How AI Is Changing Property Search", excerpt: "Why recommendation engines and chat assistants are becoming standard tools for finding a home, not just browsing one." },
];

const FAQS = [
  { q: "Is GhorKhoj free to use?", a: "Yes — searching, browsing, and contacting owners is completely free for renters and buyers." },
  { q: "How does the AI Assistant know about listings?", a: "It queries our live property database directly, so answers reflect what's actually posted, not a guess." },
  { q: "Can I edit a listing after posting it?", a: "Yes, from Manage Properties you can edit or delete anything you've listed." },
];

export default function HomePage() {
  const [featured, setFeatured] = useState<any[]>([]);
  const [totalListings, setTotalListings] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams({ sort: "newest", limit: "4" });
    api.getProperties(params).then((d) => {
      setFeatured(d.items || []);
      setTotalListings(d.total ?? 0);
    });
  }, []);

  return (
    <div className="font-sans">
      

      {/* 1. HERO — text left, staggered 3-image collage right */}
   <section className="relative overflow-hidden bg-primary px-4 py-16 text-white md:px-8">
   <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
    {/* Left — copy, CTA, stats */}
    <div>
      <p className="mb-4 text-xs uppercase tracking-[0.35em] text-accent">Dhaka · Chattogram · Sylhet</p>
      <h1 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl">
        Find a home
        <br />
        <span className="text-white/40">that fits</span>
        <br />
        <span className="text-accent">your life.</span>
      </h1>
      <p className="mt-6 max-w-sm text-white/70">
        Search real listings, get recommendations that improve as you browse, and ask
        our AI Assistant anything — it checks the live database before it answers.
      </p>
      <Link
        href="/properties"
        className="mt-8 inline-block rounded-full bg-accent px-8 py-3 font-semibold text-primary transition hover:scale-105"
      >
        Explore Properties
      </Link>

      <div className="mt-12 flex gap-10">
        <div>
          <p className="font-display text-4xl font-bold text-accent">
            {totalListings === null ? "—" : totalListings}
          </p>
          <p className="text-xs uppercase tracking-wide text-white/50">Live Listings</p>
        </div>
        <div>
          <p className="font-display text-4xl font-bold text-accent">8</p>
          <p className="text-xs uppercase tracking-wide text-white/50">Divisions Covered</p>
        </div>
      </div>
    </div>

    {/* Right — staggered 3-image collage */}
    <div className="relative mx-auto h-[420px] w-full max-w-md">
      <img
        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop"
        alt="Modern living room interior"
        className="absolute left-0 top-0 h-64 w-64 rounded-3xl border-4 border-primary object-cover shadow-2xl"
      />
      <img
        src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop"
        alt="Apartment building exterior"
        className="absolute right-0 top-10 h-48 w-48 rounded-3xl border-4 border-primary object-cover shadow-2xl"
      />
      <img
        src="https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800&auto=format&fit=crop"
        alt="Bright modern bedroom"
        className="absolute bottom-0 left-16 h-52 w-52 rounded-3xl border-4 border-primary object-cover shadow-2xl"
      />
    </div>
  </div>
</section>

      <div className="overflow-hidden border-y border-slate-800 bg-surface py-3">
        <div className="flex animate-[marquee_28s_linear_infinite] gap-10 whitespace-nowrap text-sm font-medium text-slate-400">
          {[...NEIGHBORHOODS, ...NEIGHBORHOODS, ...NEIGHBORHOODS].map((n, i) => (
            <span key={i} className="flex items-center gap-10">
              {n}
              <span className="text-accent">·</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }`}</style>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">Featured Properties</h2>
          <Link href="/properties" className="text-sm font-medium text-accent">View all →</Link>
        </div>
        {featured.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-slate-700 p-8 text-center text-slate-400">
            No properties listed yet — add the first one from "Add Property".
          </p>
        )}
      </section>

      <section className="bg-neutral py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="mb-8 font-display text-2xl font-semibold text-white md:text-3xl">Browse by Category</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {CATEGORIES.map((c) => (
              <Link
                key={c.type}
                href={`/properties?type=${c.type}`}
                className="flex flex-col items-center gap-2 rounded-2xl border border-slate-800 bg-surface p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-3xl">{c.emoji}</span>
                <span className="font-medium text-white">{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h2 className="mb-8 font-display text-2xl font-semibold text-white md:text-3xl">Why GhorKhoj</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-800 bg-surface p-6 shadow-sm">
              <h3 className="font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="mb-8 font-display text-2xl font-semibold md:text-3xl">How It Works</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.title} className="rounded-2xl bg-white/5 p-6">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-accent font-bold text-primary">
                  {i + 1}
                </div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-white/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h2 className="mb-8 font-display text-2xl font-semibold text-white md:text-3xl">What People Say</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-2xl border border-slate-800 bg-surface p-6 shadow-sm">
              <p className="text-sm italic text-slate-300">"{t.quote}"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 font-semibold text-accent">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-neutral py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">From the Blog</h2>
            <Link href="/blog" className="text-sm font-medium text-accent">Read more →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {BLOG_POSTS.map((p) => (
              <div key={p.title} className="rounded-2xl border border-slate-800 bg-surface p-6 shadow-sm">
                <h3 className="font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{p.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 md:px-8">
        <h2 className="mb-8 font-display text-2xl font-semibold text-white md:text-3xl">Frequently Asked Questions</h2>
        <div className="divide-y divide-slate-800 rounded-2xl border border-slate-800 bg-surface">
          {FAQS.map((f, i) => (
            <div key={f.q}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left font-medium text-white"
              >
                {f.q}
                <span className="text-accent">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <p className="px-6 pb-4 text-sm text-slate-400">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 text-center md:px-8">
        <h2 className="font-display text-2xl font-semibold text-white">Stay in the loop</h2>
        <p className="mt-2 text-slate-400">New listings and market notes, occasionally — no spam.</p>
        <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-5 flex max-w-md gap-2">
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="flex-1 rounded-full border border-slate-700 bg-surface px-4 py-2 text-sm text-white placeholder:text-slate-400 outline-none focus:border-accent"
          />
          <button className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white">Subscribe</button>
        </form>

        <div className="mt-14 rounded-3xl bg-primary px-8 py-12 text-white">
          <h2 className="font-display text-2xl font-semibold">List Your Property Today</h2>
          <p className="mt-2 text-white/70">Reach active buyers and renters across Dhaka.</p>
          <Link
            href="/properties/add"
            className="mt-6 inline-block rounded-full bg-accent px-8 py-3 font-semibold text-primary"
          >
            Add Property
          </Link>
        </div>
      </section>
    </div>
  );
}