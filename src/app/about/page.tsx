import Image from "next/image";
import { Button, Panel } from "@/components/ui";
import { HeartDoodle } from "@/components/icons";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-3 sm:px-6">
      <section className="mt-8 text-center">
        <h1 className="font-script text-berry text-7xl sm:text-8xl -rotate-2">Our Story</h1>
        <p className="mt-3 font-semibold tracking-[0.15em] uppercase text-ink">Good Drinks · Good Energy · Always</p>
      </section>

      <Panel className="mt-10 p-6 sm:p-10 grid md:grid-cols-2 gap-10 items-center">
        <div className="relative mx-auto w-full max-w-sm rotate-[-3deg] bg-white p-3 pb-12 shadow-xl">
          <div className="relative aspect-[285/238]">
            <Image src="/images/seasonal.jpg" alt="Two lattes topped with Biscoff cookies" fill sizes="(min-width:768px) 380px, 90vw" className="object-cover" />
          </div>
          <p className="absolute bottom-3 inset-x-0 text-center font-note text-2xl text-berry">made con cariño ♡</p>
        </div>
        <div>
          <h2 className="flex items-center gap-3 font-script text-berry text-5xl">
            Hi, welcome! <HeartDoodle className="w-8 h-8" />
          </h2>
          <div className="mt-5 space-y-4 text-lg text-ink leading-relaxed">
            <p>
              El Cafecito Conmigo is a home-based cafe in Hayward, CA, serving specialty iced lattes, build-your-own Redbulls,
              matcha, and mini pancake boxes.
            </p>
            <p>
              Every drink is made to order with fun flavors and lots of love — and there&apos;s always something new on the
              menu. Thank you for supporting a small business!
            </p>
          </div>
          <Button href="/menu" className="mt-8">
            See the Menu
          </Button>
        </div>
      </Panel>
    </div>
  );
}
