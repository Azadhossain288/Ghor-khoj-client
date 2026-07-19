const posts = [
  {
    title: "5 Things to Check Before Renting in Dhaka",
    excerpt:
      "A practical checklist for first-time renters — from utility connections to neighborhood safety and landlord verification.",
  },
  {
    title: "Understanding Property Prices in Gulshan vs Dhanmondi",
    excerpt:
      "A breakdown of what drives price differences between Dhaka's most searched neighborhoods, and what to expect per square foot.",
  },
  {
    title: "How AI Is Changing Property Search",
    excerpt:
      "Why recommendation engines and chat assistants are becoming standard in real estate platforms — and how GhorKhoj uses them.",
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      <h1 className="mb-8 text-3xl font-bold text-primary">GhorKhoj Blog</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <div key={p.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-2 font-semibold text-primary">{p.title}</h3>
            <p className="text-sm text-slate-500">{p.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
