"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { allDrinks, extraOptions, milkOptions, money, type Category } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { Panel, Steps } from "@/components/ui";
import { ArrowRightIcon, BoltIcon, CupIcon, HeartDoodle } from "@/components/icons";

const TABS: { label: Category; Icon: typeof CupIcon }[] = [
  { label: "Specialty Lattes", Icon: CupIcon },
  { label: "Matcha Lattes", Icon: HeartDoodle },
  { label: "Redbulls", Icon: BoltIcon },
];

function Option({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors ${
        active ? "border-berry bg-berry text-white" : "border-line bg-white text-ink hover:border-berry"
      }`}
    >
      {children}
    </button>
  );
}

function OrderBuilder() {
  const params = useSearchParams();
  const initial = allDrinks.find((d) => d.id === params.get("drink")) ?? allDrinks[0];
  const cart = useCart();

  const [tab, setTab] = useState<Category>(initial.category);
  const [drinkId, setDrinkId] = useState(initial.id);
  const [size, setSize] = useState<"Medium" | "Large">("Medium");
  const [milk, setMilk] = useState("Dairy");
  const [extras, setExtras] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const drink = allDrinks.find((d) => d.id === drinkId)!;
  const isRedbull = drink.category === "Redbulls";
  const unitPrice = (size === "Medium" ? drink.m : drink.l) + (isRedbull ? 0 : milkOptions.find((m) => m.name === milk)!.price);

  const choose = (id: string) => {
    setDrinkId(id);
    setSize("Medium");
    setMilk("Dairy");
    setExtras([]);
    setQty(1);
    setAdded(false);
  };

  const addToOrder = () => {
    cart.add({
      drinkId: drink.id,
      name: drink.name,
      image: drink.image,
      size,
      milk: isRedbull ? "—" : milk,
      extras,
      unitPrice,
      qty,
    });
    setAdded(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-6">
      <section className="mt-8 text-center">
        <h1 className="font-script text-berry text-7xl sm:text-8xl -rotate-2">Order Online</h1>
        <p className="mt-3 font-semibold tracking-[0.15em] uppercase text-ink">Pickup or delivery in Hayward, CA</p>
      </section>
      <div className="mt-8">
        <Steps current={1} />
      </div>

      <div className="mt-8 grid lg:grid-cols-[1fr_420px] gap-5 items-start">
        {/* Drink picker */}
        <Panel className="p-4 sm:p-6">
          <div className="no-scrollbar flex gap-3 overflow-x-auto">
            {TABS.map(({ label, Icon }) => (
              <button
                key={label}
                onClick={() => setTab(label)}
                className={`shrink-0 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium border ${
                  tab === label ? "bg-berry border-berry text-white" : "bg-white border-line text-ink hover:border-berry"
                }`}
              >
                <Icon className="w-5 h-5" /> {label}
              </button>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
            {allDrinks
              .filter((d) => d.category === tab)
              .map((d) => (
                <button
                  key={d.id}
                  onClick={() => choose(d.id)}
                  className={`text-left flex flex-col rounded-2xl bg-white overflow-hidden border-[3px] transition-colors ${
                    d.id === drinkId ? "border-berry" : "border-transparent hover:border-line"
                  }`}
                >
                  <div className="relative w-full aspect-[213/200]">
                    <Image src={d.image} alt={d.name} fill sizes="(min-width:1024px) 15vw, 45vw" className="object-cover object-top" />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-bold leading-tight">{d.name}</p>
                    <p className="mt-1 text-xs text-ink-soft">
                      M: ${d.m} · L: ${d.l}
                    </p>
                  </div>
                </button>
              ))}
          </div>
        </Panel>

        {/* Customizer + your order */}
        <div className="space-y-5 lg:sticky lg:top-28">
          <Panel className="p-5">
            <div className="flex gap-4">
              <div className="relative w-28 h-28 shrink-0 rounded-2xl overflow-hidden">
                <Image src={drink.image} alt={drink.name} fill sizes="112px" className="object-cover object-top" />
              </div>
              <div className="min-w-0">
                <h2 className="font-script text-berry text-3xl leading-tight">{drink.name}</h2>
                {drink.desc && <p className="mt-1 text-xs text-ink-soft leading-snug">{drink.desc}</p>}
              </div>
            </div>

            <p className="mt-4 text-sm font-bold">Size</p>
            <div className="mt-2 flex gap-2">
              <Option active={size === "Medium"} onClick={() => setSize("Medium")}>
                Medium 16oz · ${drink.m}
              </Option>
              <Option active={size === "Large"} onClick={() => setSize("Large")}>
                Large 24oz · ${drink.l}
              </Option>
            </div>

            {!isRedbull && (
              <>
                <p className="mt-4 text-sm font-bold">Milk</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {milkOptions.map((m) => (
                    <Option key={m.name} active={milk === m.name} onClick={() => setMilk(m.name)}>
                      {m.name} {m.price > 0 && `+$${m.price}`}
                    </Option>
                  ))}
                </div>
                <div className="mt-4 flex gap-4">
                  {extraOptions.map((e) => (
                    <label key={e.name} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={extras.includes(e.name)}
                        onChange={() => setExtras((prev) => (prev.includes(e.name) ? prev.filter((x) => x !== e.name) : [...prev, e.name]))}
                        className="w-4 h-4 accent-[#e0306e]"
                      />
                      {e.name}
                    </label>
                  ))}
                </div>
              </>
            )}

            <div className="mt-5 flex gap-3">
              <div className="inline-flex items-center rounded-full border-2 border-line bg-white">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-2.5 text-berry font-bold" aria-label="Less">
                  −
                </button>
                <span className="w-5 text-center font-bold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="px-4 py-2.5 text-berry font-bold" aria-label="More">
                  +
                </button>
              </div>
              <button onClick={addToOrder} className="flex-1 rounded-full bg-berry hover:bg-berry-dark text-white font-semibold transition-colors">
                {added ? "Added! ♡ Add another" : `Add to Order · ${money(unitPrice * qty)}`}
              </button>
            </div>
          </Panel>

          <Panel className="p-5">
            <div className="flex items-baseline justify-between">
              <h2 className="font-bold text-lg">Your Order ({cart.count})</h2>
              {cart.count > 0 && (
                <button onClick={cart.clear} className="text-xs text-berry underline">
                  Clear All
                </button>
              )}
            </div>
            {cart.items.length === 0 ? (
              <p className="mt-3 text-sm text-ink-soft">No drinks yet — pick one to get started ♡</p>
            ) : (
              <ul className="mt-3 space-y-3">
                {cart.items.map((item) => (
                  <li key={item.key} className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0">
                      <Image src={item.image} alt="" fill sizes="44px" className="object-cover object-top" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{item.name}</p>
                      <p className="text-xs text-ink-soft truncate">{[item.size, item.milk !== "—" && item.milk, ...item.extras].filter(Boolean).join(" · ")}</p>
                    </div>
                    <div className="inline-flex items-center rounded-full border border-line text-sm">
                      <button onClick={() => cart.setQty(item.key, item.qty - 1)} className="px-2 text-berry" aria-label="Less">
                        −
                      </button>
                      <span className="px-1">{item.qty}</span>
                      <button onClick={() => cart.setQty(item.key, item.qty + 1)} className="px-2 text-berry" aria-label="More">
                        +
                      </button>
                    </div>
                    <span className="w-14 text-right text-sm font-semibold">{money(item.unitPrice * item.qty)}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-5 flex items-center justify-between gap-3">
              <p className="text-sm">
                Subtotal <span className="ml-1 font-bold text-base">{money(cart.subtotal)}</span>
              </p>
              <Link
                href={cart.count ? "/checkout" : "#"}
                aria-disabled={!cart.count}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold ${
                  cart.count ? "bg-berry hover:bg-berry-dark text-white" : "bg-line text-ink-soft pointer-events-none"
                }`}
              >
                Continue <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense>
      <OrderBuilder />
    </Suspense>
  );
}
