import Image from "next/image";
import { lattes, matchas, redbulls } from "@/lib/data";
import { Button, DrinkCard, Panel, ScriptHeading } from "@/components/ui";
import { BoltIcon, CupIcon, HeartDoodle, PancakeIcon, StarIcon } from "@/components/icons";

const TABS = [
  { label: "Specialty Lattes", href: "#lattes", Icon: CupIcon },
  { label: "Matcha Lattes", href: "#matcha", Icon: HeartDoodle },
  { label: "Redbulls", href: "#redbulls", Icon: BoltIcon },
  { label: "Seasonal", href: "#lattes", Icon: StarIcon },
  { label: "Pancake Boxes", href: "#pancake-boxes", Icon: PancakeIcon },
];

function PriceNote({ children }: { children: React.ReactNode }) {
  return <p className="rounded-full bg-blush-deep/70 px-5 py-2 text-sm text-berry-dark text-center">{children}</p>;
}

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-6">
      {/* Banner */}
      <section className="relative mt-4 overflow-hidden rounded-3xl bg-blush-deep">
        <div className="relative aspect-[420/300] md:aspect-auto md:absolute md:inset-y-0 md:right-0 md:w-1/2">
          <Image src="/images/menu-hero.jpg" alt="Four specialty drinks topped with whipped cream" fill priority sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
          <div className="hidden md:block absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-blush-deep to-transparent" />
        </div>
        <div className="relative px-6 sm:px-10 py-8 md:py-20 md:w-1/2">
          <h1 className="font-script text-berry text-7xl sm:text-8xl leading-none -rotate-3">Our Menu</h1>
          <p className="mt-4 font-semibold tracking-[0.12em] uppercase text-ink">Specialty Drinks · Redbulls · Matcha · More</p>
        </div>
      </section>

      {/* Category pills (jump links) */}
      <Panel className="mt-5 p-3 no-scrollbar flex gap-3 overflow-x-auto">
        {TABS.map(({ label, href, Icon }, i) => (
          <a
            key={label}
            href={href}
            className={`shrink-0 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium border ${
              i === 0 ? "bg-berry border-berry text-white" : "bg-white border-line text-ink hover:border-berry"
            }`}
          >
            <Icon className="w-5 h-5" /> {label}
          </a>
        ))}
      </Panel>

      {/* Lattes */}
      <Panel className="mt-5 p-5 sm:p-8 scroll-mt-28" >
        <div id="lattes" className="flex flex-wrap items-center justify-between gap-4 scroll-mt-28">
          <ScriptHeading>Specialty Iced Lattes</ScriptHeading>
          <PriceNote>
            Sizes: Medium (16oz) $6 | Large (24oz) $8 · Sub almond or oat milk: $1 · Sugar free options available!
          </PriceNote>
        </div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {lattes.map((d) => (
            <DrinkCard key={d.name} drink={d} showDesc />
          ))}
        </div>
      </Panel>

      <div className="mt-5 grid lg:grid-cols-3 gap-5">
        {/* Matcha */}
        <Panel className="p-5 sm:p-6">
          <div id="matcha" className="scroll-mt-28 text-center">
            <ScriptHeading className="!text-5xl">Matcha Lattes</ScriptHeading>
            <p className="text-sm text-ink-soft">Comes with dairy milk</p>
            <p className="mt-1 text-sm text-berry-dark">Sub almond milk: $1 | Sub oat milk: $1</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {matchas.map((d) => (
              <DrinkCard key={d.name} drink={d} />
            ))}
          </div>
        </Panel>

        {/* Redbulls */}
        <Panel className="p-5 sm:p-6">
          <div id="redbulls" className="scroll-mt-28 text-center">
            <ScriptHeading className="!text-5xl">Redbulls</ScriptHeading>
            <p className="text-sm text-berry-dark">Sizes: Medium (16oz) $7 | Large (24oz) $9</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {redbulls.map((d) => (
              <DrinkCard key={d.name} drink={d} />
            ))}
          </div>
        </Panel>

        {/* Pancake boxes */}
        <Panel className="p-5 sm:p-6 flex flex-col">
          <div id="pancake-boxes" className="scroll-mt-28 text-center">
            <ScriptHeading className="!text-5xl">Pancake Boxes</ScriptHeading>
            <p className="text-sm text-ink-soft">Build your own mini pancake box! Choose your toppings and create your perfect box.</p>
          </div>
          <div className="relative mt-4 flex-1 min-h-48 rounded-2xl overflow-hidden">
            <Image src="/images/pancake-small.jpg" alt="Mini pancake box with toppings" fill sizes="(min-width:1024px) 30vw, 90vw" className="object-cover" />
          </div>
        </Panel>
      </div>

      <Panel className="mt-5 px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-script text-berry text-4xl sm:text-5xl">New Seasonal Drinks Always! ♡</p>
        <Button href="/order" variant="outline">
          Order Online
        </Button>
      </Panel>
    </div>
  );
}
