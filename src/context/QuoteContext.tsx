import React, { createContext, useCallback, useContext, useMemo, useState, ReactNode } from 'react';
import { Review, User } from '../types';

// Sample reviews so the screen is not empty. Replace with your own text.
const seedReviews: Review[] = [
  { id: 1, adventureId: 2, author: 'Sample reviewer', rating: 5, text: 'Sample review: a brilliant guided hike with great views.' },
  { id: 2, adventureId: 1, author: 'Sample reviewer', rating: 4, text: 'Sample review: a relaxed morning that suited the whole family.' },
  { id: 3, adventureId: 5, author: 'Sample reviewer', rating: 5, text: 'Sample review: calm water and a friendly guide.' },
];

interface QuoteState {
  quote: number[];
  saved: number[];
  reviews: Review[];
  user: User | null;
  toggleQuote: (id: number) => void;
  removeFromQuote: (id: number) => void;
  toggleSaved: (id: number) => void;
  addReview: (r: Omit<Review, 'id'>) => void;
  login: (u: User) => void;
  logout: () => void;
}

const QuoteContext = createContext<QuoteState | undefined>(undefined);

const toggle = (list: number[], id: number): number[] =>
  list.includes(id) ? list.filter(x => x !== id) : [...list, id];

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [quote, setQuote] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [reviews, setReviews] = useState<Review[]>(seedReviews);
  const [user, setUser] = useState<User | null>(null);

  const toggleQuote = useCallback((id: number) => setQuote(q => toggle(q, id)), []);
  const removeFromQuote = useCallback((id: number) => setQuote(q => q.filter(x => x !== id)), []);
  const toggleSaved = useCallback((id: number) => setSaved(s => toggle(s, id)), []);
  const addReview = useCallback(
    (r: Omit<Review, 'id'>) => setReviews(list => [{ ...r, id: Date.now() }, ...list]),
    [],
  );
  const login = useCallback((u: User) => setUser(u), []);
  const logout = useCallback(() => setUser(null), []);

  const value = useMemo(
    () => ({ quote, saved, reviews, user, toggleQuote, removeFromQuote, toggleSaved, addReview, login, logout }),
    [quote, saved, reviews, user, toggleQuote, removeFromQuote, toggleSaved, addReview, login, logout],
  );
  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote(): QuoteState {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('useQuote must be used inside QuoteProvider');
  return ctx;
}
