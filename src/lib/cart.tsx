"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  key: string;
  drinkId: string;
  name: string;
  image: string;
  size: string;
  milk: string;
  extras: string[];
  unitPrice: number;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: Omit<CartItem, "key">) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "ecc-cart";

// Two drinks pre-loaded so the checkout looks filled in on first visit, like the mockup
const STARTER: CartItem[] = [
  { key: "chocobanana|Medium|Dairy|", drinkId: "chocobanana", name: "Chocobanana", image: "/images/d-chocobanana.jpg", size: "Medium", milk: "Dairy", extras: [], unitPrice: 6, qty: 1 },
  { key: "strawberry-redbull|Large|—|", drinkId: "strawberry-redbull", name: "Strawberry Redbull", image: "/images/d-strawberry-redbull.jpg", size: "Large", milk: "—", extras: [], unitPrice: 9, qty: 1 },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(STARTER);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restoring saved cart after hydration
      if (saved) setItems(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, loaded]);

  const add: CartContextValue["add"] = (item) => {
    const key = [item.drinkId, item.size, item.milk, [...item.extras].sort().join("+")].join("|");
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + item.qty } : i));
      return [...prev, { ...item, key }];
    });
  };

  const setQty = (key: string, qty: number) =>
    setItems((prev) => (qty < 1 ? prev.filter((i) => i.key !== key) : prev.map((i) => (i.key === key ? { ...i, qty } : i))));

  const value: CartContextValue = {
    items,
    count: items.reduce((n, i) => n + i.qty, 0),
    subtotal: items.reduce((n, i) => n + i.unitPrice * i.qty, 0),
    add,
    setQty,
    remove: (key) => setItems((prev) => prev.filter((i) => i.key !== key)),
    clear: () => setItems([]),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
