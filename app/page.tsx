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
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams({ sort: "newest", limit: "4" });
    api.getProperties(params).then((d) => setFeatured(d.items || []));
  }, []);

  return (
    <div className="font-sans">
      {/* 1. HERO */}
      <section className="relative flex h-[68vh] min-h-[520px] items-center overflow-hidden bg-primary">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/20" />
        <div className="relative mx-auto max-w-4xl px-4 text-center text-white md:px-8">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-accent">Dhaka · Chattogram · Sylhet</p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
            Find your next home,
            <br />
            <span className="text-accent">guided by AI.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-white/80">
            Search real listings, get recommendations that improve as you browse, and ask our
            assistant anything — it checks the live database before it answers.
          </p>
          <Link
            href="/properties"
            className="mt-8 inline-block rounded-full bg-accent px-8 py-3 font-semibold text-primary transition hover:scale-105"
          >
            Explore Properties
          </Link>
        </div>
      </section>

      {/* Signature element — scrolling neighborhood ticker */}
      <div className="overflow-hidden border-y border-slate-200 bg-white py-3">
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

      {/* 2. FEATURED PROPERTIES */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold text-primary md:text-3xl">Featured Properties</h2>
          <Link href="/properties" className="text-sm font-medium text-accent">View all →</Link>
        </div>
        {featured.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-400">
            No properties listed yet — add the first one from "Add Property".
          </p>
        )}
      </section>

      {/* 3. CATEGORIES */}
      <section className="bg-neutral py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="mb-8 font-display text-2xl font-semibold text-primary md:text-3xl">Browse by Category</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {CATEGORIES.map((c) => (
              <Link
                key={c.type}
                href={`/properties?type=${c.type}`}
                className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-3xl">{c.emoji}</span>
                <span className="font-medium text-primary">{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY GHORKHOJ */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h2 className="mb-8 font-display text-2xl font-semibold text-primary md:text-3xl">Why GhorKhoj</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-primary">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
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

      {/* 6. TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h2 className="mb-8 font-display text-2xl font-semibold text-primary md:text-3xl">What People Say</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm italic text-slate-600">"{t.quote}"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 font-semibold text-accent">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. BLOG HIGHLIGHTS */}
      <section className="bg-neutral py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold text-primary md:text-3xl">From the Blog</h2>
            <Link href="/blog" className="text-sm font-medium text-accent">Read more →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {BLOG_POSTS.map((p) => (
              <div key={p.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-primary">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{p.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-8">
        <h2 className="mb-8 font-display text-2xl font-semibold text-primary md:text-3xl">Frequently Asked Questions</h2>
        <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {FAQS.map((f, i) => (
            <div key={f.q}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left font-medium text-primary"
              >
                {f.q}
                <span className="text-accent">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <p className="px-6 pb-4 text-sm text-slate-500">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER + CTA */}
      <section className="mx-auto max-w-3xl px-4 pb-16 text-center md:px-8">
        <h2 className="font-display text-2xl font-semibold text-primary">Stay in the loop</h2>
        <p className="mt-2 text-slate-500">New listings and market notes, occasionally — no spam.</p>
        <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-5 flex max-w-md gap-2">
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm outline-none focus:border-accent"
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
