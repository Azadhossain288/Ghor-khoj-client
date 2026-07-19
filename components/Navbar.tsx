"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const loggedOutLinks = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "Explore" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const loggedInLinks = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "Explore" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/properties/add", label: "Add Property" },
    { href: "/properties/manage", label: "Manage" },
    { href: "/chat", label: "AI Assistant" },
  ];

  const links = session ? loggedInLinks : loggedOutLinks;

  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-white shadow-sm">
      <nav className="mx-auto grid max-w-7xl grid-cols-2 items-center px-4 py-3 md:grid-cols-[1fr_auto_1fr] md:px-8">
        <Link href="/" className="text-lg font-bold text-accent" onClick={() => setOpen(false)}>
          GhorKhoj
        </Link>

        {/* Desktop links — centered */}
        <div className="hidden items-center justify-center gap-6 text-sm md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Login/Logout — right aligned */}
        <div className="hidden justify-end md:flex">
          {session ? (
            <button onClick={() => signOut()} className="rounded-full bg-accent px-4 py-1.5 text-sm text-primary">
              Logout
            </button>
          ) : (
            <Link href="/login" className="rounded-full bg-accent px-4 py-1.5 text-sm text-primary">
              Login
            </Link>
          )}
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center justify-self-end rounded-lg md:hidden"
          aria-label="Toggle menu"
        >
          <span className="relative block h-4 w-6">
            <span className={`absolute left-0 top-0 h-0.5 w-6 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-6 bg-white transition ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-3 h-0.5 w-6 bg-white transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="flex flex-col gap-1 border-t border-white/10 bg-primary px-4 pb-4 pt-2 text-sm md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-lg px-2 py-2 hover:bg-white/10" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          {session ? (
            <button
              onClick={() => {
                signOut();
                setOpen(false);
              }}
              className="mt-2 rounded-full bg-accent px-4 py-2 text-primary"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="mt-2 rounded-full bg-accent px-4 py-2 text-center text-primary" onClick={() => setOpen(false)}>
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
