import Image from "next/image";
import { business } from "@/lib/data";
import { Panel, ScriptHeading } from "@/components/ui";
import { BoltIcon, CupIcon, HeartSolid, InstagramIcon, PancakeIcon } from "@/components/icons";

const OFFER = [
  { title: "Specialty Lattes", desc: "Our signature iced lattes for your guests.", Icon: CupIcon },
  { title: "Redbull Bar", desc: "Build-your-own Redbulls in fun flavors.", Icon: BoltIcon },
  { title: "Pancake Boxes", desc: "Mini pancake boxes with all the toppings.", Icon: PancakeIcon },
];

const EVENTS = ["Birthday parties", "Baby & bridal showers", "Quinceañeras", "Work events", "School events", "Special occasions"];

export default function CateringPage() {
  return (
    <div className="mx-auto max-w-6xl px-3 sm:px-6">
      <section className="mt-4 overflow-hidden rounded-3xl bg-blush-deep grid md:grid-cols-2 items-center">
        <div className="px-6 sm:px-10 py-10">
          <h1 className="font-script text-berry text-7xl sm:text-8xl leading-none -rotate-2">Catering</h1>
          <p className="mt-4 font-semibold tracking-[0.15em] uppercase text-ink">Events & Parties</p>
          <p className="mt-4 max-w-md text-ink-soft text-lg">
            Perfect for parties, work, and special occasions! Bring El Cafecito Conmigo to your next celebration.
          </p>
        </div>
        <div className="relative aspect-[362/220]">
          <Image src="/images/catering-photo.jpg" alt="Drink carrier with three specialty drinks" fill priority sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
        </div>
      </section>

      <div className="mt-5 grid sm:grid-cols-3 gap-5">
        {OFFER.map(({ title, desc, Icon }) => (
          <Panel key={title} className="p-6 text-center">
            <Icon className="mx-auto w-11 h-11 text-berry" />
            <p className="mt-3 font-script text-berry text-4xl">{title}</p>
            <p className="mt-1 text-ink-soft">{desc}</p>
          </Panel>
        ))}
      </div>

      <Panel className="mt-5 p-6 sm:p-8 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <ScriptHeading>Perfect for…</ScriptHeading>
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {EVENTS.map((e) => (
              <li key={e} className="flex items-center gap-2">
                <HeartSolid className="w-4 h-4 text-berry" /> {e}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-white p-6 text-center">
          <p className="text-lg">Ready to book? DM us for a quote!</p>
          <a
            href={business.instagramUrl}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-berry hover:bg-berry-dark text-white font-semibold px-7 py-3.5 transition-colors"
          >
            <InstagramIcon className="w-5 h-5" /> DM for a Quote
          </a>
        </div>
      </Panel>
    </div>
  );
}
