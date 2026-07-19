export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-8">
      <h1 className="mb-6 text-3xl font-bold text-primary">About GhorKhoj</h1>
      <p className="mb-4 text-slate-600">
        GhorKhoj is an AI-powered real estate platform built to make finding a home in
        Bangladesh faster and less overwhelming. Instead of scrolling through hundreds of
        listings, our AI Assistant and Recommendation Engine help you narrow down exactly
        what fits your budget, location, and lifestyle.
      </p>
      <p className="mb-4 text-slate-600">
        Every listing on GhorKhoj is submitted by property owners or agents directly through
        our platform, giving buyers and renters a direct line to the source.
      </p>
      <h2 className="mb-3 mt-8 text-xl font-semibold text-primary">Our Mission</h2>
      <p className="text-slate-600">
        To combine practical AI tools with a clean, honest property search experience —
        no clutter, no fake listings, no guesswork.
      </p>

      <h2 className="mb-3 mt-8 text-xl font-semibold text-primary">How We're Different</h2>
      <ul className="list-disc space-y-2 pl-5 text-slate-600">
        <li>AI Chat Assistant that searches live listings instead of giving generic answers</li>
        <li>Recommendations that improve the more you browse and save properties</li>
        <li>No placeholder or fake listings — every property is added by a real owner or agent</li>
      </ul>
    </div>
  );
}
