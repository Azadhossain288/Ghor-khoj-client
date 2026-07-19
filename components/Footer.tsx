import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 bg-primary text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-8">
        <div>
          <h3 className="text-lg font-bold text-accent">GhorKhoj</h3>
          <p className="mt-2 text-sm text-white/70">
            AI-powered property search — find your next home faster, with recommendations built around you.
          </p>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Quick Links</h4>
          <ul className="space-y-1 text-sm text-white/70">
            <li><Link href="/properties">Explore Properties</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/privacy">Privacy & Terms</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Contact</h4>
          <p className="text-sm text-white/70">Email:azadhossain016288@gmail.com</p>
          <p className="text-sm text-white/70">Contact No: +880 1628893299</p>
        </div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} GhorKhoj. All rights reserved.
      </p>
    </footer>
  );
}
