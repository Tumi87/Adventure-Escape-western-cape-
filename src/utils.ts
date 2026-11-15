import { Adventure, FeeResult } from './types';

export const VAT_RATE = 0.15;

const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rePhone = /^(\+27|0)[0-9 ]{8,12}$/;
const reName = /^[A-Za-z][A-Za-z '\-]+$/;

export const isEmail = (v: string): boolean => reEmail.test(v.trim());
export const isPhone = (v: string): boolean => rePhone.test(v.trim());
export const isName = (v: string): boolean => reName.test(v.trim());

export const formatRand = (n: number): string =>
  'R' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const discountPercent = (count: number): number =>
  count <= 1 ? 0 : count === 2 ? 5 : count === 3 ? 10 : 15;

/** Fees: array of selected adventure ids -> subtotal, discount, VAT, total. */
export function calculateFees(selected: number[], list: Adventure[]): FeeResult {
  const subtotal = selected.reduce((sum, id) => sum + (list.find(a => a.id === id)?.price ?? 0), 0);
  const pct = discountPercent(selected.length);
  const discount = (subtotal * pct) / 100;
  const vat = (subtotal - discount) * VAT_RATE;
  return { subtotal, discountPercent: pct, discount, vat, total: subtotal - discount + vat };
}

/** Accepts YYYY-MM-DD and returns true only for a real date that is today or later. */
export function isFutureDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
}

export const isValidExpiry = (v: string): boolean => {
  const m = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(v);
  if (!m) return false;
  const now = new Date();
  const year = 2000 + Number(m[2]);
  const month = Number(m[1]);
  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1);
};
