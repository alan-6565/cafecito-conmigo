import Image from "next/image";
import Link from "next/link";
import type { Drink } from "@/lib/data";
import { ArrowRightIcon, HeartDoodle } from "@/components/icons";

export function Button({
  href,
  children,
  variant = "solid",
  arrow = true,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  arrow?: boolean;
  className?: string;
}) {
  const styles =
    variant === "solid"
      ? "bg-berry hover:bg-berry-dark text-white shadow-[0_10px_20px_-10px_rgba(224,48,110,0.8)]"
      : "border-2 border-berry text-berry bg-white/70 hover:bg-berry hover:text-white";
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold px-8 py-3.5 transition-colors ${styles} ${className}`}
    >
      {children} {arrow && <ArrowRightIcon className="w-4 h-4" />}
    </Link>
  );
}

export function ScriptHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`inline-flex items-center gap-3 font-script text-berry text-5xl sm:text-6xl leading-tight ${className}`}>
      {children}
      <HeartDoodle className="w-8 h-8 text-berry/70 rotate-12" />
    </h2>
  );
}

/** Pink panel with soft border used for every section card */
export function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-3xl bg-petal/80 border border-white shadow-[0_18px_40px_-28px_rgba(194,31,90,0.6)] ${className}`}>{children}</div>;
}

export function DrinkCard({ drink, showDesc = false }: { drink: Drink; showDesc?: boolean }) {
  return (
    <div className="flex flex-col rounded-2xl bg-white overflow-hidden shadow-sm">
      <div className="relative aspect-[213/200]">
        <Image src={drink.image} alt={drink.name} fill sizes="(min-width:1024px) 20vw, 45vw" className="object-cover object-top" />
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <p className="font-bold leading-tight text-sm sm:text-base">{drink.name}</p>
        {showDesc && drink.desc && <p className="mt-1 text-xs text-ink-soft leading-snug">{drink.desc}</p>}
        <p className="mt-auto pt-2 flex flex-wrap gap-x-3 text-sm text-ink-soft">
          <span className="whitespace-nowrap">M: ${drink.m}</span>
          <span className="whitespace-nowrap">L: ${drink.l}</span>
        </p>
      </div>
    </div>
  );
}
