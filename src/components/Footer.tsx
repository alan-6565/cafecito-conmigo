import Link from "next/link";
import { business, navLinks } from "@/lib/data";
import { HeartSolid, InstagramIcon, TikTokIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="mt-16 bg-berry text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-10 grid gap-8 md:grid-cols-[auto_1fr_auto] items-center text-center md:text-left">
        <div>
          <p className="font-script text-4xl leading-none">El Cafecito Conmigo</p>
          <p className="mt-2 text-xs tracking-[0.2em] uppercase text-white/80">{business.tagline}</p>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-white/85">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col items-center md:items-end gap-2 text-sm text-white/85">
          <span className="flex items-center gap-4">
            <a href={business.instagramUrl} aria-label="Instagram">
              <InstagramIcon className="w-6 h-6" />
            </a>
            <a href={business.tiktokUrl} aria-label="TikTok">
              <TikTokIcon className="w-5.5 h-5.5" />
            </a>
          </span>
          <span>{business.handle}</span>
          <span>Pickup & Delivery · {business.city}</span>
        </div>
      </div>
      <div className="border-t border-white/15 py-4 flex items-center justify-center gap-2 text-xs text-white/70">
        © {business.name} · Good Drinks, Good Energy, Always <HeartSolid className="w-3 h-3" />
      </div>
    </footer>
  );
}
