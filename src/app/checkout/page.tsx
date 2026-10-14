"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { money } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { Panel, Steps } from "@/components/ui";
import { CarIcon, HeartSolid, PinIcon } from "@/components/icons";

const DELIVERY_FEE = 3;

// Time slots every 30 minutes, 9:00 am – 6:30 pm
const TIMES = Array.from({ length: 20 }, (_, i) => {
  const mins = 9 * 60 + i * 30;
  const h = Math.floor(mins / 60);
  return `${((h + 11) % 12) + 1}:${(mins % 60).toString().padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
});

const PAY_METHODS = [
  { name: "Apple Pay", badge: <span className="rounded border border-ink px-1.5 text-xs font-semibold"> Pay</span> },
  { name: "Card", badge: <span className="text-xs text-ink-soft">Visa · Mastercard</span> },
  { name: "Cash App Pay", badge: <span className="grid place-items-center w-6 h-6 rounded bg-[#00d632] text-white text-sm font-bold">$</span> },
  { name: "Zelle", badge: <span className="rounded bg-[#6d1ed4] px-1.5 text-xs font-bold text-white">zelle</span> },
];

const POLICIES = [
  "You must be following us to place an order ♡",
  "Please place orders at least 30 minutes ahead.",
  "You'll get a text when your order is ready or on the way.",
];

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-sm text-ink-soft">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border-2 border-line bg-white px-4 py-2.5 placeholder:text-ink-soft/50 focus:outline-none focus:border-berry"
      />
    </label>
  );
}

export default function CheckoutPage() {
  const cart = useCart();
  const [method, setMethod] = useState<"Pickup" | "Delivery">("Pickup");
  const [day, setDay] = useState("Today");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [pay, setPay] = useState("Apple Pay");
  const [placed, setPlaced] = useState<null | { total: number; when: string; name: string; method: string }>(null);

  const fee = method === "Delivery" ? DELIVERY_FEE : 0;
  const total = cart.subtotal + fee;
  const hasWhen = time !== "" && (method === "Pickup" || address.trim() !== "");
  const hasInfo = name.trim() !== "" && phone.trim() !== "";
  const step = !hasWhen ? 2 : !hasInfo ? 3 : 4;
  const ready = cart.count > 0 && hasWhen && hasInfo;

  const placeOrder = () => {
    setPlaced({ total, when: `${day} at ${time}`, name: name.trim().split(" ")[0], method });
    cart.clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16">
        <Panel className="p-8 text-center">
          <HeartSolid className="mx-auto w-14 h-14 text-berry" />
          <h1 className="mt-4 font-script text-berry text-6xl">Gracias, {placed.name}!</h1>
          <p className="mt-4 text-lg">
            Your {placed.method.toLowerCase()} order for <strong>{placed.when}</strong> ({money(placed.total)}) is in!
          </p>
          <p className="mt-2 text-ink-soft">We&apos;ll text you when it&apos;s ready ♡</p>
          <p className="mt-6 rounded-xl border-2 border-dashed border-line px-4 py-3 text-sm text-ink-soft">
            Preview site: no payment was taken and no order was sent.
          </p>
          <Link href="/menu" className="mt-6 inline-flex rounded-full bg-berry hover:bg-berry-dark text-white font-semibold px-8 py-3">
            Back to Menu
          </Link>
        </Panel>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-6">
      <section className="mt-8 text-center">
        <h1 className="font-script text-berry text-7xl sm:text-8xl -rotate-2">Checkout</h1>
      </section>
      <div className="mt-8">
        <Steps current={step} />
      </div>

      <div className="mt-8 grid lg:grid-cols-[1fr_400px] gap-5 items-start">
        <div className="space-y-5">
          {/* Pickup or delivery */}
          <Panel className="p-5 sm:p-7">
            <h2 className="font-script text-berry text-4xl">Pickup or Delivery</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {(["Pickup", "Delivery"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left transition-colors ${
                    method === m ? "border-berry bg-blush-deep/50" : "border-line bg-white hover:border-berry"
                  }`}
                >
                  {m === "Pickup" ? <PinIcon className="w-7 h-7 text-berry shrink-0" /> : <CarIcon className="w-7 h-7 text-berry shrink-0" />}
                  <span>
                    <span className="block font-bold">{m}</span>
                    <span className="block text-xs text-ink-soft">{m === "Pickup" ? "Hayward, CA — free" : `Hayward area — +${money(DELIVERY_FEE)}`}</span>
                  </span>
                </button>
              ))}
            </div>

            {method === "Delivery" && (
              <div className="mt-4">
                <Field label="Delivery address" value={address} onChange={setAddress} placeholder="Street, Hayward, CA" />
              </div>
            )}

            <div className="mt-5 flex gap-2">
              {["Today", "Tomorrow"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDay(d)}
                  className={`rounded-full px-5 py-1.5 text-sm font-medium ${day === d ? "bg-berry text-white" : "bg-white border border-line"}`}
                >
                  {d}
                </button>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 gap-2">
              {TIMES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={`rounded-xl border-2 py-2 text-sm transition-colors ${
                    time === t ? "border-berry bg-berry text-white font-semibold" : "border-line bg-white hover:border-berry"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Panel>

          {/* Info */}
          <Panel className="p-5 sm:p-7">
            <h2 className="font-script text-berry text-4xl">Your Info</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <Field label="Name" value={name} onChange={setName} placeholder="Your name" />
              <Field label="Phone number" value={phone} onChange={setPhone} placeholder="(510) 555-0123" type="tel" />
              <div className="sm:col-span-2">
                <Field label="Instagram (so we can confirm you're following)" value={instagram} onChange={setInstagram} placeholder="@yourhandle" />
              </div>
            </div>
          </Panel>

          {/* Payment */}
          <Panel className="p-5 sm:p-7">
            <h2 className="font-script text-berry text-4xl">Payment</h2>
            <div className="mt-4 space-y-2.5">
              {PAY_METHODS.map((m) => (
                <button
                  key={m.name}
                  onClick={() => setPay(m.name)}
                  className={`w-full flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-colors ${
                    pay === m.name ? "border-berry bg-blush-deep/50" : "border-line bg-white hover:border-berry"
                  }`}
                >
                  <span className={`grid place-items-center w-5 h-5 rounded-full border-2 ${pay === m.name ? "border-berry" : "border-line"}`}>
                    {pay === m.name && <span className="w-2.5 h-2.5 rounded-full bg-berry" />}
                  </span>
                  <span className="flex-1 font-medium">{m.name}</span>
                  {m.badge}
                </button>
              ))}
            </div>
            <button
              onClick={placeOrder}
              disabled={!ready}
              className="mt-6 w-full rounded-full bg-berry hover:bg-berry-dark disabled:bg-line disabled:text-ink-soft text-white text-lg font-bold py-4 transition-colors shadow-[0_10px_20px_-10px_rgba(224,48,110,0.8)] disabled:shadow-none"
            >
              Place Order · {money(total)}
            </button>
            {!ready && (
              <p className="mt-2 text-center text-xs text-ink-soft">
                {cart.count === 0
                  ? "Add a drink to your order first."
                  : !hasWhen
                    ? method === "Delivery" && time
                      ? "Add your delivery address."
                      : "Pick a time above."
                    : "Add your name and phone number."}
              </p>
            )}
          </Panel>
        </div>

        {/* Summary */}
        <aside className="space-y-5 lg:sticky lg:top-28">
          <Panel className="p-5 sm:p-6">
            <div className="flex items-baseline justify-between">
              <h2 className="font-bold text-lg">Order Summary</h2>
              <Link href="/order" className="text-sm text-berry underline">
                Edit
              </Link>
            </div>
            <ul className="mt-4 space-y-3">
              {cart.items.map((item) => (
                <li key={item.key} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                    <Image src={item.image} alt="" fill sizes="48px" className="object-cover object-top" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{item.name}</p>
                    <p className="text-xs text-ink-soft truncate">{[item.size, item.milk !== "—" && item.milk, ...item.extras].filter(Boolean).join(" · ")}</p>
                  </div>
                  <span className="text-sm text-ink-soft">×{item.qty}</span>
                  <span className="w-14 text-right text-sm font-semibold">{money(item.unitPrice * item.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-line space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{money(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>{method === "Delivery" ? "Delivery fee" : "Pickup"}</span>
                <span>{fee ? money(fee) : "Free"}</span>
              </div>
              <div className="flex justify-between pt-2 text-lg font-bold">
                <span>Total</span>
                <span>{money(total)}</span>
              </div>
            </div>
          </Panel>

          <Panel className="p-5 sm:p-6 bg-blush-deep/60">
            <h2 className="font-script text-berry text-3xl">Before You Order ♡</h2>
            <ul className="mt-3 space-y-2.5">
              {POLICIES.map((p) => (
                <li key={p} className="flex gap-2 text-sm">
                  <HeartSolid className="w-4 h-4 mt-0.5 shrink-0 text-berry" /> {p}
                </li>
              ))}
            </ul>
          </Panel>
        </aside>
      </div>
    </div>
  );
}
