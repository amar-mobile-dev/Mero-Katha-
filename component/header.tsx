TypeScript 


"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Home, User } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/?type=buy", label: "Buy" },
    { href: "/?type=rent", label: "Rent" },
    { href: "/dashboard", label: "Dashboard" }
  ];

  return (
    <header className="site-header">
      <div className="nav-container">
        <Link href="/" className="brand">
          <span className="brand-icon"><Home size={22} /></span>
          <span>Mero<span className="brand-highlight">Kothaa</span></span>
        </Link>

        <nav className="desktop-nav">
          {links.map((link) => (
            <Link key={link.href + link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <Link href="/login" className="login-link">
            <User size={17} /> Login
          </Link>
          <Link href="/dashboard" className="post-button">
            + Post Property
          </Link>
        </div>

        <button
          className="mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="mobile-nav">
          {links.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
          <Link href="/dashboard" onClick={() => setOpen(false)}>
            Post Property
          </Link>
        </nav>
      )}
    </header>
  );
}
