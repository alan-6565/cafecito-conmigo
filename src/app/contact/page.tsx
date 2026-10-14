import { business } from "@/lib/data";
import { Panel } from "@/components/ui";
import { CarIcon, InstagramIcon, PinIcon, TikTokIcon } from "@/components/icons";

const CARDS = [
  { title: "Instagram", desc: business.handle, Icon: InstagramIcon, href: business.instagramUrl },
  { title: "TikTok", desc: business.handle, Icon: TikTokIcon, href: business.tiktokUrl },
  { title: "Location", desc: `Home-based in ${business.city}`, Icon: PinIcon },
  { title: "Pickup & Delivery", desc: "Details sent when your order is confirmed", Icon: CarIcon },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-3 sm:px-6">
      <section className="mt-8 text-center">
        <h1 className="font-script text-berry text-7xl sm:text-8xl -rotate-2">Contact Us</h1>
        <p className="mt-3 font-semibold tracking-[0.15em] uppercase text-ink">The best way to reach us is a DM ♡</p>
      </section>

      <div className="mt-10 grid sm:grid-cols-2 gap-5">
        {CARDS.map(({ title, desc, Icon, href }) => {
          const body = (
            <Panel className="h-full p-6 text-center">
              <Icon className="mx-auto w-11 h-11 text-berry" />
              <p className="mt-3 font-script text-berry text-4xl">{title}</p>
              <p className="mt-1 text-ink-soft">{desc}</p>
            </Panel>
          );
          return href ? (
            <a key={title} href={href} className="hover:-translate-y-0.5 transition-transform">
              {body}
            </a>
          ) : (
            <div key={title}>{body}</div>
          );
        })}
      </div>
    </div>
  );
}
