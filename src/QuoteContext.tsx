import React, { createContext, useContext, useMemo, useState } from 'react';
import { ADVENTURES, discountFor } from './data';
import { Adventure } from './types';

type Ctx = {
  items: Adventure[];
  has: (id: string) => boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  subtotal: number;
  pct: number;
  discount: number;
  total: number;
};

const QuoteCtx = createContext<Ctx>(null as unknown as Ctx);
export const useQuote = () => useContext(QuoteCtx);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  const value = useMemo<Ctx>(() => {
    const items = ids
      .map((id) => ADVENTURES.find((a) => a.id === id))
      .filter(Boolean) as Adventure[];
    const subtotal = items.reduce((s, a) => s + (a.price ?? 0), 0);
    const pct = discountFor(items.length);
    const discount = (subtotal * pct) / 100;
    return {
      items,
      has: (id) => ids.includes(id),
      add: (id) => setIds((p) => (p.includes(id) ? p : [...p, id])),
      remove: (id) => setIds((p) => p.filter((x) => x !== id)),
      subtotal,
      pct,
      discount,
      total: subtotal - discount,
    };
  }, [ids]);

  return <QuoteCtx.Provider value={value}>{children}</QuoteCtx.Provider>;
}