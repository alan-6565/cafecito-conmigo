"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { business, navLinks } from "@/lib/data";
import { BagIcon, CloseIcon, InstagramIcon, MenuIcon, TikTokIcon } from "@/components/icons";

export function Logo({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <Link href="/" aria-label="El Cafecito Conmigo home" className={`relative shrink-0 rounded-full overflow-hidden border-4 border-white shadow-md ${className}`}>
      <Image src="/images/logo.jpg" alt="El Cafecito Conmigo logo" fill sizes="96px" className="object-cover" />
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 px-3 sm:px-6 pt-3">
      <div className="mx-auto max-w-7xl rounded-2xl bg-petal/95 backdrop-blur shadow-[0_10px_30px_-20px_rgba(194,31,90,0.7)] px-4 sm:px-6 h-18 flex items-center justify-between gap-6">
        <Logo className="w-16 h-16 sm:w-20 sm:h-20 sm:translate-y-3" />

        <nav className="hidden lg:flex items-center gap-9 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`pb-1 border-b-2 transition-colors ${
                isActive(link.href) ? "text-berry border-berry" : "text-ink border-transparent hover:text-berry"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          <a href={business.instagramUrl} aria-label="Instagram" className="hidden sm:block p-2 text-berry">
            <InstagramIcon className="w-6 h-6" />
          </a>
          <a href={business.tiktokUrl} aria-label="TikTok" className="hidden sm:block p-2 text-ink">
            <TikTokIcon className="w-5.5 h-5.5" />
          </a>
          <Link href="/order" className="hidden sm:inline-flex rounded-full bg-berry hover:bg-berry-dark text-white font-semibold px-6 py-2.5 transition-colors">
            Order Now
          </Link>
          <Link href="/order" aria-label="Order" className="p-2 text-berry">
            <BagIcon className="w-6 h-6" />
          </Link>
          <button onClick={() => setOpen((o) => !o)} aria-label={open ? "Close menu" : "Open menu"} className="lg:hidden p-2 text-ink">
            {open ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden mx-auto max-w-7xl mt-2 rounded-2xl bg-petal shadow-lg p-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`rounded-xl px-4 py-3 text-lg font-medium ${isActive(link.href) ? "bg-blush-deep text-berry" : "text-ink"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
