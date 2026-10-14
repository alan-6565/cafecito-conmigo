import Image from "next/image";
import { business } from "@/lib/data";
import { Button, Panel, ScriptHeading } from "@/components/ui";
import { CarIcon, HeartSolid, InstagramIcon, PinIcon } from "@/components/icons";

const STEPS = [
  { title: "Follow us", desc: `You must be following ${business.handle} to place an order.` },
  { title: "Pick your drinks", desc: "Browse the menu and choose your size (M or L), milk, and any custom touches." },
  { title: "Send your order", desc: "DM us on Instagram with your drinks, pickup or delivery, and the time you'd like." },
  { title: "We confirm ♡", desc: "We'll confirm your order, total, and pickup or delivery details." },
];

export default function OrderPage() {
  return (
    <div className="mx-auto max-w-6xl px-3 sm:px-6">
      <section className="mt-8 text-center">
        <h1 className="font-script text-berry text-7xl sm:text-8xl -rotate-2">Order Online</h1>
        <p className="mt-3 font-semibold tracking-[0.15em] uppercase text-ink">Pickup or delivery in {business.city}</p>
      </section>

      <div className="mt-10 grid lg:grid-cols-[1.2fr_1fr] gap-5">
        <Panel className="p-6 sm:p-8">
          <ScriptHeading>How to Order</ScriptHeading>
          <ol className="mt-6 space-y-5">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="grid place-items-center w-10 h-10 rounded-full bg-berry text-white font-bold shrink-0">{i + 1}</span>
                <div>
                  <p className="font-bold text-lg">{s.title}</p>
                  <p className="text-ink-soft">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={business.instagramUrl}
              className="inline-flex items-center gap-2 rounded-full bg-berry hover:bg-berry-dark text-white font-semibold px-7 py-3.5 transition-colors"
            >
              <InstagramIcon className="w-5 h-5" /> DM to Order
            </a>
            <Button href="/menu" variant="outline" arrow={false}>
              View Menu
            </Button>
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel className="p-6 sm:p-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white p-5 text-center">
              <PinIcon className="mx-auto w-9 h-9 text-berry" />
              <p className="mt-2 font-bold">Pickup</p>
              <p className="text-sm text-ink-soft">Home-based in {business.city}</p>
            </div>
            <div className="rounded-2xl bg-white p-5 text-center">
              <CarIcon className="mx-auto w-9 h-9 text-berry" />
              <p className="mt-2 font-bold">Delivery</p>
              <p className="text-sm text-ink-soft">Available in the Hayward area</p>
            </div>
          </Panel>
          <Panel className="relative overflow-hidden aspect-[352/239]">
            <Image src="/images/featured.jpg" alt="Chocolate cookie latte" fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" />
            <p className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 rounded-full bg-white/90 py-2 font-note text-2xl text-berry">
              Good Drinks, Good Energy, Always <HeartSolid className="w-4 h-4" />
            </p>
          </Panel>
        </div>
      </div>
    </div>
  );
}
