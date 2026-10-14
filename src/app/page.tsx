import Image from "next/image";
import Link from "next/link";
import { business, lattes, seasonal } from "@/lib/data";
import { Button, DrinkCard, Panel, ScriptHeading } from "@/components/ui";
import {
  ArrowRightIcon,
  BoltIcon,
  CarIcon,
  CupIcon,
  HeartDoodle,
  HeartSolid,
  HomeIcon,
  InstagramIcon,
  PancakeIcon,
  PeopleIcon,
  PinIcon,
  StarIcon,
  TikTokIcon,
} from "@/components/icons";

const PERKS = [
  { text: "Home-based in Hayward, CA", Icon: PinIcon },
  { text: "Specialty drinks & custom creations", Icon: CupIcon },
  { text: "Pickup & Delivery 🚚", Icon: CarIcon },
  { text: "Must be following to order", Icon: HeartSolid },
  { text: "New drinks always", Icon: StarIcon },
];

const FEATURES = [
  { title: "Specialty Iced Lattes", sub: "& Refreshers", Icon: CupIcon },
  { title: "Build Your Own", sub: "Redbulls", Icon: BoltIcon },
  { title: "Mini Pancake Boxes", sub: "& Treats", Icon: PancakeIcon },
  { title: "Catering", sub: "Events & Parties", Icon: PeopleIcon },
  { title: "Pickup & Delivery", sub: "Hayward, CA", Icon: HomeIcon },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-6">
      {/* Hero */}
      <section className="relative mt-4 overflow-hidden rounded-3xl bg-blush-deep">
        <div className="relative aspect-[589/420] md:aspect-auto md:absolute md:inset-y-0 md:right-0 md:w-[55%]">
          <Image src="/images/hero.jpg" alt="Three specialty iced lattes with El Cafecito Conmigo stickers" fill priority sizes="(min-width:768px) 55vw, 100vw" className="object-cover" />
          <div className="hidden md:block absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-blush-deep to-transparent" />
          <div className="md:hidden absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-blush-deep to-transparent" />
        </div>
        <div className="relative px-6 sm:px-10 pt-4 md:pt-16 pb-10 md:pb-14 md:w-[55%]">
          <HeartDoodle className="hidden md:block absolute top-6 left-6 w-8 h-8 text-berry/50" />
          <h1 className="font-script text-berry text-6xl sm:text-7xl lg:text-8xl leading-[0.95] -rotate-3 drop-shadow-[0_2px_0_rgba(255,255,255,0.9)]">
            El Cafecito Conmigo
          </h1>
          <p className="mt-4 text-sm sm:text-base font-semibold tracking-[0.12em] uppercase text-ink -rotate-2">
            Specialty Drinks · Redbulls · Matcha · More
          </p>
          <ul className="mt-6 space-y-2.5">
            {PERKS.map(({ text, Icon }) => (
              <li key={text} className="flex items-center gap-3 text-ink">
                <Icon className="w-6 h-6 text-berry shrink-0" /> {text}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/order">Order Now</Button>
            <Button href="/menu" variant="outline" arrow={false} className="px-10">
              View Menu
            </Button>
          </div>
        </div>
        <p className="hidden lg:block absolute right-8 top-8 bg-white/90 px-5 py-3 font-note text-2xl leading-tight text-ink rotate-6 shadow">
          Good Drinks
          <br />
          Good Energy
          <br />
          Always ♡
        </p>
      </section>

      {/* Feature strip */}
      <Panel className="mt-5 px-4 py-7 grid grid-cols-2 md:grid-cols-5 gap-y-6">
        {FEATURES.map(({ title, sub, Icon }, i) => (
          <div key={title} className={`text-center px-2 ${i > 0 ? "md:border-l md:border-line" : ""} ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}>
            <Icon className="mx-auto w-10 h-10 text-berry" />
            <p className="mt-2 text-sm sm:text-base text-ink leading-snug">
              {title}
              <br />
              {sub}
            </p>
          </div>
        ))}
      </Panel>

      {/* Popular drinks */}
      <Panel className="mt-5 p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <ScriptHeading>Popular Drinks</ScriptHeading>
          <Button href="/menu" variant="outline" className="px-6 py-2.5 text-sm">
            View Full Menu
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {lattes.slice(0, 5).map((d) => (
            <DrinkCard key={d.name} drink={d} />
          ))}
        </div>
      </Panel>

      {/* Pancake box + seasonal */}
      <div className="mt-5 grid lg:grid-cols-2 gap-5">
        <Panel className="p-6 sm:p-8 grid sm:grid-cols-[1fr_1.1fr] gap-6 items-center">
          <div>
            <h2 className="font-script text-berry text-5xl leading-tight">Build Your Own Mini Pancake Box</h2>
            <p className="mt-3 text-xs sm:text-sm tracking-[0.15em] uppercase text-ink">Choose your toppings & create your perfect box! ♡</p>
            <Button href="/menu#pancake-boxes" className="mt-6 px-6 py-3 text-sm">
              Build Your Box
            </Button>
          </div>
          <div className="relative aspect-[624/310] sm:aspect-[4/3] rounded-2xl overflow-hidden">
            <Image src="/images/pancake-box.jpg" alt="Box of mini pancakes with strawberries, chocolate and sprinkles" fill sizes="(min-width:1024px) 25vw, 90vw" className="object-cover" />
          </div>
        </Panel>

        <Panel className="relative overflow-hidden p-6 sm:p-8 grid sm:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <h2 className="font-script text-berry text-5xl leading-tight">Seasonal Menu</h2>
            <p className="mt-2 text-xs sm:text-sm tracking-[0.2em] uppercase text-ink">Try our latest fall creations!</p>
            <ul className="mt-4 rotate-[-2deg] inline-block bg-white px-5 py-3 shadow font-note text-2xl text-ink leading-snug">
              {seasonal.map((s) => (
                <li key={s}>♡ {s}</li>
              ))}
              <li className="pl-5">& more!</li>
            </ul>
          </div>
          <div className="relative w-48 sm:w-52 aspect-[285/238] rounded-2xl overflow-hidden shadow-lg mx-auto">
            <Image src="/images/seasonal.jpg" alt="Two pumpkin lattes topped with Biscoff" fill sizes="208px" className="object-cover" />
          </div>
        </Panel>
      </div>

      {/* Catering + follow */}
      <div className="mt-5 grid lg:grid-cols-[1.4fr_1fr] gap-5">
        <Panel className="p-6 sm:p-8 grid sm:grid-cols-2 gap-6 items-center">
          <div className="relative aspect-[362/220] rounded-2xl overflow-hidden">
            <Image src="/images/catering-photo.jpg" alt="Drink carrier with three specialty drinks" fill sizes="(min-width:1024px) 25vw, 90vw" className="object-cover" />
          </div>
          <div>
            <h2 className="font-script text-berry text-5xl leading-tight">Catering & Events</h2>
            <p className="mt-2 text-ink-soft">Perfect for parties, work, and special occasions!</p>
            <Link href="/catering" className="mt-5 inline-flex items-center gap-2 font-semibold text-berry hover:text-berry-dark">
              Catering Info <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </Panel>

        <Panel className="p-6 sm:p-8 text-center">
          <h2 className="font-script text-berry text-5xl">Follow Us ♡</h2>
          <p className="mt-2 text-xs tracking-[0.15em] uppercase text-ink">Stay updated on new drinks, menu changes & more!</p>
          <div className="mt-5 flex justify-center gap-6 text-berry">
            <a href={business.instagramUrl} aria-label="Instagram">
              <InstagramIcon className="w-11 h-11" />
            </a>
            <a href={business.tiktokUrl} aria-label="TikTok" className="text-ink">
              <TikTokIcon className="w-10 h-10" />
            </a>
          </div>
          <a
            href={business.instagramUrl}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-berry hover:bg-berry-dark text-white font-semibold px-7 py-3 transition-colors"
          >
            {business.handle} <ArrowRightIcon className="w-4 h-4" />
          </a>
        </Panel>
      </div>
    </div>
  );
}
